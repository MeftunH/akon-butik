import type { Prisma } from '@akonbutik/database';
import type { DiaClient, Stokkart } from '@akonbutik/dia-client';
import { DiaApiError, DiaTransportError } from '@akonbutik/dia-client';
import { Inject, Injectable, Logger } from '@nestjs/common';

// NestJS reads decorator-emitted metadata from the class constructor at
// instantiation time; `import type` would tree-shake the runtime
// reference and the DI container can't bind by class.

import type { PrismaService } from '../prisma/prisma.service';
import type { RevalidationService } from '../storefront/revalidation.service';

import { DIA_CLIENT } from './dia.tokens';
import { aggregateStokkarts } from './mapping/aggregate-stokkarts';

const PRODUCT_PAGE_SIZE = 100;
const STOCK_PAGE_SIZE = 200;

/**
 * Columns the akonbutik DIA tenant actually exposes via `selectedcolumns`
 * on `scf_stokkart_listele`. Other columns we'd like (urungrubu,
 * urunmodelkodu, markakodu, kategorikodu, beden, renk) return
 * 500 "Hatalı Veri" on this tenant — see Stokkart docs.
 */
const STOKKART_SELECT_COLUMNS = [
  '_key',
  'stokkartkodu',
  'aciklama',
  'durum',
  'b2c_durum',
  'b2c_depomiktari',
  'fiyat1',
  'fiili_stok',
  'marka',
  'markaack',
  'anabarkod',
  'stokkartturu',
] as const;

const STOCK_SELECT_COLUMNS = ['_key', 'stokkartkodu', 'fiili_stok', 'b2c_depomiktari'] as const;

export type SyncEntity = 'products' | 'stock' | 'categories';

interface SyncResult {
  syncLogId: string;
  inserted: number;
  updated: number;
  unmatched: number;
  durationMs: number;
}

/**
 * Orchestrates DIA → local-DB synchronisation.
 *
 * Each sync method opens a DiaSyncLog row, drains the relevant DIA iterator,
 * applies the mapper, upserts via Prisma in batches, and closes the log row
 * with stats (or error). Workers (BullMQ) call these methods on cron.
 */
@Injectable()
export class DiaSyncService {
  private readonly logger = new Logger(DiaSyncService.name);

  constructor(
    @Inject(DIA_CLIENT) private readonly dia: DiaClient,
    private readonly prisma: PrismaService,
    private readonly revalidation: RevalidationService,
  ) {}

  // ─── Categories ───────────────────────────────────────────────────────────

  async syncCategories(): Promise<SyncResult> {
    return this.runWithLog('categories', async () => {
      let records: readonly { kategorikodu: string; aciklama: string }[];
      try {
        records = await this.dia.scf.kategoriListele({ limit: 500 });
      } catch (err) {
        // Some DIA tenants (akonbutik among them) do not enable
        // scf_stokkartkategorisi_listele; the endpoint returns 404
        // (ResourceNotFound). Surface the situation in the log row but
        // do not fail the job — the storefront degrades gracefully when
        // products have no category.
        // The transport layer wraps DIA's 404 (ResourceNotFound) into a
        // DiaTransportError because the underlying HTTP status is 404 —
        // not a DiaApiError. Match on either shape so the sync survives.
        const is404 =
          (err instanceof DiaApiError && err.diaCode === '404') ||
          (err instanceof DiaTransportError && /\b404\b/.test(err.message));
        if (is404) {
          this.logger.warn(
            'scf_stokkartkategorisi_listele not available on this DIA tenant; skipping category sync',
          );
          return { inserted: 0, updated: 0, unmatched: 0 };
        }
        throw err;
      }
      let inserted = 0;
      let updated = 0;
      for (const k of records) {
        const result = await this.prisma.category.upsert({
          where: { diaKategoriKodu: k.kategorikodu },
          create: {
            diaKategoriKodu: k.kategorikodu,
            slug: slugForCategory(k.kategorikodu, k.aciklama),
            nameTr: k.aciklama,
          },
          update: { nameTr: k.aciklama },
        });
        if (result.createdAt.getTime() === result.updatedAt.getTime()) inserted++;
        else updated++;
      }
      return { inserted, updated, unmatched: 0 };
    });
  }

  // ─── Products ─────────────────────────────────────────────────────────────

  async syncProducts(): Promise<SyncResult> {
    return this.runWithLog('products', async () => {
      const all: Stokkart[] = [];
      for await (const page of this.dia.scf.stokkartIterate({
        pageSize: PRODUCT_PAGE_SIZE,
        filters: [{ field: 'durum', operator: '=', value: 'A' }],
        selectedColumns: [...STOKKART_SELECT_COLUMNS],
      })) {
        all.push(...page);
      }

      // Two-mode: if the DIA tenant exposes `urungrubu`/`urunmodelkodu`
      // we group stokkarts into Product+ProductVariant aggregates (the
      // original Phase 1 design). On the akonbutik tenant those columns
      // are not exposed and the records are flat single-SKU rows, so we
      // fall through to one Product + one default ProductVariant per
      // stokkart. Detection: any record carries either grouping field.
      const hasAggregationKey = all.some((s) => Boolean(s.urungrubu) || Boolean(s.urunmodelkodu));

      const result = hasAggregationKey
        ? await this.upsertAggregated(all)
        : await this.upsertSingleSku(all);
      return result;
    });
  }

