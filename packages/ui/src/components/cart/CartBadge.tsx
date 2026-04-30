'use client';

import Link from 'next/link';

import { useCart } from './CartContext';

export interface CartBadgeProps {
  href?: string;
  ariaLabel?: string;
}

export function CartBadge({ href = '/cart', ariaLabel = 'Sepet' }: CartBadgeProps) {
  const { totalQuantity } = useCart();
  return (
    <Link href={href} className="nav-icon-item" aria-label={ariaLabel}>
      <i className="icon icon-bag" aria-hidden />
      <span className="count-box" aria-live="polite">
        {totalQuantity}
      </span>
    </Link>
  );
}
