import type { ProductSummary } from '@akonbutik/types';
import clsx from 'clsx';
import Link from 'next/link';

import { Price } from '../Price';

export interface ProductCardProps {
  product: ProductSummary;
  className?: string;
}

/**
 * Storefront product card. Mirrors vendor `card-product` →
 * `card-product_wrapper` → `card-product_info` structure so the Ocaka
 * SCSS landing on the page is the one the demo ships with.
 *
 * Image fallback: until admin photography lands (the Phase 5b upload is
 * wired but the team hasn't shot product photos yet), use vendor demo
 * fashion stills so the grid renders something visual. The fallback is
 * deterministic by product slug so the same product always shows the
 * same photo across page loads.
 */
const FALLBACK_IMAGES = [
  '/images/products/fashion/product-1.jpg',
  '/images/products/fashion/product-2.jpg',
  '/images/products/fashion/product-3.jpg',
  '/images/products/fashion/product-4.jpg',
  '/images/products/fashion/product-5.jpg',
  '/images/products/fashion/product-6.jpg',
  '/images/products/fashion/product-7.jpg',
  '/images/products/fashion/product-8.jpg',
  '/images/products/fashion/product-9.jpg',
  '/images/products/fashion/product-10.jpg',
  '/images/products/fashion/product-11.jpg',
] as const;

const FALLBACK_DEFAULT = '/images/products/fashion/product-1.jpg';

function pickImage(seed: string, salt: number): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i) * salt) >>> 0;
  }
  // Length is a hard-coded constant > 0, but strict noUncheckedIndexedAccess
  // still requires a fallback for the lookup result.
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length] ?? FALLBACK_DEFAULT;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const primary = product.primaryImageUrl ?? pickImage(product.slug, 1);
  const hover = product.primaryImageUrl ?? pickImage(product.slug, 7);
  const sizes = product.availableSizes ?? [];

  return (
    <div className={clsx('card-product', sizes.length > 0 && 'has-size', className)}>
      <div className="card-product_wrapper">
        <Link href={href} className="product-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lazyload img-product"
            src={primary}
            alt={product.nameTr}
            width={1044}
            height={1392}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lazyload img-hover"
            src={hover}
            alt={product.nameTr}
            width={1044}
            height={1392}
          />
        </Link>

        {sizes.length > 0 && (
          <div className="variant-box">
            <ul className="product-size_list">
              {sizes.map((s) => (
                <li key={s} className="size-item h6">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!product.inStock && (
          <ul className="product-badge_list">
            <li className="product-badge_item h6 sold-out">Stokta yok</li>
          </ul>
        )}
      </div>

      <div className="card-product_info">
        <Link href={href} className="name-product h4 link" title={product.nameTr}>
          {product.nameTr}
        </Link>
        <div className="price-wrap mt-2">
          <Price
            amount={{ amountMinor: product.defaultPriceMinor, currency: 'TRY' }}
            className="price-new h6"
          />
        </div>
        {product.brand && <div className="text-muted small mt-1">{product.brand.name}</div>}
      </div>
    </div>
  );
}
