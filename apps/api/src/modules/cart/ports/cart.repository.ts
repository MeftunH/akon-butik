import type { CartSnapshot } from '@akonbutik/types';

export const CART_REPOSITORY = Symbol('CART_REPOSITORY');

export interface CartIdentity {
  userId?: string;
  sessionId?: string;
}

export interface CartRepository {
  /** Look up the cart for the identity; returns null if none exists yet. */
  find(identity: CartIdentity): Promise<CartSnapshot | null>;

  /** Idempotently create-or-fetch a cart for the identity. */
  ensure(identity: CartIdentity): Promise<CartSnapshot>;

  addItem(identity: CartIdentity, variantId: string, quantity: number): Promise<CartSnapshot>;
  updateItemQuantity(
    identity: CartIdentity,
    variantId: string,
    quantity: number,
  ): Promise<CartSnapshot>;
  removeItem(identity: CartIdentity, variantId: string): Promise<CartSnapshot>;
  clear(identity: CartIdentity): Promise<CartSnapshot>;
}
