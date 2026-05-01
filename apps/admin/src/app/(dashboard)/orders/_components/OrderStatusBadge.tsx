import styles from './orders.module.scss';
import { isOrderStatus, STATUS_BADGE_TONE, STATUS_LABELS, type OrderStatus } from './status';

interface OrderStatusBadgeProps {
  status: OrderStatus | string;
  /** Optional override label (rare; default is the canonical Turkish label). */
  label?: string;
}

/**
 * Editorial status badge — outlined pill with leading dot in the tone
 * colour, tinted background. Replaces the vendor `tb-order_status`
 * pill on surfaces where rhythm matters (list rows, header strip).
 */
export function OrderStatusBadge({ status, label }: OrderStatusBadgeProps) {
  const known = isOrderStatus(status);
  const tone = known ? STATUS_BADGE_TONE[status] : 'cancelled';
  const text = label ?? (known ? STATUS_LABELS[status] : status);

  return (
    <span className={styles.badge} data-tone={tone}>
      {text}
    </span>
  );
}

interface DiaBadgeProps {
  diaCode: string | null;
}

export function DiaBadge({ diaCode }: DiaBadgeProps) {
  if (diaCode) {
    return (
      <span className={styles.badge} data-tone="dia-pushed" title={`DIA: ${diaCode}`}>
        DIA · {diaCode}
      </span>
    );
  }
  return (
    <span className={styles.badge} data-tone="dia-pending">
      DIA bekliyor
    </span>
  );
}

interface PaidBadgeProps {
  paidAt: string | null;
}

export function PaidBadge({ paidAt }: PaidBadgeProps) {
  return paidAt ? (
    <span className={styles.badge} data-tone="paid">
      Ödendi
    </span>
  ) : (
    <span className={styles.badge} data-tone="pending">
      Ödeme bekleniyor
    </span>
  );
}
