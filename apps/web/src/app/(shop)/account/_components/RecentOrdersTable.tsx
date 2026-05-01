import Link from 'next/link';

import type { CustomerOrderSummary } from '../../../../lib/account';

interface RecentOrdersTableProps {
  orders: readonly CustomerOrderSummary[];
  limit?: number;
}

const STATUS_COPY: Record<string, { label: string; tone: string }> = {
  pending: { label: 'Bekliyor', tone: 'warning' },
  paid: { label: 'Ödeme Alındı', tone: 'info' },
  fulfilling: { label: 'Hazırlanıyor', tone: 'primary' },
  shipped: { label: 'Kargoda', tone: 'primary' },
  delivered: { label: 'Teslim Edildi', tone: 'success' },
  cancelled: { label: 'İptal', tone: 'secondary' },
  refunded: { label: 'İade', tone: 'secondary' },
};

function formatTRY(minor: number): string {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(minor / 100);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Vendor `dashboard/Orders.tsx` recent-orders preview — `table-my_order
 * order_recent` markup with a `tb-order-item` per row. Used on the account
 * home (limit=5) to give the user a quick glance + "Tümünü Gör" link to
 * the full /account/orders listing.
 */
export function RecentOrdersTable({ orders, limit = 5 }: RecentOrdersTableProps) {
  const visible = orders.slice(0, limit);

  return (
    <section className="account-my_order">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h5 fw-bold mb-0">Son Siparişler</h2>
        <Link href="/account/orders" className="h6 link text-decoration-none">
          Tümünü Gör <i className="icon icon-arrow-right ms-1" />
        </Link>
      </div>

      {visible.length === 0 ? (
        <p className="text-main mb-0">Henüz bir siparişiniz yok.</p>
      ) : (
        <div className="table-responsive">
          <table className="table-my_order order_recent w-100 align-middle">
            <thead>
              <tr>
                <th className="tb-order_code">Sipariş No</th>
                <th>Tarih</th>
                <th className="tb-order_product">Ürün</th>
                <th className="tb-order_price text-end">Tutar</th>
                <th className="tb-order_status">Durum</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visible.map((order) => {
                const status = STATUS_COPY[order.status] ?? {
                  label: order.status,
                  tone: 'secondary',
                };
                return (
                  <tr key={order.id} className="tb-order-item">
                    <td className="tb-order_code fw-semibold">
                      <Link href={`/account/orders/${order.orderNumber}`} className="link">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="text-main-2">{formatDate(order.createdAt)}</td>
                    <td className="tb-order_product">{order.itemCount} ürün</td>
                    <td className="tb-order_price text-end fw-semibold">
                      {formatTRY(order.totalMinor)}
                    </td>
                    <td className="tb-order_status">
                      <span className={`badge bg-${status.tone}-subtle text-${status.tone}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="tb-order_action text-end">
                      <Link href={`/account/orders/${order.orderNumber}`} className="link h6">
                        Detay
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