  /** Original parent-key aggregation flow (urungrubu/urunmodelkodu). */
  private async upsertAggregated(
    stokkarts: readonly Stokkart[],
  ): Promise<{ inserted: number; updated: number; unmatched: number }> {
    const changeset = aggregateStokkarts(stokkarts);
    const [brandIdByDiaKodu, categoryIdByDiaKodu] = await Promise.all([
      this.indexBrands(),
      this.indexCategories(),
    ]);

    let inserted = 0;
    let updated = 0;
    const now = new Date();

    for (const product of changeset.products) {
      const variants = changeset.variants.filter((v) => v.parentKey === product.parentKey);
      const brandId = product.brandDiaKodu
        ? (brandIdByDiaKodu.get(product.brandDiaKodu) ?? null)
        : null;
      const categoryId = product.categoryDiaKodu
        ? (categoryIdByDiaKodu.get(product.categoryDiaKodu) ?? null)
        : null;

      const productCreate: Prisma.ProductCreateInput = {
        slug: product.slug,
        nameTr: product.nameTr,
        descriptionMd: product.nameTr,
        defaultPriceMinor: product.defaultPriceMinor,
        diaParentKey: product.parentKey,
        status: product.parentKeySource === 'self' ? 'needs_review' : 'visible',
        diaSyncedAt: now,
        ...(brandId && { brand: { connect: { id: brandId } } }),
        ...(categoryId && { category: { connect: { id: categoryId } } }),
      };

      const tx = await this.prisma.$transaction([
        this.prisma.product.upsert({
          where: { slug: product.slug },
          create: productCreate,
          update: {
            nameTr: product.nameTr,
            defaultPriceMinor: product.defaultPriceMinor,
            diaSyncedAt: now,
          },
        }),
        ...variants.map((v) => {
          const variantCreate: Prisma.ProductVariantCreateInput = {
            diaStokkartkodu: v.diaStokkartkodu,
            sku: v.sku,
            size: v.size,
            color: v.color,
            stockQty: v.stockQty,
            stockSyncedAt: now,
            product: { connect: { slug: product.slug } },
            ...(v.priceMinor !== product.defaultPriceMinor && {
              priceOverrideMinor: v.priceMinor,
            }),
          };
          const variantUpdate: Prisma.ProductVariantUpdateInput = {
            stockQty: v.stockQty,
            stockSyncedAt: now,
            ...(v.priceMinor !== product.defaultPriceMinor && {
              priceOverrideMinor: v.priceMinor,
            }),
          };
          return this.prisma.productVariant.upsert({
            where: { diaStokkartkodu: v.diaStokkartkodu },
            create: variantCreate,
            update: variantUpdate,
          });
        }),
      ]);
      const productResult = tx[0];
      if (productResult.createdAt.getTime() === productResult.updatedAt.getTime()) inserted++;
      else updated++;
    }
    return { inserted, updated, unmatched: changeset.unmatched.length };
  }

  /**
   * Single-SKU mode: one stokkart → one Product + one default ProductVariant.
   * Used when the DIA tenant does not expose the urungrubu/urunmodelkodu
   * fields needed for variant aggregation. Brand/category remain null
   * because the tenant has no marka/kategori master data either; admin
   * can curate those manually post-sync.
   */
  private async upsertSingleSku(
    stokkarts: readonly Stokkart[],
  ): Promise<{ inserted: number; updated: number; unmatched: number }> {
    let inserted = 0;
    let updated = 0;
    let unmatched = 0;
    const now = new Date();

    for (const s of stokkarts) {
      const name = (s.aciklama || '').trim();
      if (!name || !s.stokkartkodu) {
        unmatched++;
        continue;
      }
      const priceMinor = parseDiaDecimalToMinor(s.fiyat1);
      const stockQty = clampStock(parseDiaInt(s.fiili_stok));
      const slug = slugFromStokkart(s.stokkartkodu, name);

      const tx = await this.prisma.$transaction([
        this.prisma.product.upsert({
          where: { slug },
          create: {
            slug,
            nameTr: name,
            descriptionMd: name,
            defaultPriceMinor: priceMinor,
            diaParentKey: s.stokkartkodu,
            status: 'visible',
            diaSyncedAt: now,
          },
          update: {
            nameTr: name,
            defaultPriceMinor: priceMinor,
            diaSyncedAt: now,
          },
        }),
        this.prisma.productVariant.upsert({
          where: { diaStokkartkodu: s.stokkartkodu },
          create: {
            diaStokkartkodu: s.stokkartkodu,
            sku: s.stokkartkodu,
            size: null,
            color: null,
            stockQty,
            stockSyncedAt: now,
            product: { connect: { slug } },
          },
          update: {
            stockQty,
            stockSyncedAt: now,
          },
        }),
      ]);
      const productResult = tx[0];
      if (productResult.createdAt.getTime() === productResult.updatedAt.getTime()) inserted++;
      else updated++;
    }
    return { inserted, updated, unmatched };
  }

