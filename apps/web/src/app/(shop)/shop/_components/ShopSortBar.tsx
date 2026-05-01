'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface ShopSortBarProps {
  total: number;
  page: number;
  lastPage: number;
  visibleCount: number;
}

const SORT_OPTIONS = [
  { value: '', label: 'Önerilenler' },
  { value: 'newest', label: 'En Yeniler' },
  { value: 'price_asc', label: 'Fiyat — Artan' },
  { value: 'price_desc', label: 'Fiyat — Azalan' },
  { value: 'popularity', label: 'Popülerlik' },
];

/**
 * Compact strip above the product grid — total/visible count on the
 * left, sort dropdown on the right. Vendor `tf-shop-control` markup
 * but stripped of the filter pills (those moved to the FilterSidebar
 * left rail).
 */
export function ShopSortBar({ total, page, lastPage, visibleCount }: ShopSortBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const activeSort = params.get('sort') ?? '';

  const setSort = (value: string): void => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set('sort', value);
    else next.delete('sort');
    next.delete('page');
    router.push(`/shop?${next.toString()}`);
  };

  return (
    <div className="tf-shop-control d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
      <span className="text-main-2 small">
        Sayfa {page.toString()} / {lastPage.toString()} — {visibleCount.toString()} /{' '}
        {total.toString()} ürün gösteriliyor
      </span>
      <div className="d-flex align-items-center gap-2">
        <label htmlFor="shop-sort" className="form-label mb-0 text-main-2 small">
          Sırala:
        </label>
        <select
          id="shop-sort"
          className="form-select form-select-sm w-auto"
          value={activeSort}
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
