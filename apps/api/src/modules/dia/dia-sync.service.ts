import { Inject, Injectable, Logger } from '@nestjs/common';
import type { DiaClient, Stokkart } from '@akonbutik/dia-client';
import type { Prisma } from '@akonbutik/database';

import { PrismaService } from '../prisma/prisma.service';

import { aggregateStokkarts } from './mapping/aggregate-stokkarts';
import { DIA_CLIENT } from './dia.module';

const PRODUCT_PAGE_SIZE = 100;
const STOCK_PAGE_SIZE = 200;

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
  ) {}

  // ─── Categories ───────────────────────────────────────────────────────────

  async syncCategories(): Promise<SyncResult> {
    return this.runWithLog('categories', async () => {
      const records = await this.dia.scf.kategoriListele({ limit: 500 });
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
        selectedColumns: [
          '_key',
          'stokkartkodu',
          'aciklama',
          'satisfiyati1',
          'durum',
          'b2c_durum',
          'b2c_depomiktari',
          'urungrubu',
          'urunmodelkodu',
          'markakodu',
          'kategorikodu',
          'beden',
          'renk',
        ],
      })) {
        all.push(...page);
      }

      const changeset = aggregateStokkarts(all);

      // Resolve brand/category dia codes → local IDs once
      const [brandIdByDiaKodu, categoryIdByDiaKodu] = await Promise.all([
        this.indexBrands(),
        this.indexCategories(),
      ]);

      let inserted = 0;
      let updated = 0;
      const now = new Date();

      // Upsert one product + its variants per transaction. Batch size 1 is
      // fine for ≤10k products; revisit when the catalog scales beyond that.
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
    });
  }

  // ─── Stock-only refresh (B2C cache) ───────────────────────────────────────

  async syncStock(): Promise<SyncResult> {
    return this.runWithLog('stock', async () => {
      let updated = 0;
      for await (const page of this.dia.scf.stokkartIterate({
        pageSize: STOCK_PAGE_SIZE,
        filters: [
          { field: 'durum', operator: '=', value: 'A' },
          { field: 'b2c_durum', operator: '=', value: 'E' },
        ],
        selectedColumns: ['_key', 'stokkartkodu', 'b2c_depomiktari'],
      })) {
        for (const s of page) {
          const qty = typeof s.b2c_depomiktari === 'number' ? s.b2c_depomiktari : 0;
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
          stats: stats as unknown as Prisma.InputJsonValue,
        },
      });
      this.logger.log(
        `dia-sync:${entity} ok in ${durationMs.toString()}ms (insert=${stats.inserted.toString()} update=${stats.updated.toString()} unmatched=${stats.unmatched.toString()})`,
      );
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
  const base = name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return `${base || 'kategori'}-${diaKodu.toLowerCase()}`;
}
