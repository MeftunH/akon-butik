import { formatTl } from './format';
import styles from './orders.module.scss';

interface OrderTotalsProps {
  subtotalMinor: number;
  shippingMinor: number;
  taxMinor?: number | null;
  totalMinor: number;
}

/**
 * Totals ledger rendered to the right of the items table. Tabular
 * numerals so currencies stack visually. "Ücretsiz" italic green when
 * shipping is zero — the only place we let a celebratory tone in.
 */
export function OrderTotals({
  subtotalMinor,
  shippingMinor,
  taxMinor,
  totalMinor,
}: OrderTotalsProps) {
  return (
    <dl className={styles.totalsStack}>
      <div>
        <dt className={styles.label}>Ara toplam</dt>
        <dd className={styles.value}>{formatTl(subtotalMinor)}</dd>
      </div>
      <div>
        <dt className={styles.label}>Kargo</dt>
        <dd className={styles.value}>
          {shippingMinor === 0 ? (
            <span className={styles.free}>Ücretsiz</span>
          ) : (
            formatTl(shippingMinor)
          )}
        </dd>
      </div>
      {typeof taxMinor === 'number' && taxMinor > 0 && (
        <div>
          <dt className={styles.label}>KDV</dt>
          <dd className={styles.value}>{formatTl(taxMinor)}</dd>
        </div>
      )}
      <div className={styles.grand}>
        <dt className={styles.label}>Genel toplam</dt>
        <dd className={styles.value}>{formatTl(totalMinor)}</dd>
      </div>
    </dl>
  );
}
