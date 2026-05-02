'use client';

import clsx from 'clsx';

import { useWishlist } from '../cart/WishlistContext';

export interface WishlistButtonProps {
  productId: string;
  className?: string;
}

/**
 * Heart toggle for a ProductCard. Mirrors vendor `productActionButtons/
 * WishlistButton.tsx` shell (`box-icon round wishlist hover-tooltip`) but
 * routes the toggle through our `WishlistProvider` so multiple cards stay
 * in sync without ad-hoc local state.
 *
 * Layout notes
 * ------------
 * The vendor `card-product_wrapper` clips overflow (used for the hover
 * image-zoom mask), so the default top-anchored tooltip (`bottom: calc(
 * 100% + 10px)`) gets cut off when the heart sits at `top: 8px`. We pin
 * the modifier to `tooltip-left` so the bubble sits to the LEFT of the
 * heart, well within the card bounds, and override the bubble surface to
 * the brand-tinted neutral palette (no #000 background, no white text).
 *
 * Icon state
 * ----------
 * The icomoon font only ships `icon-heart` (outline). We keep the same
 * class on both states and apply a `wishlist--active` color treatment via
 * inline style so the filled-in look comes from CSS color rather than a
 * missing glyph variant. The `aria-pressed` attribute carries the real
 * semantic state.
 */
export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      // tooltip-left keeps the bubble inside the card_wrapper (overflow:hidden).
      className={clsx(
        'box-icon round wishlist hover-tooltip tooltip-left',
        active && 'active',
        className,
      )}
      onClick={(e) => {
        // Heart sits inside a Link; without these the click navigates instead
        // of toggling, which is the operator-reported bug.
        e.preventDefault();
        e.stopPropagation();
        void toggle(productId);
      }}
      aria-label={active ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      aria-pressed={active}
      title={active ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      style={
        active
          ? {
              // Brand-tinted heart for the "in wishlist" state. Colour comes
              // from a CSS var with a hard-coded fallback so the cue still
              // reads even when the storefront token sheet hasn't loaded.
              color: 'var(--primary, #c8102e)',
            }
          : undefined
      }
    >
      <i className="icon icon-heart" aria-hidden />
      <span className="tooltip">{active ? 'Favorilerden çıkar' : 'Favorilere ekle'}</span>
    </button>
  );
}
