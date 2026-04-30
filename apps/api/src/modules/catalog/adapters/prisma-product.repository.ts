import { Injectable } from '@nestjs/common';
import type { ProductDetail, ProductFilterInput, ProductSummary } from '@akonbutik/types';

import { PrismaService } from '../../prisma/prisma.service.js';
import type { ProductRepository } from '../ports/product.repository.js';

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
          variants: { select: { size: true, color: true, stockQty: true } },
        },
        skip,
        take: pageSize,
        orderBy: orderByForSort(filter.sort),
      }),
      this.prisma.product.count({ where }),
    ]);

    const items: ProductSummary[] = rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      nameTr: p.nameTr,
      brand: p.brand ? { id: p.brand.id, name: p.brand.name, slug: p.brand.slug } : null,
      category: p.category
        ? { id: p.category.id, name: p.category.nameTr, slug: p.category.slug }
        : null,
      defaultPriceMinor: p.defaultPriceMinor,
      primaryImageUrl: p.images[0]?.url ?? null,
      availableSizes: dedupe(
        p.variants.map((v) => v.size).filter((s): s is string => s !== null),
      ),
      availableColors: dedupe(
        p.variants.map((v) => v.color).filter((c): c is string => c !== null),
      ).map((name) => ({ name, hex: '' })),
      inStock: p.variants.some((v) => v.stockQty > 0),
      status: p.status,
    }));

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
      primaryImageUrl: p.images.find((i) => i.isPrimary)?.url ?? p.images[0]?.url ?? null,
      images: p.images.map((i) => ({
        url: i.url,
        sortOrder: i.sortOrder,
        isPrimary: i.isPrimary,
      })),
      availableSizes: dedupe(
        p.variants.map((v) => v.size).filter((s): s is string => s !== null),
      ),
      availableColors: dedupe(
        p.variants.map((v) => v.color).filter((c): c is string => c !== null),
      ).map((name) => ({ name, hex: '' })),
      inStock: p.variants.some((v) => v.stockQty > 0),
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
