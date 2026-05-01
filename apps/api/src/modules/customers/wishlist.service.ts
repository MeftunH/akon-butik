import type { ProductSummary } from '@akonbutik/types';
import { Injectable } from '@nestjs/common';

// NestJS DI requires the runtime class — `import type` would tree-shake.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

function dedupe<T>(items: readonly T[]): T[] {
  return Array.from(new Set(items));
}

/**
 * Customer wishlist service. The Prisma `Wishlist` model has a unique
 * constraint on (userId, productId, variantId), so add() is naturally
 * idempotent — duplicate clicks resolve to the same row.
 *
 * GET returns full `ProductSummary` shape so the storefront can drop
 * the result straight into `<ProductGrid />` without a second round-trip.
 */
@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string): Promise<ProductSummary[]> {
    const rows = await this.prisma.wishlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
            images: { where: { isPrimary: true }, take: 1 },
            variants: { select: { size: true, color: true, stockQty: true } },
          },
        },
      },
    });
    return rows.map(({ product: p }) => ({
      id: p.id,
      slug: p.slug,
      nameTr: p.nameTr,
      brand: p.brand ? { id: p.brand.id, name: p.brand.name, slug: p.brand.slug } : null,
      category: p.category
        ? { id: p.category.id, name: p.category.nameTr, slug: p.category.slug }
        : null,
      defaultPriceMinor: p.defaultPriceMinor,
      primaryImageUrl: p.images[0]?.url ?? null,
      availableSizes: dedupe(p.variants.map((v) => v.size).filter((s): s is string => s !== null)),
      availableColors: dedupe(
        p.variants.map((v) => v.color).filter((c): c is string => c !== null),
      ).map((name) => ({ name, hex: '' })),
      inStock: p.variants.some((v) => v.stockQty > 0),
      status: p.status,
    }));
  }

  async productIds(userId: string): Promise<string[]> {
    const rows = await this.prisma.wishlist.findMany({
      where: { userId },
      select: { productId: true },
    });
    return rows.map((r) => r.productId);
  }

  async add(userId: string, productId: string, variantId?: string): Promise<void> {
    // Prisma's typed upsert on the compound unique requires `variantId: string`,
    // but the schema column is nullable. Use findFirst + conditional create —
    // duplicate clicks remain idempotent because the @@unique constraint at
    // the DB layer rejects collisions.
    const existing = await this.prisma.wishlist.findFirst({
      where: { userId, productId, variantId: variantId ?? null },
      select: { id: true },
    });
    if (existing) return;
    await this.prisma.wishlist.create({
      data: {
        userId,
        productId,
        ...(variantId !== undefined && { variantId }),
      },
    });
  }

  async remove(userId: string, productId: string): Promise<void> {
    await this.prisma.wishlist.deleteMany({
      where: { userId, productId },
    });
  }
}
