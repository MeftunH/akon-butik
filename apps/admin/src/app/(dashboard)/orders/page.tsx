import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../lib/admin-fetch';

interface AdminOrder {
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

interface OrderListResponse {
  items: AdminOrder[];
  total: number;
  page: number;
  pageSize: number;
}

interface PageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

export const metadata = { title: 'Siparişler' };

const STATUS_FILTERS = [
  'all',
  'pending',
  'paid',
  'fulfilling',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
] as const;

const STATUS_TONE: Record<string, string> = {
  pending: 'bg-warning-subtle text-warning',
  paid: 'bg-success-subtle text-success',
  fulfilling: 'bg-info-subtle text-info',
  shipped: 'bg-info-subtle text-info',
  delivered: 'bg-success-subtle text-success',
  cancelled: 'bg-secondary-subtle text-secondary',
  refunded: 'bg-secondary-subtle text-secondary',
};

export default async function OrdersPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);
  const statusParam =
    sp.status && STATUS_FILTERS.includes(sp.status as (typeof STATUS_FILTERS)[number])
      ? sp.status
      : 'all';
  const qs = new URLSearchParams({ page: page.toString(), pageSize: '25' });
  if (statusParam !== 'all') qs.set('status', statusParam);

  const resp = await fetchAdmin<OrderListResponse>(`/admin/orders?${qs.toString()}`);
  if (resp === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  const lastPage = Math.max(1, Math.ceil(resp.total / resp.pageSize));

  return (
    <article>
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
        <h1 className="h3 fw-bold mb-0">Siparişler</h1>
        <span className="text-muted small">{resp.total} kayıt</span>
      </div>

      <div className="d-flex gap-2 mb-3 flex-wrap">
        {STATUS_FILTERS.map((s) => {
          const href = s === 'all' ? '/orders' : `/orders?status=${s}`;
          const active = statusParam === s;
          return (
            <Link
              key={s}
              href={href}
              className={`btn btn-sm ${active ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              {s}
            </Link>
          );
        })}
      </div>

      <div className="table-responsive">
        <table className="table align-middle bg-white">
          <thead>
            <tr>
              <th>Sipariş</th>
              <th>Müşteri</th>
              <th>Ürün</th>
              <th>Tutar</th>
              <th>Durum</th>
              <th>DIA</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {resp.items.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  Bu filtre için sipariş yok.
                </td>
              </tr>
            )}
            {resp.items.map((o) => (
              <tr key={o.id}>
                <td>
                  <Link href={`/orders/${o.id}`} className="fw-semibold text-decoration-none">
                    {o.orderNumber}
                  </Link>
                </td>
                <td>
                  <div>{o.customerName}</div>
                  <div className="small text-muted">{o.customerEmail}</div>
                </td>
                <td>{o._count.items}</td>
                <td>
                  ₺{(o.totalMinor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </td>
                <td>
                  <span
                    className={`badge ${STATUS_TONE[o.status] ?? 'bg-secondary-subtle text-secondary'}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="small">
                  {o.diaSiparisKodu ? (
                    <code>{o.diaSiparisKodu}</code>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="small text-muted">
                  {new Date(o.createdAt).toLocaleString('tr-TR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lastPage > 1 && (
        <nav className="d-flex justify-content-between mt-3">
          <span className="text-muted small">
            Sayfa {page} / {lastPage}
          </span>
          <div className="d-flex gap-2">
            <Link
              href={
                page > 1
                  ? `/orders?${new URLSearchParams({
                      page: (page - 1).toString(),
                      ...(statusParam !== 'all' && { status: statusParam }),
                    }).toString()}`
                  : '/orders'
              }
              className={`btn btn-sm btn-outline-secondary${page === 1 ? ' disabled' : ''}`}
              aria-disabled={page === 1}
            >
              ← Önceki
            </Link>
            <Link
              href={
                page < lastPage
                  ? `/orders?${new URLSearchParams({
                      page: (page + 1).toString(),
                      ...(statusParam !== 'all' && { status: statusParam }),
                    }).toString()}`
                  : '/orders'
              }
              className={`btn btn-sm btn-outline-secondary${page === lastPage ? ' disabled' : ''}`}
              aria-disabled={page === lastPage}
            >
              Sonraki →
            </Link>
          </div>
        </nav>
      )}
    </article>
  );
}
