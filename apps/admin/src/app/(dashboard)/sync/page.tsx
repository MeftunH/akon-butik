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

const formatDuration = (start: string, end: string | null): string => {
  if (!end) return '—';
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (ms < 1000) return `${ms.toString()} ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)} sn`;
  return `${(ms / 60_000).toFixed(1)} dk`;
};

export default async function SyncPage() {
  const log = await fetchAdmin<SyncLogEntry[]>('/admin/sync/log?limit=20');
  if (log === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  return (
    <div className="my-account-content">
      <h2 className="account-title type-semibold">DIA Senkron</h2>
      <p className="h6 text-main mb-4">
        Ürün, stok ve kategori senkronlarını manuel tetikleyin. İşler arka planda BullMQ
        worker&apos;ında çalışır; senkron süresince bu sayfayı yenilemek log&apos;u günceller.
      </p>

      <section className="mb-4">
        <SyncTriggers />
      </section>

      <section>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h3 className="account-title type-semibold mb-0 h5">Son 20 Senkron</h3>
          <span className="h6 text-main">{log.length} kayıt</span>
        </div>

        {log.length === 0 ? (
          <div className="dashboard-empty">
            <i className="icon icon-arrow-clockwise mb-3" aria-hidden />
            <h6 className="fw-semibold mb-1">Henüz senkron kaydı yok</h6>
            <p className="h6 text-main mb-0">
              Yukarıdaki kartlardan birini tetikleyerek ilk senkronu başlatın.
            </p>
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="table-my_order">
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
                {log.map((r) => (
                  <tr key={r.id} className="tb-order-item">
                    <td className="tb-order_code">
                      <span className="fw-semibold">{SYNC_LABELS[r.entity] ?? r.entity}</span>
                    </td>
                    <td>
                      <div className={`tb-order_status ${SYNC_TONE[r.status]}`}>
                        {SYNC_TEXT[r.status]}
                      </div>
                    </td>
                    <td className="h6 text-main">
                      {new Date(r.startedAt).toLocaleString('tr-TR')}
                    </td>
                    <td className="h6">{formatDuration(r.startedAt, r.finishedAt)}</td>
                    <td className="h6">
                      {r.error ? (
                        <span className="text-danger">{r.error.slice(0, 100)}</span>
                      ) : r.stats ? (
                        <span className="text-main">
                          {Object.entries(r.stats)
                            .slice(0, 4)
                            .map(([k, v]) => `${k}: ${String(v)}`)
                            .join(' · ')}
                        </span>
                      ) : (
                        <span className="text-main">—</span>
                      )}
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
