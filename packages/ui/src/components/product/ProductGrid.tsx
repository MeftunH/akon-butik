import clsx from 'clsx';
import type { ProductSummary } from '@akonbutik/types';

import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: readonly ProductSummary[];
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
  emptyMessage?: string;
}

const COL_CLASS: Record<NonNullable<ProductGridProps['columns']>, string> = {
  2: 'col-6',
  3: 'col-md-4 col-6',
  4: 'col-lg-3 col-md-4 col-6',
  5: 'col-xl col-lg-3 col-md-4 col-6',
  6: 'col-xl-2 col-lg-3 col-md-4 col-6',
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
    <div className={clsx('row gx-4 gy-4', className)}>
      {products.map((p) => (
        <div key={p.id} className={COL_CLASS[columns]}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
