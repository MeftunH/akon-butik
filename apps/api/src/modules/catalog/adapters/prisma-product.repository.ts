import type {
  ProductBadge,
  ProductDetail,
  ProductFilterInput,
  ProductSummary,
} from '@akonbutik/types';
import { Injectable } from '@nestjs/common';

// NestJS DI requires the runtime class — `import type` would tree-shake.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../../prisma/prisma.service';
import type { ProductRepository } from '../ports/product.repository';

const NEW_ARRIVAL_WINDOW_DAYS = 30;

interface VariantPriceShape {
  priceOverrideMinor: number | null;
  stockQty: number;
}

/**
 * Compute compareAtPriceMinor: when at least one variant has an override
 * lower than the product's default, treat the default as the
 * pre-discount list price. Returns `null` when no variant is on sale.
 */
function deriveSale(
  defaultPriceMinor: number,
  variants: readonly VariantPriceShape[],
): { compareAtPriceMinor: number | null; minPriceMinor: number } {
  const overrides = variants
    .map((v) => v.priceOverrideMinor)
    .filter((p): p is number => p !== null);
  if (overrides.length === 0) {
    return { compareAtPriceMinor: null, minPriceMinor: defaultPriceMinor };
  }
  const minOverride = Math.min(...overrides);
  if (minOverride < defaultPriceMinor) {
    return { compareAtPriceMinor: defaultPriceMinor, minPriceMinor: minOverride };
  }
  return { compareAtPriceMinor: null, minPriceMinor: defaultPriceMinor };
}

function deriveBadges(opts: {
  compareAtPriceMinor: number | null;
  createdAt: Date;
  inStock: boolean;
}): ProductBadge[] {
  const badges: ProductBadge[] = [];
  if (opts.compareAtPriceMinor !== null) {
    badges.push({ type: 'sale', text: 'İndirim' });
  }
  const ageDays = (Date.now() - opts.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (ageDays <= NEW_ARRIVAL_WINDOW_DAYS && opts.inStock) {
    badges.push({ type: 'new', text: 'Yeni' });
  }
  return badges;
}

/**
 * Prisma-backed implementation of {@link ProductRepository}.
 * Returns domain types — never Prisma model instances — so callers stay decoupled.
 */
@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(
    filter: ProductFilterInput,
  ): Promise<{ items: readonly ProductSummary[]; total: number }> {
    const page = filter.page ?? 1;
    const pageSize = filter.pageSize ?? 24;
    const skip = (page - 1) * pageSize;

    const where = {
      status: 'visible' as const,
      ...(filter.category && { category: { slug: filter.category } }),
      ...(filter.brand && { brand: { slug: filter.brand } }),
      ...(filter.minPriceMinor !== undefined || filter.maxPriceMinor !== undefined
        ? {
            defaultPriceMinor: {
              ...(filter.minPriceMinor !== undefined && { gte: filter.minPriceMinor }),
              ...(filter.maxPriceMinor !== undefined && { lte: filter.maxPriceMinor }),
            },
          }
        : {}),
    };

    const [rows, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          brand: true,
          category: true,
          images: { where: { isPrimary: true }, take: 1 },
          variants: {
            select: { size: true, color: true, stockQty: true, priceOverrideMinor: true },
          },
        },
        skip,
        take: pageSize,
        orderBy: orderByForSort(filter.sort),
      }),
      this.prisma.product.count({ where }),
    ]);

    const items: ProductSummary[] = rows.map((p) => {
      const inStock = p.variants.some((v) => v.stockQty > 0);
      const { compareAtPriceMinor } = deriveSale(p.defaultPriceMinor, p.variants);
      const badges = deriveBadges({
        compareAtPriceMinor,
        createdAt: p.createdAt,
        inStock,
      });
      return {
        id: p.id,
        slug: p.slug,
        nameTr: p.nameTr,
        brand: p.brand ? { id: p.brand.id, name: p.brand.name, slug: p.brand.slug } : null,
        category: p.category
          ? { id: p.category.id, name: p.category.nameTr, slug: p.category.slug }
          : null,
        defaultPriceMinor: p.defaultPriceMinor,
        compareAtPriceMinor,
        primaryImageUrl: p.images[0]?.url ?? null,
        availableSizes: dedupe(
          p.variants.map((v) => v.size).filter((s): s is string => s !== null),
        ),
        availableColors: dedupe(
          p.variants.map((v) => v.color).filter((c): c is string => c !== null),
        ).map((name) => ({ name, hex: '' })),
        badges,
        inStock,
        status: p.status,
      };
    });

    return { items, total };
  }

  async findBySlug(slug: string): Promise<ProductDetail | null> {
    const p = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { orderBy: { sku: 'asc' } },
      },
    });
    if (!p) return null;
    const inStock = p.variants.some((v) => v.stockQty > 0);
    const { compareAtPriceMinor } = deriveSale(p.defaultPriceMinor, p.variants);
    const badges = deriveBadges({
      compareAtPriceMinor,
      createdAt: p.createdAt,
      inStock,
    });
    return {
      id: p.id,
      slug: p.slug,
      nameTr: p.nameTr,
      descriptionMd: p.descriptionMd,
      brand: p.brand ? { id: p.brand.id, name: p.brand.name, slug: p.brand.slug } : null,
      category: p.category
        ? { id: p.category.id, name: p.category.nameTr, slug: p.category.slug }
        : null,
      defaultPriceMinor: p.defaultPriceMinor,
      compareAtPriceMinor,
      primaryImageUrl: p.images.find((i) => i.isPrimary)?.url ?? p.images[0]?.url ?? null,
      images: p.images.map((i) => ({
        url: i.url,
        sortOrder: i.sortOrder,
        isPrimary: i.isPrimary,
      })),
      availableSizes: dedupe(p.variants.map((v) => v.size).filter((s): s is string => s !== null)),
      availableColors: dedupe(
        p.variants.map((v) => v.color).filter((c): c is string => c !== null),
      ).map((name) => ({ name, hex: '' })),
      badges,
      inStock,
      status: p.status,
      variants: p.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        size: v.size,
        color: v.color,
        priceMinor: v.priceOverrideMinor ?? p.defaultPriceMinor,
        stockQty: v.stockQty,
      })),
    };
  }
}

function orderByForSort(sort: ProductFilterInput['sort']) {
  switch (sort) {
    case 'price_asc':
      return { defaultPriceMinor: 'asc' as const };
    case 'price_desc':
      return { defaultPriceMinor: 'desc' as const };
    case 'newest':
    default:
      return { createdAt: 'desc' as const };
  }
}

function dedupe<T>(items: readonly T[]): readonly T[] {
  return [...new Set(items)];
}
