import { formatTRY, type Money } from '@akonbutik/utils';
import clsx from 'clsx';

export interface PriceProps {
  amount: Money | number;
  oldAmount?: Money | number | undefined;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Renders a localized TRY price with optional crossed-out old price.
 * Use this everywhere a price is rendered — never inline `${x.toFixed(2)}`.
 */
export function Price({ amount, oldAmount, className, size = 'md' }: PriceProps) {
  return (
    <span
      className={clsx(
        'price',
        {
          'price--sm': size === 'sm',
          'price--lg': size === 'lg',
        },
        className,
      )}
    >
      {oldAmount !== undefined && (
        <s className="price__old text-muted me-2">{formatTRY(oldAmount)}</s>
      )}
      <span className="price__current">{formatTRY(amount)}</span>
    </span>
  );
}
