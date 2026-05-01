import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../lib/admin-fetch';

import {
  SYNC_ENTITY_META,
  type SyncEntity,
  type SyncEntitySnapshot,
  type SyncLogEntry,
} from './_components/sync-page.types';
import {
  findLastRun,
  formatAbsoluteTr,
  formatRelativeTr,
  isEntityRunning,
} from './_components/sync-page.utils';
import styles from './_components/sync.module.scss';
import { SyncEmptyState } from './_components/SyncEmptyState';
import { SyncLogTable } from './_components/SyncLogTable';
import { SyncPagePoller } from './_components/SyncPagePoller';
import { SyncTriggerBoard } from './_components/SyncTriggerBoard';

export const metadata = { title: 'DIA Senkron' };

const LOG_LIMIT = 50;

const SYNC_KEYS: readonly SyncEntity[] = ['products', 'stock', 'categories'];

/**
 * DIA sync admin page. Surfaces three editorial trigger cards, a fleet
 * status rail, and the dense log table. Re-renders every 5 s (via
 * SyncPagePoller calling router.refresh) while at least one entity is
 * running; falls idle once all rows settle.
 */
export default async function SyncPage(): Promise<React.ReactElement> {
  // Fetch the log slice. Only one sub-fetch today, but the structure is
  // ready for a parallel "is running now" probe once the API ships one.
  const log = await fetchAdmin<SyncLogEntry[]>(`/admin/sync/log?limit=${LOG_LIMIT.toString()}`);
  if (log === ADMIN_NOT_AUTHENTICATED) {
    // Single quiet console line on auth fallback so the parent dashboard
    // tail can grep for it; the redirect itself terminates this render.
    console.warn('[admin/sync] auth required, redirecting to /login');
    redirect('/login');
  }

  const snapshots: SyncEntitySnapshot[] = SYNC_KEYS.map((key) => ({
    entity: key,
    lastRun: findLastRun(log, key),
    isRunning: isEntityRunning(log, key),
  }));

  const isAnyRunning = snapshots.some((s) => s.isRunning);
  const hasLogRows = log.length > 0;
  const newestRun = log[0] ?? null;

  return (
    <div className="my-account-content">
      <SyncPagePoller isAnyRunning={isAnyRunning} />

      <header className={styles.hero}>
        <div>
          <p className={styles.heroEyebrow}>DIA Bağlantısı</p>
          <h1 className={styles.heroTitle}>Senkron Köprüsü</h1>
          <p className={styles.heroLead}>
            Akon Butik’in fiziksel envanteri ile çevrimiçi katalog DIA üzerinden buluşur. Aşağıdaki
            üç giriş noktasından manuel senkron tetikleyin; BullMQ kuyruğu eşzamanlı tek çalışmayı
            zaten garanti eder.
          </p>
        </div>
        <FleetStatusRail snapshots={snapshots} isAnyRunning={isAnyRunning} newestRun={newestRun} />
      </header>

      <section aria-labelledby="sync-board-heading">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionEyebrow}>Tetikleyici Kartlar</p>
            <h2 id="sync-board-heading" className={styles.sectionTitle}>
              Kuyruğa al
            </h2>
          </div>
          <span className={styles.sectionMeta}>
            <strong>{SYNC_ENTITY_META.length.toString()}</strong> giriş noktası
          </span>
        </div>
        <SyncTriggerBoard snapshots={snapshots} />
      </section>

      <section aria-labelledby="sync-log-heading">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionEyebrow}>Çalışma Günlüğü</p>
            <h2 id="sync-log-heading" className={styles.sectionTitle}>
              Son senkron kayıtları
            </h2>
          </div>
          <span className={styles.sectionMeta}>
            <strong>{log.length.toString()}</strong> kayıt
            {log.length === LOG_LIMIT ? ' (üst sınır)' : ''}
          </span>
        </div>

        {hasLogRows ? <SyncLogTable rows={log} /> : <SyncEmptyState />}
      </section>
    </div>
  );
}

interface FleetStatusRailProps {
  snapshots: readonly SyncEntitySnapshot[];
  isAnyRunning: boolean;
  newestRun: SyncLogEntry | null;
}

/**
 * Right-rail status tape: live state, last activity, scheduled cadence
 * notes. SSR-only — gives the page an at-a-glance "is the bridge alive"
 * answer without dragging the operator into the table.
 */
function FleetStatusRail({
  snapshots,
  isAnyRunning,
  newestRun,
}: FleetStatusRailProps): React.ReactElement {
  const successInLast24h = snapshots.reduce((acc, s) => {
    const last = s.lastRun;
    if (!last || last.status !== 'success') return acc;
    const ageMs = Date.now() - new Date(last.startedAt).getTime();
    return ageMs < 24 * 60 * 60 * 1000 ? acc + 1 : acc;
  }, 0);

  const failedSnapshots = snapshots.filter((s) => s.lastRun?.status === 'failed');

  return (
    <div className={styles.heroFleet} aria-live="polite">
      <div className={styles.heroFleetRow}>
        <span className={styles.heroFleetLabel}>
          {isAnyRunning ? <span className={styles.pulse} aria-hidden /> : null}
          Kuyruk durumu
        </span>
        <span className={styles.heroFleetValue}>
          {isAnyRunning ? 'Bir senkron çalışıyor' : 'Boşta'}
        </span>
      </div>
      <div className={styles.heroFleetRow}>
        <span className={styles.heroFleetLabel}>Son aktivite</span>
        <span
          className={styles.heroFleetValue}
          title={newestRun ? formatAbsoluteTr(newestRun.startedAt) : undefined}
        >
          {newestRun ? formatRelativeTr(newestRun.startedAt, Date.now()) : 'Henüz yok'}
        </span>
      </div>
      <div className={styles.heroFleetRow}>
        <span className={styles.heroFleetLabel}>Son 24 sa başarılı</span>
        <span className={styles.heroFleetValue}>
          {successInLast24h.toString()} / {snapshots.length.toString()}
        </span>
      </div>
      {failedSnapshots.length > 0 ? (
        <div className={styles.heroFleetRow}>
          <span className={styles.heroFleetLabel}>Hatalı</span>
          <span className={styles.heroFleetValue} style={{ color: 'var(--primary, #c8102e)' }}>
            {failedSnapshots.map((s) => s.entity).join(', ')}
          </span>
        </div>
      ) : null}
    </div>
  );
}
