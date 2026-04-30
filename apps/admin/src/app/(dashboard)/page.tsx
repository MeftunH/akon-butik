import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../lib/admin-fetch';

interface ProductListResponse {
  total: number;
  items: { status: 'visible' | 'hidden' | 'needs_review' }[];
}

interface OrderListResponse {
  total: number;
  items: { status: string; totalMinor: number }[];
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

export default async function DashboardPage() {
  const [productsResp, ordersResp, log] = await Promise.all([
    fetchAdmin<ProductListResponse>('/admin/products?pageSize=50'),
    fetchAdmin<OrderListResponse>('/admin/orders?pageSize=50'),
    fetchAdmin<SyncLogEntry[]>('/admin/sync/log?limit=5'),
  ]);
  if (
    productsResp === ADMIN_NOT_AUTHENTICATED ||
    ordersResp === ADMIN_NOT_AUTHENTICATED ||
    log === ADMIN_NOT_AUTHENTICATED
  ) {
    redirect('/login');
  }

  const visible = productsResp.items.filter((p) => p.status === 'visible').length;
  const needsReview = productsResp.items.filter((p) => p.status === 'needs_review').length;
  const totalRevenueMinor = ordersResp.items
    .filter((o) => o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered')
    .reduce((acc, o) => acc + o.totalMinor, 0);

  return (
    <article>
      <h1 className="h3 fw-bold mb-4">Dashboard</h1>
      <div className="row g-3 mb-4">
        <Stat
          label="Toplam Ürün"
          value={productsResp.total.toString()}
          sub={`${visible.toString()} görünür · ${needsReview.toString()} inceleme`}
        />
        <Stat label="Toplam Sipariş" value={ordersResp.total.toString()} />
        <Stat
          label="Son 50 Sipariş Cirosu"
          value={`₺${(totalRevenueMinor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`}
          sub="paid + shipped + delivered"
        />
      </div>

      <section>
        <h2 className="h6 fw-bold mb-3">Son DIA Senkronları</h2>
        <SyncLogTable rows={log} />
      </section>
    </article>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="col-md-4">
      <div className="border rounded p-3 bg-white">
        <div className="text-muted small">{label}</div>
        <div className="h3 fw-bold mb-0 mt-1">{value}</div>
        {sub && <div className="text-muted small mt-1">{sub}</div>}
      </div>
    </div>
  );
}

function SyncLogTable({ rows }: { rows: SyncLogEntry[] }) {
  if (rows.length === 0) {
    return <p className="text-muted">Henüz bir senkron çalışmamış.</p>;
  }
  return (
    <div className="table-responsive">
      <table className="table align-middle bg-white">
        <thead>
          <tr>
            <th>Tür</th>
            <th>Durum</th>
            <th>Başladı</th>
            <th>Süre</th>
            <th>Detay</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const tone =
              r.status === 'success'
                ? 'bg-success-subtle text-success'
                : r.status === 'failed'
                  ? 'bg-danger-subtle text-danger'
                  : 'bg-warning-subtle text-warning';
            const duration = r.finishedAt
              ? `${(new Date(r.finishedAt).getTime() - new Date(r.startedAt).getTime()).toString()}ms`
              : '—';
            return (
              <tr key={r.id}>
                <td>{r.entity}</td>
                <td>
                  <span className={`badge ${tone}`}>{r.status}</span>
                </td>
                <td className="small text-muted">
                  {new Date(r.startedAt).toLocaleString('tr-TR')}
                </td>
                <td className="small text-muted">{duration}</td>
                <td className="small">
                  {r.error ? (
                    <span className="text-danger">{r.error.slice(0, 80)}</span>
                  ) : (
                    <span className="text-muted">{r.stats ? JSON.stringify(r.stats) : '—'}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
