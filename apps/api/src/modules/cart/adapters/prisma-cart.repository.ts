import { Injectable, NotFoundException } from '@nestjs/common';
import type { CartSnapshot } from '@akonbutik/types';

import { PrismaService } from '../../prisma/prisma.service';
import type { CartIdentity, CartRepository } from '../ports/cart.repository';

const SHIPPING_THRESHOLD_MINOR = 45_000_00; // 45 000 TL? (placeholder — confirm with stakeholder)
const SHIPPING_BASE_MINOR = 49_90;

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(identity: CartIdentity): Promise<CartSnapshot | null> {
    const cart = await this.findCartRow(identity);
    return cart ? this.toSnapshot(cart) : null;
  }

  async ensure(identity: CartIdentity): Promise<CartSnapshot> {
    let cart = await this.findCartRow(identity);
    if (!cart) {
      const created = await this.prisma.cart.create({
        data: {
          ...(identity.userId && { userId: identity.userId }),
          ...(identity.sessionId && { sessionId: identity.sessionId }),
        },
      });
      cart = await this.loadCartById(created.id);
    }
    return this.toSnapshot(cart);
  }

  async addItem(
    identity: CartIdentity,
    variantId: string,
    quantity: number,
  ): Promise<CartSnapshot> {
    const cart = await this.ensureCartRow(identity);
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      select: { id: true, productId: true, stockQty: true },
    });
    if (!variant) throw new NotFoundException(`Variant not found: ${variantId}`);

    const existing = await this.prisma.cartItem.findUnique({
      where: { cartId_variantId: { cartId: cart.id, variantId } },
    });
    const newQty = Math.min(variant.stockQty, (existing?.quantity ?? 0) + quantity);

    if (existing) {
      await this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: newQty },
      });
    } else {
      await this.prisma.cartItem.create({
        data: { cartId: cart.id, productId: variant.productId, variantId, quantity: newQty },
      });
    }
    return this.toSnapshot(await this.loadCartById(cart.id));
  }

  async updateItemQuantity(
    identity: CartIdentity,
    variantId: string,
    quantity: number,
  ): Promise<CartSnapshot> {
    const cart = await this.ensureCartRow(identity);
    if (quantity <= 0) {
      await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id, variantId } });
    } else {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: variantId },
        select: { stockQty: true },
      });
      if (!variant) throw new NotFoundException(`Variant not found: ${variantId}`);
      const clamped = Math.min(variant.stockQty, quantity);
      await this.prisma.cartItem.updateMany({
        where: { cartId: cart.id, variantId },
        data: { quantity: clamped },
      });
    }
    return this.toSnapshot(await this.loadCartById(cart.id));
  }

  async removeItem(identity: CartIdentity, variantId: string): Promise<CartSnapshot> {
    const cart = await this.ensureCartRow(identity);
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id, variantId } });
    return this.toSnapshot(await this.loadCartById(cart.id));
  }

  async clear(identity: CartIdentity): Promise<CartSnapshot> {
    const cart = await this.findCartRow(identity);
    if (!cart) return this.toSnapshot(null);
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return this.toSnapshot(await this.loadCartById(cart.id));
  }

  // ─── helpers ────────────────────────────────────────────────────────

  private findCartRow(identity: CartIdentity) {
    if (identity.userId) {
      return this.prisma.cart.findUnique({
        where: { userId: identity.userId },
        include: cartItemInclude,
      });
    }
    if (identity.sessionId) {
      return this.prisma.cart.findUnique({
        where: { sessionId: identity.sessionId },
        include: cartItemInclude,
      });
    }
    return Promise.resolve(null);
  }

  private async ensureCartRow(identity: CartIdentity) {
    let cart = await this.findCartRow(identity);
    if (!cart) {
      const created = await this.prisma.cart.create({
        data: {
          ...(identity.userId && { userId: identity.userId }),
          ...(identity.sessionId && { sessionId: identity.sessionId }),
        },
      });
      cart = await this.loadCartById(created.id);
    }
    if (!cart) throw new Error('Cart row vanished after create — concurrent delete?');
    return cart;
  }

  private async loadCartById(id: string) {
    const c = await this.prisma.cart.findUnique({
      where: { id },
      include: cartItemInclude,
    });
    if (!c) throw new Error(`Cart ${id} not found`);
    return c;
  }

  private toSnapshot(
    cart: Awaited<ReturnType<PrismaCartRepository['loadCartById']>> | null,
  ): CartSnapshot {
    const items =
      cart?.items.map((line) => {
        const product = line.product;
        const variant = line.variant;
        const primaryImage =
          product.images.find((i) => i.isPrimary)?.url ?? product.images[0]?.url ?? null;
        const priceMinor = variant.priceOverrideMinor ?? product.defaultPriceMinor;
        return {
          variantId: variant.id,
          quantity: line.quantity,
          product: {
            id: product.id,
            slug: product.slug,
            nameTr: product.nameTr,
            brand: null,
            category: null,
            defaultPriceMinor: product.defaultPriceMinor,
            primaryImageUrl: primaryImage,
            availableSizes: [],
            availableColors: [],
            inStock: variant.stockQty > 0,
            status: product.status,
          },
          variant: {
            id: variant.id,
            sku: variant.sku,
            size: variant.size,
            color: variant.color,
            priceMinor,
            stockQty: variant.stockQty,
          },
        };
      }) ?? [];

    const subtotalMinor = items.reduce(
      (acc, item) => acc + item.variant.priceMinor * item.quantity,
      0,
    );
    const shippingMinor =
      subtotalMinor === 0 || subtotalMinor >= SHIPPING_THRESHOLD_MINOR ? 0 : SHIPPING_BASE_MINOR;
    return {
      items,
      subtotalMinor,
      shippingMinor,
      totalMinor: subtotalMinor + shippingMinor,
      currency: 'TRY',
    };
  }
}

const cartItemInclude = {
  items: {
    include: {
      product: { include: { images: true } },
      variant: true,
    },
  },
} as const;
