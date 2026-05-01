import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../lib/admin-fetch';

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
  total: number;
  items: AdminOrder[];
}

interface ProductListResponse {
  total: number;
  items: { status: 'visible' | 'hidden' | 'needs_review' }[];
}

interface SyncLogEntry {
  id: string;
  entity: string;
  status: 'running' | 'success' | 'failed';
  startedAt: string;
  finishedAt: string | null;
  error: string | null;
  stats: Record<string, unknown> | null;
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

const STATUS_CLASS: Record<string, string> = {
  pending: 'stt-pending',
  paid: 'stt-complete',
  fulfilling: 'stt-delivery',
  shipped: 'stt-delivery',
  delivered: 'stt-complete',
  cancelled: 'stt-cancel',
  refunded: 'stt-cancel',
};

const SYNC_LABELS: Record<string, string> = {
  products: 'Ürünler',
  stock: 'Stok',
  categories: 'Kategoriler',
};

const SYNC_TONE: Record<SyncLogEntry['status'], string> = {
  success: 'stt-complete',
  failed: 'stt-cancel',
  running: 'stt-pending',
};

const SYNC_TEXT: Record<SyncLogEntry['status'], string> = {
  success: 'Başarılı',
  failed: 'Hata',
  running: 'Çalışıyor',
};

const formatTl = (minor: number): string =>
  `₺${(minor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;

export default async function DashboardPage() {
  const [productsResp, ordersResp, log] = await Promise.all([
    fetchAdmin<ProductListResponse>('/admin/products?pageSize=100'),
    fetchAdmin<OrderListResponse>('/admin/orders?pageSize=100'),
    fetchAdmin<SyncLogEntry[]>('/admin/sync/log?limit=5'),
  ]);
  if (
    productsResp === ADMIN_NOT_AUTHENTICATED ||
    ordersResp === ADMIN_NOT_AUTHENTICATED ||
    log === ADMIN_NOT_AUTHENTICATED
  ) {
    redirect('/login');
  }

  const pendingCount = ordersResp.items.filter((o) => o.status === 'pending').length;
  const fulfillingCount = ordersResp.items.filter(
    (o) => o.status === 'paid' || o.status === 'fulfilling',
  ).length;
  const totalOrders = ordersResp.total;

  const recentOrders = ordersResp.items.slice(0, 5);

  const lastSync = log[0];

  const stats = [
    {
      icon: 'icon-package-thin',
      label: 'Bekleyen Siparişler',
      value: pendingCount.toString(),
      href: '/orders?status=pending',
    },
    {
      icon: 'icon-check-fat',
      label: 'Hazırlanan Siparişler',
      value: fulfillingCount.toString(),
      href: '/orders?status=paid',
    },
    {
      icon: 'icon-box-arrow-up',
      label: 'Toplam Sipariş',
      value: totalOrders.toString(),
      href: '/orders',
    },
  ] as const;

  return (
    <div className="my-account-content">
      <h2 className="account-title type-semibold">Panel</h2>

      <section className="acount-order_stats">
        <div className="row g-3 g-xl-4">
          {stats.map((stat) => (
            <div key={stat.label} className="col-sm-6 col-xl-4">
              <Link href={stat.href} className="order-box text-decoration-none h-100 d-flex">
                <div className="order_icon">
                  <i className={`icon ${stat.icon}`} />
                </div>
                <div className="order_info">
                  <p className="info_label h6">{stat.label}</p>
                  <h2 className="info_count type-semibold">{stat.value}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-sync-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h3 className="account-title type-semibold mb-0 h5">Son DIA Senkron</h3>
          <Link href="/sync" className="link h6 fw-semibold">
            Tümünü Gör
            <i className="icon icon-arrow-right ms-2" />
          </Link>
        </div>
        {lastSync ? (
          <div className="dashboard-sync-row">
            <div className="dashboard-sync-row_meta">
              <p className="h6 mb-1">
                <span className="fw-semibold">
                  {SYNC_LABELS[lastSync.entity] ?? lastSync.entity}
                </span>
              </p>
              <p className="h6 text-main mb-0">
                {new Date(lastSync.startedAt).toLocaleString('tr-TR')}
              </p>
            </div>
            <div className={`tb-order_status ${SYNC_TONE[lastSync.status]}`}>
              {SYNC_TEXT[lastSync.status]}
            </div>
            <div className="dashboard-sync-row_detail h6 text-main">
              {lastSync.error
                ? lastSync.error.slice(0, 80)
                : lastSync.stats
                  ? Object.entries(lastSync.stats)
                      .slice(0, 3)
                      .map(([k, v]) => `${k}: ${String(v)}`)
                      .join(' · ')
                  : '—'}
            </div>
          </div>
        ) : (
          <p className="h6 text-main mb-0">Henüz bir senkron çalışmamış.</p>
        )}
      </section>

      <section className="account-my_order">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h3 className="account-title type-semibold mb-0 h5">Son Siparişler</h3>
          <Link href="/orders" className="link h6 fw-semibold">
            Tümünü Gör
            <i className="icon icon-arrow-right ms-2" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="dashboard-empty">
            <i className="icon icon-package-thin mb-3" aria-hidden />
            <h6 className="fw-semibold mb-1">Henüz sipariş yok</h6>
            <p className="h6 text-main mb-0">İlk müşteri siparişi bu listede görünecek.</p>
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="table-my_order order_recent">
              <thead>
                <tr>
                  <th>Sipariş</th>
                  <th>Müşteri</th>
                  <th>Tutar</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="tb-order-item">
                    <td className="tb-order_code">
                      <Link
                        href={`/orders/${order.id}`}
                        className="link fw-semibold text-decoration-none"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td>
                      <div className="infor-prd">
                        <h6 className="prd_name mb-1">{order.customerName}</h6>
                        <p className="prd_select text-small mb-0">
                          <span>{order.customerEmail}</span>
                          <span>{order._count.items} ürün</span>
                        </p>
                      </div>
                    </td>
                    <td className="tb-order_price">{formatTl(order.totalMinor)}</td>
                    <td>
                      <div
                        className={`tb-order_status ${STATUS_CLASS[order.status] ?? 'stt-pending'}`}
                      >
                        {STATUS_LABELS[order.status] ?? order.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
