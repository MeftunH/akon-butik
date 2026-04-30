import { Price } from '@akonbutik/ui';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import {
  fetchAccount,
  NOT_AUTHENTICATED,
  type CustomerOrderSummary,
} from '../../../../lib/account';

const STATUS_LABELS: Record<string, { label: string; tone: string }> = {
  pending: { label: 'Bekliyor', tone: 'bg-warning-subtle text-warning' },
  paid: { label: 'Ödendi', tone: 'bg-success-subtle text-success' },
  shipped: { label: 'Kargoda', tone: 'bg-info-subtle text-info' },
  delivered: { label: 'Teslim Edildi', tone: 'bg-success-subtle text-success' },
  cancelled: { label: 'İptal', tone: 'bg-secondary-subtle text-secondary' },
  failed: { label: 'Başarısız', tone: 'bg-danger-subtle text-danger' },
};

function formatStatus(status: string): { label: string; tone: string } {
  return STATUS_LABELS[status] ?? { label: status, tone: 'bg-secondary-subtle text-secondary' };
}

export default async function OrdersPage() {
  const orders = await fetchAccount<CustomerOrderSummary[]>('/customers/me/orders');
  if (orders === NOT_AUTHENTICATED) redirect('/login?next=/account/orders');

  return (
    <article>
      <h1 className="h3 fw-bold mb-4">Siparişlerim</h1>
      {orders.length === 0 ? (
        <div className="border rounded p-4 text-center">
          <p className="text-muted mb-3">Henüz bir sipariş vermemişsiniz.</p>
          <Link href="/shop" className="btn btn-primary">
            Mağazaya Git
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Sipariş No</th>
                <th scope="col">Tarih</th>
                <th scope="col">Ürün</th>
                <th scope="col">Tutar</th>
                <th scope="col">Durum</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const { label, tone } = formatStatus(o.status);
                const date = new Date(o.createdAt).toLocaleDateString('tr-TR');
                return (
                  <tr key={o.id}>
                    <td>
                      <Link
                        href={`/account/orders/${o.orderNumber}`}
                        className="text-decoration-none"
                      >
                        {o.orderNumber}
                      </Link>
                    </td>
                    <td>{date}</td>
                    <td>{o.itemCount}</td>
                    <td>
                      <Price amount={{ amountMinor: o.totalMinor, currency: 'TRY' }} />
                    </td>
                    <td>
                      <span className={`badge ${tone}`}>{label}</span>
                    </td>
                    <td className="text-end">
                      <Link
                        href={`/account/orders/${o.orderNumber}`}
                        className="btn btn-sm btn-outline-primary"
                      >
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
    </article>
  );
}
