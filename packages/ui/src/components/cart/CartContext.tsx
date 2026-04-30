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

import type { ProductVariantSummary, CartItem as DomainCartItem } from '@akonbutik/types';

const STORAGE_KEY = 'akonbutik:cart-v1';

/**
 * Cart context. Currently a localStorage-backed client cache so guest carts
 * survive page refresh; in Phase 3 this is paired with a server-side cart
 * via /api/cart so the user's cart follows them across devices.
 */
export interface CartLine extends DomainCartItem {
  variant: ProductVariantSummary;
  productSlug: string;
  productNameTr: string;
  primaryImageUrl: string | null;
}

interface CartContextValue {
  lines: readonly CartLine[];
  totalQuantity: number;
  subtotalMinor: number;
  add: (line: Omit<CartLine, 'quantity'> & { quantity?: number }) => void;
  remove: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  has: (variantId: string) => boolean;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<readonly CartLine[]>([]);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* noop — corrupt storage; treat as empty */
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* noop — quota exceeded or private mode */
    }
  }, [lines]);

  const add = useCallback<CartContextValue['add']>((line) => {
    setLines((prev) => {
      const existing = prev.find((p) => p.variantId === line.variantId);
      if (existing) {
        return prev.map((p) =>
          p.variantId === line.variantId
            ? { ...p, quantity: p.quantity + (line.quantity ?? 1) }
            : p,
        );
      }
      return [...prev, { ...line, quantity: line.quantity ?? 1 }];
    });
  }, []);

  const remove = useCallback<CartContextValue['remove']>((variantId) => {
    setLines((prev) => prev.filter((p) => p.variantId !== variantId));
  }, []);

  const setQuantity = useCallback<CartContextValue['setQuantity']>((variantId, quantity) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((p) => p.variantId !== variantId));
      return;
    }
    setLines((prev) =>
      prev.map((p) => (p.variantId === variantId ? { ...p, quantity } : p)),
    );
  }, []);

  const has = useCallback<CartContextValue['has']>(
    (variantId) => lines.some((p) => p.variantId === variantId),
    [lines],
  );

  const clear = useCallback<CartContextValue['clear']>(() => {
    setLines([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = lines.reduce((acc, l) => acc + l.quantity, 0);
    const subtotalMinor = lines.reduce(
      (acc, l) => acc + l.variant.priceMinor * l.quantity,
      0,
    );
    return { lines, totalQuantity, subtotalMinor, add, remove, setQuantity, has, clear };
  }, [lines, add, remove, setQuantity, has, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
