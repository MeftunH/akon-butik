'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'price_asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price_desc', label: 'Fiyat: Yüksekten Düşüğe' },
] as const;

/**
 * URL-driven filter sidebar. Each control mutates the searchParams and the
 * server re-renders with the new filter applied. No client-side product list.
 *
 * Phase 5 expands this with size/colour/brand/price-range — for MVP only sort
 * + in-stock toggle are wired so the migration is end-to-end testable.
 */
export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const update = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(search.toString());
      if (value === null) next.delete(key);
      else next.set(key, value);
      next.delete('page');
      router.push(`${pathname}?${next.toString()}`);
    },
    [router, pathname, search],
  );

  return (
    <div className="filters">
      <div className="mb-4">
        <label htmlFor="sort" className="form-label fw-semibold">
          Sırala
        </label>
        <select
          id="sort"
          className="form-select"
          value={search.get('sort') ?? 'newest'}
          onChange={(e) => update('sort', e.target.value)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-check">
        <input
          id="inStock"
          type="checkbox"
          className="form-check-input"
          checked={search.get('inStock') === 'true'}
          onChange={(e) => update('inStock', e.target.checked ? 'true' : null)}
        />
        <label htmlFor="inStock" className="form-check-label">
          Sadece stoktakiler
        </label>
      </div>
    </div>
  );
}
