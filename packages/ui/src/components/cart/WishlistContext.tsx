'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface WishlistContextValue {
  productIds: ReadonlySet<string>;
  loading: boolean;
  /** True once the customer wishlist has loaded from server (logged-in mode). */
  authenticated: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export interface WishlistProviderProps {
  children: ReactNode;
  /** Endpoint base — defaults to relative `/api/customers/me/wishlist`. */
  endpoint?: string;
  /**
   * Fired when the customer hits the heart while logged out. The provider
   * still applies the toggle locally (localStorage), so this is a soft
   * affordance — typically the storefront uses it to prefetch /login but
   * doesn't force a redirect on every click.
   */
  onUnauthenticated?: () => void;
}

const GUEST_STORAGE_KEY = 'akonbutik:wishlist:guest';

function readGuestSet(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(GUEST_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((v): v is string => typeof v === 'string'));
  } catch {
    return new Set();
  }
}

function writeGuestSet(ids: ReadonlySet<string>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Quota / private mode — silently degrade. The in-memory set still works.
  }
}

/**
 * Customer wishlist state mirror, structured the same way as `CartProvider`
 * — initial fetch on mount, mutate then re-fetch / optimistic update.
 *
 * Two modes:
 *
 *  - Authenticated: GET /ids on mount returns 200; mutations POST/DELETE
 *    against `/api/customers/me/wishlist`. Optimistic updates roll back on
 *    network failure.
 *  - Guest (401 from /ids): the provider transparently switches to a
 *    localStorage-backed set so the heart toggle still appears to work and
 *    survives page navigation. `onUnauthenticated` fires on each guest
 *    toggle as a hook for the storefront to prefetch /login or surface a
 *    one-time hint, but the click is NOT silently dropped.
 *
 * Endpoints used: `/api/customers/me/wishlist/ids` (GET, lightweight),
 * `/api/customers/me/wishlist` (POST), and `/api/customers/me/wishlist/:id`
 * (DELETE).
 */
export function WishlistProvider({
  children,
  endpoint = '/api/customers/me/wishlist',
  onUnauthenticated,
}: WishlistProviderProps) {
  const [productIds, setProductIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  // Latch the post-mount guest hydration so we don't overwrite localStorage
  // with the empty SSR-time set on the first commit.
  const hydratedRef = useRef(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${endpoint}/ids`, { credentials: 'include' });
      if (res.status === 401) {
        setAuthenticated(false);
        setProductIds(readGuestSet());
        return;
      }
      if (res.ok) {
        const ids = (await res.json()) as readonly string[];
        setProductIds(new Set(ids));
        setAuthenticated(true);
      }
    } catch {
      // Network down or API unreachable — fall back to guest cache so the
      // heart still functions offline.
      setAuthenticated(false);
      setProductIds(readGuestSet());
    } finally {
      hydratedRef.current = true;
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (productId: string): Promise<void> => {
      if (!authenticated) {
        // Guest path: persist locally so the heart visibly toggles and the
        // /wishlist page (once we honour guest carts there) can read it.
        onUnauthenticated?.();
        setProductIds((prev) => {
          const next = new Set(prev);
          if (next.has(productId)) next.delete(productId);
          else next.add(productId);
          writeGuestSet(next);
          return next;
        });
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
        const response = isFav
          ? await fetch(`${endpoint}/${encodeURIComponent(productId)}`, {
              method: 'DELETE',
              credentials: 'include',
            })
          : await fetch(endpoint, {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ productId }),
            });
        if (!response.ok) throw new Error(`Wishlist mutation failed (${response.status})`);
      } catch {
        // Roll back optimistic update on network / server error.
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

  // Cross-tab sync for guest mode. Authenticated mode goes through the API
  // so a second tab will see updated state on its next /ids call.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onStorage = (e: StorageEvent) => {
      if (e.key !== GUEST_STORAGE_KEY || authenticated) return;
      setProductIds(readGuestSet());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [authenticated]);

  const value = useMemo<WishlistContextValue>(
    () => ({ productIds, loading, authenticated, has, toggle, refresh }),
    [productIds, loading, authenticated, has, toggle, refresh],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within <WishlistProvider>');
  return ctx;
}
