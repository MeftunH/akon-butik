import type { ProductSummary } from '@akonbutik/types';
import clsx from 'clsx';

import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: readonly ProductSummary[];
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
  emptyMessage?: string;
}

/**
 * Product listing grid using vendor `tf-grid-layout` rules. The vendor
 * scss has tuned breakpoints + spacing for these classes specifically;
 * dropping back to plain Bootstrap row/col yields a flatter layout that
 * doesn't match the rest of the site.
 */
const COL_CLASS: Record<NonNullable<ProductGridProps['columns']>, string> = {
  2: 'tf-grid-layout tf-col-2',
  3: 'tf-grid-layout tf-col-2 md-col-3',
  4: 'tf-grid-layout tf-col-2 md-col-3 xl-col-4',
  5: 'tf-grid-layout tf-col-2 md-col-3 xl-col-5',
  6: 'tf-grid-layout tf-col-2 md-col-3 xl-col-6',
};

export function ProductGrid({
  products,
  columns = 4,
  className,
  emptyMessage = 'Burada henüz ürün yok.',
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="text-center text-muted py-5">{emptyMessage}</p>;
  }
  return (
    <div className={clsx(COL_CLASS[columns], className)}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
