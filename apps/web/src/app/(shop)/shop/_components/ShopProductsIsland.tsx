'use client';

import type { ProductSummary } from '@akonbutik/types';
import { ProductGrid } from '@akonbutik/ui';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'akon.shop.layout';
type Layout = 2 | 3 | 4;

interface ShopProductsIslandProps {
  products: readonly ProductSummary[];
}

const LAYOUTS: readonly Layout[] = [2, 3, 4];

/**
 * Product grid + 2/3/4-col density toggle. Persists the chosen column
 * count to localStorage so the customer's preferred density survives
 * across visits. The page/total count moved to ShopSortBar above this
 * island; the toggle row stays right above the grid.
 */
export function ShopProductsIsland({ products }: ShopProductsIslandProps) {
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

  return (
    <>
      <div className="layout-handler d-flex justify-content-end gap-1 mb-3">
        <span className="text-main-2 small me-2 align-self-center">Görünüm:</span>
        {LAYOUTS.map((n) => (
          <button
            key={n}
            type="button"
            className={`btn btn-sm ${cols === n ? 'btn-dark' : 'btn-outline-secondary'}`}
            onClick={() => {
              setCols(n);
            }}
            aria-pressed={cols === n}
            aria-label={`${n.toString()} sütun`}
            title={`${n.toString()} sütun`}
          >
            {n.toString()}
          </button>
        ))}
      </div>

      <ProductGrid
        products={products}
        columns={cols}
        emptyMessage="Bu filtre için ürün bulunamadı."
      />
    </>
  );
}
