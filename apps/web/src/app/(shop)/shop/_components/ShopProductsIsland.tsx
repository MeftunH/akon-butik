'use client';

import type { ProductSummary } from '@akonbutik/types';
import { ProductGrid } from '@akonbutik/ui';

import { LayoutSwitcher, useLayoutCols } from './LayoutSwitcher';

interface ShopProductsIslandProps {
  products: readonly ProductSummary[];
  total: number;
  page: number;
  lastPage: number;
}

/**
 * Client island that hosts the LayoutSwitcher (column-count chooser
 * persisted to localStorage) + the ProductGrid. The page server
 * component fetches and hands `products` down as a prop, the island
 * just decides the column count locally.
 */
export function ShopProductsIsland({ products, total, page, lastPage }: ShopProductsIslandProps) {
  const [cols, setCols] = useLayoutCols();

  return (
    <>
      <LayoutSwitcher
        cols={cols}
        onChange={setCols}
        totalLabel={`Sayfa ${page.toString()} / ${lastPage.toString()} — ${products.length.toString()} / ${total.toString()} ürün gösteriliyor`}
      />
      <ProductGrid
        products={products}
        columns={cols}
        emptyMessage="Bu filtre için ürün bulunamadı."
      />
    </>
  );
}
