import clsx from 'clsx';
import Link from 'next/link';
import type { ProductSummary } from '@akonbutik/types';

import { Price } from '../Price';

export interface ProductCardProps {
  product: ProductSummary;
  className?: string;
}

/**
 * Storefront product card — the listing-page atom. Uses the API-shaped
 * `ProductSummary` directly so there's no extra mapping layer.
 */
export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article className={clsx('card-product', className)}>
      <Link href={`/products/${product.slug}`} className="product-img d-block">
        {product.primaryImageUrl ? (
          <img
            src={product.primaryImageUrl}
            alt={product.nameTr}
            loading="lazy"
            className="lazyload img-product"
          />
        ) : (
          <div className="img-product placeholder-image" aria-hidden />
        )}
      </Link>
      <div className="card-product-info pt-3">
        <Link
          href={`/products/${product.slug}`}
          className="title link"
          title={product.nameTr}
        >
          {product.nameTr}
        </Link>
        <Price amount={{ amountMinor: product.defaultPriceMinor, currency: 'TRY' }} />
        {!product.inStock && (
          <span className="badge bg-secondary mt-2 d-inline-block">Stokta yok</span>
        )}
      </div>
    </article>
  );
}
