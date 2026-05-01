import Link from 'next/link';

import styles from './dashboard.module.scss';
import { formatDurationMs, formatNumber, formatRelative } from './format';

export interface SyncLogEntry {
  id: string;
  entity: string;
  status: 'running' | 'success' | 'failed';
  startedAt: string;
  finishedAt: string | null;
  error: string | null;
  stats: Record<string, unknown> | null;
}

interface LastSyncCardProps {
  entry: SyncLogEntry | null;
  now?: Date;
}

const ENTITY_LABEL: Record<string, string> = {
  products: 'Ürünler',
  stock: 'Stok',
  categories: 'Kategoriler',
};

const ENTITY_ICON: Record<string, string> = {
  products: 'icon-shirt',
  stock: 'icon-package-thin',
  categories: 'icon-grid-3',
};

const TONE_LABEL: Record<SyncLogEntry['status'], string> = {
  success: 'Başarılı',
  failed: 'Hata',
  running: 'Çalışıyor',
};

const TONE_CLASS: Record<SyncLogEntry['status'], string> = {
  success: styles.syncToneSuccess ?? '',
  failed: styles.syncToneFailure ?? '',
  running: styles.syncToneRunning ?? '',
};

/** Read a numeric stat from the JSON column without trusting its type. */
function readStat(stats: Record<string, unknown> | null, key: string): number | null {
  if (!stats) return null;
  const v = stats[key];
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

/**
 * Last DIA sync card. Replaces a single status pill plus 80-char error
 * preview with a structured strip: entity + relative-start, semantic tone,
 * inserted/updated/unmatched counts in tabular numerals, duration in mono.
 * Failure messages get their own quiet rose band underneath with a link
 * to the full log.
 */
export function LastSyncCard({ entry, now = new Date() }: LastSyncCardProps): React.JSX.Element {
  return (
    <section className={styles.syncCard} aria-labelledby="last-sync-title">
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.sectionEyebrow}>DIA Senkron</p>
          <h2 id="last-sync-title" className={styles.sectionTitle}>
            Son çalışan iş
          </h2>
        </div>
        <Link href="/sync" className={styles.sectionLink}>
          Tüm log
          <i className="icon icon-arrow-right" aria-hidden />
        </Link>
      </div>

      {entry ? <SyncStrip entry={entry} now={now} /> : <SyncEmpty />}
    </section>
  );
}

function SyncStrip({ entry, now }: { entry: SyncLogEntry; now: Date }): React.JSX.Element {
  const inserted = readStat(entry.stats, 'inserted');
  const updated = readStat(entry.stats, 'updated');
  const unmatched = readStat(entry.stats, 'unmatched');

  const startedMs = Date.parse(entry.startedAt);
  const finishedMs = entry.finishedAt ? Date.parse(entry.finishedAt) : null;
  const durationMs =
    !Number.isNaN(startedMs) && finishedMs !== null && !Number.isNaN(finishedMs)
      ? finishedMs - startedMs
      : null;

  const entityLabel = ENTITY_LABEL[entry.entity] ?? entry.entity;
  const entityIcon = ENTITY_ICON[entry.entity] ?? 'icon-package';
  const toneClass = TONE_CLASS[entry.status];

  return (
    <>
      <div className={styles.syncStrip}>
        <div className={styles.syncEntity}>
          <i className={`icon ${entityIcon}`} aria-hidden />
          <div className={styles.syncEntityMeta}>
            <p className={styles.syncEntityName}>{entityLabel}</p>
            <p className={styles.syncEntitySub}>
              <span className={`${styles.syncTone} ${toneClass}`.trim()}>
                {TONE_LABEL[entry.status]}
              </span>
              {' · '}
              {formatRelative(entry.startedAt, now)}
            </p>
          </div>
        </div>

        <div className={styles.syncStats}>
          {inserted !== null && (
            <div className={styles.syncStat}>
              <span className={styles.syncStatNumber}>+{formatNumber(inserted)}</span>
              <span className={styles.syncStatLabel}>Eklendi</span>
            </div>
          )}
          {updated !== null && (
            <div className={styles.syncStat}>
              <span className={styles.syncStatNumber}>{formatNumber(updated)}</span>
              <span className={styles.syncStatLabel}>Güncel</span>
            </div>
          )}
          {unmatched !== null && unmatched > 0 && (
            <div className={styles.syncStat}>
              <span className={styles.syncStatNumber}>{formatNumber(unmatched)}</span>
              <span className={styles.syncStatLabel}>Eşleşmeyen</span>
            </div>
          )}
        </div>

        {durationMs !== null && (
          <span className={styles.syncDuration} title="Çalışma süresi">
            <i className="icon icon-clock-cd" aria-hidden />
            {formatDurationMs(durationMs)}
          </span>
        )}
      </div>

      {entry.status === 'failed' && entry.error && (
        <div className={styles.syncErrorBand} role="status">
          <p className={styles.syncErrorMessage}>{entry.error}</p>
          <Link href="/sync" className={styles.syncErrorLink}>
            Log&apos;a git
            <i className="icon icon-arrow-right" aria-hidden />
          </Link>
        </div>
      )}
    </>
  );
}

function SyncEmpty(): React.JSX.Element {
  return (
    <p className={styles.syncEmpty}>
      Henüz senkron çalışmamış. İlk çalışmadan sonra burada özet görünür.
    </p>
  );
}
