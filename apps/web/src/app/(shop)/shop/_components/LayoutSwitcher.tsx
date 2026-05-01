'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const STORAGE_KEY = 'akon.shop.layout';
type Layout = 2 | 3 | 4;

const OPTIONS: { value: Layout; label: string; icon: string }[] = [
  { value: 2, label: '2 sütun', icon: 'icon-grid-2' },
  { value: 3, label: '3 sütun', icon: 'icon-grid-3' },
  { value: 4, label: '4 sütun', icon: 'icon-grid-4' },
];

/**
 * Vendor `products/LayoutHandler.tsx` mirror — pill row of grid-column
 * toggles. Persists choice to localStorage so the customer's preferred
 * density survives across visits.
 *
 * Exposes `useLayoutCols()` so the consuming server component snapshot
 * stays simple — column count is purely client state, doesn't need to
 * round-trip through URL params.
 */
export function useLayoutCols(): [Layout, Dispatch<SetStateAction<Layout>>] {
  const [cols, setCols] = useState<Layout>(4);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const n = Number(raw);
      if (n === 2 || n === 3 || n === 4) setCols(n);
    } catch {
      // SSR / private browsing — ignore.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(cols));
    } catch {
      // ignore
    }
  }, [cols]);

  return [cols, setCols];
}

interface LayoutSwitcherProps {
  cols: Layout;
  onChange: (cols: Layout) => void;
  totalLabel: string;
}

export function LayoutSwitcher({ cols, onChange, totalLabel }: LayoutSwitcherProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
      <span className="text-main-2 small">{totalLabel}</span>
      <div className="layout-handler d-flex align-items-center gap-2">
        <span className="text-main-2 small">Görünüm:</span>
        <ul className="d-flex list-unstyled mb-0 gap-1">
          {OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={`btn btn-sm ${
                  cols === opt.value ? 'btn-dark' : 'btn-outline-secondary'
                } d-flex align-items-center gap-1`}
                onClick={() => {
                  onChange(opt.value);
                }}
                aria-pressed={cols === opt.value}
                aria-label={opt.label}
                title={opt.label}
              >
                <span>{opt.value.toString()}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface ShopGridControlProps {
  total: number;
  page: number;
  lastPage: number;
  visibleCount: number;
  cols: Layout;
  onColsChange: (cols: Layout) => void;
}

/**
 * Compact strip above the product grid showing pagination context +
 * the LayoutSwitcher pill. Wraps both into one client component so
 * the server-rendered shop page can be flat.
 */
export function ShopGridControl({
  total,
  page,
  lastPage,
  visibleCount,
  cols,
  onColsChange,
}: ShopGridControlProps) {
  return (
    <LayoutSwitcher
      cols={cols}
      onChange={onColsChange}
      totalLabel={`Sayfa ${page.toString()} / ${lastPage.toString()} — ${visibleCount.toString()} / ${total.toString()} ürün`}
    />
  );
}