  // ─── Stock-only refresh (B2C cache) ───────────────────────────────────────

  async syncStock(): Promise<SyncResult> {
    return this.runWithLog('stock', async () => {
      let updated = 0;
      // No b2c_durum filter — akonbutik tenant currently has no records
      // flagged b2c_durum='E', so filtering on it would yield zero rows
      // and the stock cache would never refresh. Sync stock for every
      // active record; the storefront still gates display on local
      // ProductStatus.
      for await (const page of this.dia.scf.stokkartIterate({
        pageSize: STOCK_PAGE_SIZE,
        filters: [{ field: 'durum', operator: '=', value: 'A' }],
        selectedColumns: [...STOCK_SELECT_COLUMNS],
      })) {
        for (const s of page) {
          // Prefer the B2C-specific stock field if exposed; fall back to
          // fiili_stok for tenants that don't track a separate B2C depo.
          const qty = clampStock(parseDiaInt(s.b2c_depomiktari) || parseDiaInt(s.fiili_stok));
          const result = await this.prisma.productVariant.updateMany({
            where: { diaStokkartkodu: s.stokkartkodu },
            data: { stockQty: qty, stockSyncedAt: new Date() },
          });
          updated += result.count;
        }
      }
      return { inserted: 0, updated, unmatched: 0 };
    });
  }

  // ─── helpers ──────────────────────────────────────────────────────────────

  private async indexBrands(): Promise<Map<string, string>> {
    const rows = await this.prisma.brand.findMany({
      where: { diaMarkaKodu: { not: null } },
      select: { id: true, diaMarkaKodu: true },
    });
    return new Map(rows.flatMap((r) => (r.diaMarkaKodu ? [[r.diaMarkaKodu, r.id]] : [])));
  }

  private async indexCategories(): Promise<Map<string, string>> {
    const rows = await this.prisma.category.findMany({
      where: { diaKategoriKodu: { not: null } },
      select: { id: true, diaKategoriKodu: true },
    });
    return new Map(rows.flatMap((r) => (r.diaKategoriKodu ? [[r.diaKategoriKodu, r.id]] : [])));
  }

  private async runWithLog(
    entity: SyncEntity,
    work: () => Promise<{ inserted: number; updated: number; unmatched: number }>,
  ): Promise<SyncResult> {
    const startedAt = Date.now();
    const log = await this.prisma.diaSyncLog.create({
      data: { entity, status: 'running' },
      select: { id: true },
    });
    try {
      const stats = await work();
      const durationMs = Date.now() - startedAt;
      await this.prisma.diaSyncLog.update({
        where: { id: log.id },
        data: {
          status: 'success',
          finishedAt: new Date(),
          stats: stats,
        },
      });
      this.logger.log(
        `dia-sync:${entity} ok in ${durationMs.toString()}ms (insert=${stats.inserted.toString()} update=${stats.updated.toString()} unmatched=${stats.unmatched.toString()})`,
      );
      // Bust the storefront index pages so a fresh sync's price/stock
      // changes are visible immediately. PDPs (revalidate: 300) refresh
      // on the next ISR tick — the per-product invalidation is a Phase 6
      // optimisation that requires returning slugs from the upsert path.
      if (stats.inserted + stats.updated > 0) {
        await this.revalidation.revalidate({ paths: ['/', '/shop'] });
      }
      return { syncLogId: log.id, ...stats, durationMs };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await this.prisma.diaSyncLog.update({
        where: { id: log.id },
        data: { status: 'failed', finishedAt: new Date(), error: message },
      });
      this.logger.error({ err, entity }, `dia-sync:${entity} FAILED — ${message}`);
      throw err;
    }
  }
}

function slugForCategory(diaKodu: string, name: string): string {
  // Cheap deterministic slug from name + DIA code suffix
  return `${slugify(name) || 'kategori'}-${diaKodu.toLowerCase()}`;
}

function slugFromStokkart(stokkartkodu: string, name: string): string {
  // Stokkart codes (e.g. STK.0001) collide poorly when used directly in
  // URLs; combine the human name with the code so the URL is readable
  // but still uniquely tied to the DIA record.
  const codeSlug = stokkartkodu
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${slugify(name) || 'urun'}-${codeSlug}`;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * DIA returns money as a string with a fixed 10 decimal scale, e.g.
 * `"4000.0000000000"` for ₺4000.00. Convert to integer minor units
 * (kuruş). Returns 0 when the input is missing or unparseable.
 */
function parseDiaDecimalToMinor(input: string | number | undefined): number {
  if (input === undefined) return 0;
  const n = typeof input === 'number' ? input : Number.parseFloat(input);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 100);
}

function parseDiaInt(input: string | number | undefined): number {
  if (input === undefined) return 0;
  const n = typeof input === 'number' ? input : Number.parseFloat(input);
  if (!Number.isFinite(n)) return 0;
  return Math.trunc(n);
}

/** DIA may return negative `fiili_stok` (open returns/IR irsaliye); clamp. */
function clampStock(qty: number): number {
  return qty < 0 ? 0 : qty;
}
