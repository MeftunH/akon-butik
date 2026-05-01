import { Pagination } from '@akonbutik/ui';
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
  { key: 'all', label: 'Tümü' },
  { key: 'pending', label: 'Bekleyen' },
  { key: 'paid', label: 'Ödendi' },
  { key: 'fulfilling', label: 'Hazırlanıyor' },
  { key: 'shipped', label: 'Kargoda' },
  { key: 'delivered', label: 'Teslim Edildi' },
  { key: 'cancelled', label: 'İptal' },
  { key: 'refunded', label: 'İade' },
] as const;

const STATUS_LABELS: Record<string, string> = Object.fromEntries(
  STATUS_FILTERS.map((f) => [f.key, f.label]),
);

const STATUS_CLASS: Record<string, string> = {
  pending: 'stt-pending',
  paid: 'stt-complete',
  fulfilling: 'stt-delivery',
  shipped: 'stt-delivery',
  delivered: 'stt-complete',
  cancelled: 'stt-cancel',
  refunded: 'stt-cancel',
};

const formatTl = (minor: number): string =>
  `₺${(minor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;

export default async function OrdersPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);
  const knownStatus = STATUS_FILTERS.some((f) => f.key === sp.status);
  const statusParam = knownStatus ? (sp.status ?? 'all') : 'all';

  const qs = new URLSearchParams({ page: page.toString(), pageSize: '25' });
  if (statusParam !== 'all') qs.set('status', statusParam);

  const resp = await fetchAdmin<OrderListResponse>(`/admin/orders?${qs.toString()}`);
  if (resp === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  const lastPage = Math.max(1, Math.ceil(resp.total / resp.pageSize));

  const buildHref = (p: number): string => {
    const next = new URLSearchParams({ page: p.toString() });
    if (statusParam !== 'all') next.set('status', statusParam);
    return `/orders?${next.toString()}`;
  };

  return (
    <div className="my-account-content">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h2 className="account-title type-semibold mb-0">Siparişler</h2>
        <span className="h6 text-main">{resp.total} kayıt</span>
      </div>

      <div className="account-order_tab mb-4">
        <ul className="tab-order_detail nav nav-pills flex-wrap gap-2 list-unstyled mb-0">
          {STATUS_FILTERS.map((f) => {
            const href = f.key === 'all' ? '/orders' : `/orders?status=${f.key}`;
            const active = statusParam === f.key;
            return (
              <li key={f.key} className="nav-tab-item">
                <Link href={href} className={`tf-btn-line tf-btn-tab${active ? ' active' : ''}`}>
                  <span className="h6">{f.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {resp.items.length === 0 ? (
        <div className="dashboard-empty">
          <i className="icon icon-package-thin mb-3" aria-hidden />
          <h6 className="fw-semibold mb-1">Bu filtre için sipariş yok</h6>
          <p className="h6 text-main mb-0">
            Farklı bir durum seçerek diğer siparişleri görüntüleyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="table-my_order">
            <thead>
              <tr>
                <th>Sipariş</th>
                <th>Müşteri</th>
                <th>Ürün</th>
                <th>Tutar</th>
                <th>Durum</th>
                <th>DIA</th>
                <th>Tarih</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {resp.items.map((o) => (
                <tr key={o.id} className="tb-order-item">
                  <td className="tb-order_code">
                    <Link
                      href={`/orders/${o.id}`}
                      className="link fw-semibold text-decoration-none"
                    >
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td>
                    <div className="infor-prd">
                      <h6 className="prd_name mb-1">{o.customerName}</h6>
                      <p className="prd_select text-small mb-0">
                        <span>{o.customerEmail}</span>
                      </p>
                    </div>
                  </td>
                  <td>
                    <span className="h6">{o._count.items} ürün</span>
                  </td>
                  <td className="tb-order_price">{formatTl(o.totalMinor)}</td>
                  <td>
                    <div className={`tb-order_status ${STATUS_CLASS[o.status] ?? 'stt-pending'}`}>
                      {STATUS_LABELS[o.status] ?? o.status}
                    </div>
                  </td>
                  <td>
                    {o.diaSiparisKodu ? (
                      <code className="h6">{o.diaSiparisKodu}</code>
                    ) : (
                      <span className="h6 text-main">—</span>
                    )}
                  </td>
                  <td className="h6 text-main">
                    {new Date(o.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="tb-order_action">
                    <Link href={`/orders/${o.id}`} className="link fw-semibold">
                      Detay
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lastPage > 1 && (
        <div className="wd-full">
          <Pagination page={page} lastPage={lastPage} buildHref={buildHref} />
        </div>
      )}
    </div>
  );
}
