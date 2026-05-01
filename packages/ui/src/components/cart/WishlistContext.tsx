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

interface WishlistContextValue {
  productIds: ReadonlySet<string>;
  loading: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export interface WishlistProviderProps {
  children: ReactNode;
  /** Endpoint base — defaults to relative `/api/customers/me/wishlist`. */
  endpoint?: string;
  /** Fired when the customer hits the heart while logged out. */
  onUnauthenticated?: () => void;
}

/**
 * Customer wishlist state mirror, structured the same way as `CartProvider`
 * — initial fetch on mount, mutate then re-fetch / optimistic update.
 *
 * Backend is `/api/customers/me/wishlist/ids` (lightweight GET that
 * returns just the productId set, used by ProductCard heart toggles)
 * + `/api/customers/me/wishlist` POST/DELETE.
 *
 * Logged-out behavior: GET /ids returns 401; we treat that as "no
 * wishlist available" (empty set). When the customer hits the heart
 * while unauthenticated, the toggle delegates to `onUnauthenticated`
 * (storefront wires this to `router.push('/login?next=...')`).
 */
export function WishlistProvider({
  children,
  endpoint = '/api/customers/me/wishlist',
  onUnauthenticated,
}: WishlistProviderProps) {
  const [productIds, setProductIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${endpoint}/ids`, { credentials: 'include' });
      if (res.status === 401) {
        setAuthenticated(false);
        setProductIds(new Set());
        return;
      }
      if (res.ok) {
        const ids = (await res.json()) as readonly string[];
        setProductIds(new Set(ids));
        setAuthenticated(true);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (productId: string): Promise<void> => {
      if (!authenticated) {
        onUnauthenticated?.();
        return;
      }
      const isFav = productIds.has(productId);
      // Optimistic update.
      setProductIds((prev) => {
        const next = new Set(prev);
        if (isFav) next.delete(productId);
        else next.add(productId);
        return next;
      });
      try {
        if (isFav) {
          await fetch(`${endpoint}/${encodeURIComponent(productId)}`, {
            method: 'DELETE',
            credentials: 'include',
          });
        } else {
          await fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ productId }),
          });
        }
      } catch {
        // Roll back optimistic update on network error.
        setProductIds((prev) => {
          const next = new Set(prev);
          if (isFav) next.add(productId);
          else next.delete(productId);
          return next;
        });
      }
    },
    [authenticated, endpoint, onUnauthenticated, productIds],
  );

  const has = useCallback((productId: string) => productIds.has(productId), [productIds]);

  const value = useMemo<WishlistContextValue>(
    () => ({ productIds, loading, has, toggle, refresh }),
    [productIds, loading, has, toggle, refresh],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within <WishlistProvider>');
  return ctx;
}
