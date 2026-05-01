import { formatTl } from './format';
import styles from './orders.module.scss';

interface OrderListStatStripProps {
  todayCount: number;
  todayRevenueMinor: number;
  paidUnfulfilledCount: number;
  /** When stat window does not cover the full corpus, surface a hint. */
  windowHint?: string;
}

/**
 * Row of three operator-relevant counters above the orders table.
 * Read order: today's volume, today's revenue, paid-but-unfulfilled
 * (the "do something now" pile). Tones rise with urgency.
 */
export function OrderListStatStrip({
  todayCount,
  todayRevenueMinor,
  paidUnfulfilledCount,
  windowHint,
}: OrderListStatStripProps) {
  return (
    <div className={styles.statStrip} role="group" aria-label="Sipariş özeti">
      <div className={styles.statCell}>
        <p className={styles.statLabel}>Bugün</p>
        <p className={styles.statValue}>{todayCount.toString()}</p>
        <p className={styles.statHint}>{windowHint ?? 'son siparişler içinden'}</p>
      </div>
      <div className={styles.statCell} data-tone="accent">
        <p className={styles.statLabel}>Bugün ciro</p>
        <p className={styles.statValue}>{formatTl(todayRevenueMinor)}</p>
        <p className={styles.statHint}>tahsil edilen + bekleyen</p>
      </div>
      <div className={styles.statCell} data-tone={paidUnfulfilledCount > 0 ? 'warn' : undefined}>
        <p className={styles.statLabel}>Hazırlanmayı bekleyen</p>
        <p className={styles.statValue}>{paidUnfulfilledCount.toString()}</p>
        <p className={styles.statHint}>ödendi, kargoya hazır değil</p>
      </div>
    </div>
  );
}
