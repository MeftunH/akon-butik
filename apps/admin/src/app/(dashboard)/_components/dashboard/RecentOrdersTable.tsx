import Link from 'next/link';

import styles from './dashboard.module.scss';
import { formatNumber, formatRelative, formatTl } from './format';

export interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  totalMinor: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  diaSiparisKodu: string | null;
  createdAt: string;
  paidAt: string | null;
  _count: { items: number };
}

interface RecentOrdersTableProps {
  orders: readonly RecentOrder[];
  now?: Date;
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Bekliyor',
  paid: 'Ödendi',
  fulfilling: 'Hazırlanıyor',
  shipped: 'Kargoda',
  delivered: 'Teslim Edildi',
  cancelled: 'İptal',
  refunded: 'İade',
};

function statusToneClass(status: string): string {
  switch (status) {
    case 'paid':
    case 'delivered': {
      return styles.orderStatusComplete ?? '';
    }
    case 'pending': {
      return styles.orderStatusPending ?? '';
    }
    case 'fulfilling':
    case 'shipped': {
      return styles.orderStatusDelivery ?? '';
    }
    case 'cancelled':
    case 'refunded': {
      return styles.orderStatusCancel ?? '';
    }
    default: {
      return styles.orderStatusMuted ?? '';
    }
  }
}

/**
 * Recent orders table. Refinements over the previous version:
 *   - "Açıldı" relative-time column ("2 saat önce") for at-a-glance freshness
 *   - dense customer cell: name + email row + items chip on a single line
 *   - whole-row hover affordance: subtle bg shift + slide-in arrow on order code
 *   - tabular-num totals and order numbers; small-caps status text
 */
export function RecentOrdersTable({
  orders,
  now = new Date(),
}: RecentOrdersTableProps): React.JSX.Element {
  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyEyebrow}>Henüz sipariş yok</p>
        <p className={styles.emptyTitle}>Vitrin sessiz, ama bu sürmeyecek.</p>
        <p className={styles.emptyBody}>
          İlk müşteri siparişi açıldığında, kim aldı ve ne kadar tuttu, bu listede ilk siz
          göreceksiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th scope="col">Sipariş</th>
            <th scope="col">Müşteri</th>
            <th scope="col">Açıldı</th>
            <th scope="col">Tutar</th>
            <th scope="col">Durum</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const statusLabel = STATUS_LABELS[order.status] ?? order.status;
            const itemsLabel = `${formatNumber(order._count.items)} ürün`;
            return (
              <tr key={order.id}>
                <td>
                  <Link href={`/orders/${order.id}`} className={styles.orderCode}>
                    {order.orderNumber}
                    <i className="icon icon-arrow-right" aria-hidden />
                  </Link>
                  {order.diaSiparisKodu && (
                    <span className={styles.orderCodeMeta}>DIA · {order.diaSiparisKodu}</span>
                  )}
                </td>
                <td>
                  <div className={styles.orderCustomer}>
                    <span className={styles.orderCustomerName}>{order.customerName}</span>
                    <span className={styles.orderCustomerSub}>
                      <span>{order.customerEmail}</span>
                      <span className={styles.orderItemsChip}>{itemsLabel}</span>
                    </span>
                  </div>
                </td>
                <td>
                  <time className={styles.orderRelTime} dateTime={order.createdAt}>
                    {formatRelative(order.createdAt, now)}
                  </time>
                </td>
                <td className={styles.orderTotal}>{formatTl(order.totalMinor)}</td>
                <td>
                  <span className={`${styles.orderStatus} ${statusToneClass(order.status)}`.trim()}>
                    {statusLabel}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
