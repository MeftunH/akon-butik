'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { CartSnapshot } from '@akonbutik/types';

const EMPTY_CART: CartSnapshot = {
  items: [],
  subtotalMinor: 0,
  shippingMinor: 0,
  totalMinor: 0,
  currency: 'TRY',
};

interface CartContextValue {
  cart: CartSnapshot;
  loading: boolean;
  add: (variantId: string, quantity?: number) => Promise<void>;
  setQuantity: (variantId: string, quantity: number) => Promise<void>;
  remove: (variantId: string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export interface CartProviderProps {
  children: ReactNode;
  /** Browser-side base URL for the storefront cart endpoints (defaults to relative). */
  cartEndpoint?: string;
}

/**
 * Server-side cart wrapper. The browser keeps a CartSnapshot in React state
 * mirrored from /api/cart; every mutation re-fetches the authoritative snapshot
 * so subtotal/shipping/total stay consistent with backend pricing logic.
 *
 * The session cookie is set automatically by the API on the first GET; we just
 * need to send it back. `credentials: 'include'` is required for that.
 */
export function CartProvider({
  children,
  cartEndpoint = '/api/cart',
}: CartProviderProps) {
  const [cart, setCart] = useState<CartSnapshot>(EMPTY_CART);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(cartEndpoint, { credentials: 'include' });
      if (res.ok) setCart((await res.json()) as CartSnapshot);
    } finally {
      setLoading(false);
    }
  }, [cartEndpoint]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const add = useCallback<CartContextValue['add']>(
    async (variantId, quantity = 1) => {
      const res = await fetch(`${cartEndpoint}/items`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ variantId, quantity }),
      });
      if (res.ok) setCart((await res.json()) as CartSnapshot);
    },
    [cartEndpoint],
  );

  const setQuantity = useCallback<CartContextValue['setQuantity']>(
    async (variantId, quantity) => {
      const res = await fetch(`${cartEndpoint}/items/${variantId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      if (res.ok) setCart((await res.json()) as CartSnapshot);
    },
    [cartEndpoint],
  );

  const remove = useCallback<CartContextValue['remove']>(
    async (variantId) => {
      const res = await fetch(`${cartEndpoint}/items/${variantId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) setCart((await res.json()) as CartSnapshot);
    },
    [cartEndpoint],
  );

  const clear = useCallback<CartContextValue['clear']>(async () => {
    const res = await fetch(cartEndpoint, { method: 'DELETE', credentials: 'include' });
    if (res.ok) setCart((await res.json()) as CartSnapshot);
  }, [cartEndpoint]);

  const value = useMemo<CartContextValue>(
    () => ({ cart, loading, add, setQuantity, remove, clear, refresh }),
    [cart, loading, add, setQuantity, remove, clear, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}

/** Backwards-compat type for callers that imported CartLine. */
export type CartLine = CartSnapshot['items'][number];
