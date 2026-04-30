import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../lib/admin-fetch';

import { SyncTriggers } from './SyncTriggers';

interface SyncLogEntry {
  id: string;
  entity: string;
  status: 'running' | 'success' | 'failed';
  startedAt: string;
  finishedAt: string | null;
  error: string | null;
  stats: Record<string, unknown> | null;
}

export const metadata = { title: 'DIA Senkron' };

export default async function SyncPage() {
  const log = await fetchAdmin<SyncLogEntry[]>('/admin/sync/log?limit=20');
  if (log === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  return (
    <article>
      <h1 className="h3 fw-bold mb-4">DIA Senkron</h1>
      <p className="text-muted mb-4">
        Ürün, stok ve kategori senkronlarını manuel tetikleyin. İşler arka planda BullMQ
        worker&apos;ında çalışır; senkron süresince bu sayfayı yenilemek log&apos;u günceller.
      </p>
      <SyncTriggers />
      <hr className="my-4" />
      <h2 className="h6 fw-bold mb-3">Son 20 Senkron</h2>
      {log.length === 0 ? (
        <p className="text-muted">Henüz senkron kaydı yok.</p>
      ) : (
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
              {log.map((r) => {
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
                        <span className="text-danger">{r.error.slice(0, 100)}</span>
                      ) : (
                        <span className="text-muted">
                          {r.stats ? JSON.stringify(r.stats) : '—'}
                        </span>
                      )}
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
