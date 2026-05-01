'use client';

import clsx from 'clsx';

import { useWishlist } from '../cart/WishlistContext';

export interface WishlistButtonProps {
  productId: string;
  className?: string;
}

/**
 * Heart toggle for a ProductCard. Mirrors vendor `productActionButtons/
 * WishlistButton.tsx` — `box-icon round wishlist` shell with `icon-heart`
 * (outline) flipping to `icon-heart-fill` once the product is on the
 * customer's wishlist.
 *
 * State is read from the shared WishlistProvider context so multiple
 * cards stay in sync without ad-hoc local state.
 */
export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      className={clsx('box-icon round wishlist hover-tooltip', active && 'active', className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void toggle(productId);
      }}
      aria-label={active ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      aria-pressed={active}
    >
      <i className={active ? 'icon icon-heart-fill' : 'icon icon-heart'} />
      <span className="tooltip">{active ? 'Favorilerden çıkar' : 'Favorilere ekle'}</span>
    </button>
  );
}
