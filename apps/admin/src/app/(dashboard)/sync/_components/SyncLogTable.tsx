'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import {
  SYNC_ENTITY_META,
  SYNC_STATUS_TEXT,
  type SyncEntity,
  type SyncLogEntry,
} from './sync-page.types';
import {
  formatAbsoluteTr,
  formatDuration,
  formatLiveDuration,
  formatRelativeTr,
  summarizeStats,
} from './sync-page.utils';
import styles from './sync.module.scss';

interface SyncLogTableProps {
  rows: readonly SyncLogEntry[];
  /** Total log size known to the API (so we can hint "load more"). */
  // Reserved for future paging; kept undefined while the controller caps
  // at 200 and we render at most 50 here.
  totalCount?: number;
  initialPageSize?: number;
  pageSizeStep?: number;
}

const SYNC_KEYS: readonly SyncEntity[] = ['products', 'stock', 'categories'];

const isKnownEntity = (e: string): e is SyncEntity => (SYNC_KEYS as readonly string[]).includes(e);

const getNumeralFor = (entity: string): string => {
  for (const meta of SYNC_ENTITY_META) {
    if (meta.key === entity) return meta.numeral;
  }
  return '··';
};

const getLabelFor = (entity: string): string => {
  for (const meta of SYNC_ENTITY_META) {
    if (meta.key === entity) return meta.label;
  }
  return entity;
};

/**
 * Dense log table with inline error preview and a stable retry CTA.
 * Pagination is local "load more" up to the rows the server gave us;
 * the controller caps log fetches at 200 already.
 */
export function SyncLogTable({
  rows,
  initialPageSize = 12,
  pageSizeStep = 12,
}: SyncLogTableProps): React.ReactElement {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    // Auto-open the first failed row on initial render so an operator
    // landing on the page doesn't have to hunt for the cause.
    const next = new Set<string>();
    const firstFailed = rows.find((r) => r.status === 'failed');
    if (firstFailed) next.add(firstFailed.id);
    return next;
  });
  const [visibleCount, setVisibleCount] = useState(initialPageSize);
  const [retryBusy, setRetryBusy] = useState<string | null>(null);
  const [retryError, setRetryError] = useState<string | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  const hasRunning = useMemo(() => rows.some((r) => r.status === 'running'), [rows]);

  // Live tick only when there's a running row OR an open expansion (to
  // freshen relative-time labels). Otherwise idle.
  useEffect(() => {
    if (!hasRunning && expanded.size === 0) return undefined;
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      window.clearInterval(id);
    };
  }, [hasRunning, expanded.size]);

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const retry = useCallback(
    async (entity: string): Promise<void> => {
      if (!isKnownEntity(entity)) return;
      setRetryError(null);
      setRetryBusy(entity);
      try {
        const res = await fetch(`/api/admin/sync/${entity}`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            message?: string;
          } | null;
          throw new Error(body?.message ?? `Tekrar denenemedi (${res.status.toString()})`);
        }
        router.refresh();
      } catch (err) {
        setRetryError(err instanceof Error ? err.message : 'Tekrar denenemedi');
      } finally {
        setRetryBusy(null);
      }
    },
    [router],
  );

  const visibleRows = rows.slice(0, visibleCount);

  return (
    <>
      <div className={styles.logFrame}>
        <table className={styles.logTable}>
          <thead>
            <tr>
              <th scope="col">Tür</th>
              <th scope="col">Durum</th>
              <th scope="col">Süre</th>
              <th scope="col">Kayıt</th>
              <th scope="col">Başladı</th>
              <th scope="col" aria-label="Detay" />
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isOpen = expanded.has(row.id);
              const isRunning = row.status === 'running';
              const isFailed = row.status === 'failed';
              const canExpand =
                isFailed || (row.stats !== null && Object.keys(row.stats).length > 0);
              const rowToneClass = isFailed ? styles.errorRow : isRunning ? styles.runningRow : '';
              const statusToneClass =
                row.status === 'success'
                  ? styles.statusOk
                  : isFailed
                    ? styles.statusFail
                    : styles.statusRun;
              const duration = isRunning
                ? formatLiveDuration(row.startedAt, now)
                : formatDuration(row.startedAt, row.finishedAt);
              const summary = isFailed
                ? (row.error?.slice(0, 90) ?? 'Hata kaydı boş')
                : summarizeStats(row.stats, 4) || '—';

              return (
                <Fragment key={row.id}>
                  <tr className={rowToneClass}>
                    <td>
                      <span className={styles.entityCell}>
                        <span className={styles.entityNumeral} aria-hidden>
                          {getNumeralFor(row.entity)}
                        </span>
                        {getLabelFor(row.entity)}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.statusCell} ${statusToneClass}`}>
                        {isRunning ? <span className={styles.pulse} aria-hidden /> : null}
                        {SYNC_STATUS_TEXT[row.status]}
                      </span>
                    </td>
                    <td>
                      <span className={styles.durationCell}>{duration}</span>
                    </td>
                    <td>
                      <span className={styles.statsCell}>{summary}</span>
                    </td>
                    <td>
                      <span className={styles.timeCell} title={formatAbsoluteTr(row.startedAt)}>
                        <time dateTime={row.startedAt}>{formatRelativeTr(row.startedAt, now)}</time>
                      </span>
                    </td>
                    <td>
                      {canExpand ? (
                        <button
                          type="button"
                          className={styles.expandButton}
                          onClick={() => {
                            toggle(row.id);
                          }}
                          aria-expanded={isOpen}
                          aria-controls={`sync-log-detail-${row.id}`}
                        >
                          {isOpen ? 'Kapat' : 'Detay'}
                          <span aria-hidden>{isOpen ? '▴' : '▾'}</span>
                        </button>
                      ) : null}
                    </td>
                  </tr>
                  {isOpen ? (
                    <tr className={styles.detailRow}>
                      <td colSpan={6} id={`sync-log-detail-${row.id}`}>
                        <div className={styles.detailWrap}>
                          {isFailed ? (
                            <div>
                              <p className={styles.detailLabel}>Hata mesajı</p>
                              <pre className={styles.detailMessage}>
                                {row.error?.slice(0, 800) ?? 'Boş'}
                              </pre>
                            </div>
                          ) : null}

                          {row.stats !== null && Object.keys(row.stats).length > 0 ? (
                            <div>
                              <p className={styles.detailLabel}>İstatistikler</p>
                              <pre className={styles.detailMessage}>
                                {JSON.stringify(row.stats, null, 2)}
                              </pre>
                            </div>
                          ) : null}

                          <div className={styles.detailActions}>
                            {isFailed && isKnownEntity(row.entity) ? (
                              <button
                                type="button"
                                className={styles.detailRetry}
                                onClick={() => void retry(row.entity)}
                                disabled={retryBusy !== null || hasRunning}
                              >
                                {retryBusy === row.entity ? 'Tetikleniyor' : 'Tekrar Dene'}
                              </button>
                            ) : null}
                            <span className={styles.detailMeta}>
                              ID:&nbsp;<code>{row.id}</code>
                            </span>
                            {row.finishedAt ? (
                              <span
                                className={styles.detailMeta}
                                title={formatAbsoluteTr(row.finishedAt)}
                              >
                                Bitti:&nbsp;
                                <time dateTime={row.finishedAt}>
                                  {formatAbsoluteTr(row.finishedAt)}
                                </time>
                              </span>
                            ) : null}
                          </div>
                          {retryError && retryBusy === null ? (
                            <span
                              className={styles.detailMeta}
                              role="alert"
                              style={{ color: 'var(--primary, #c8102e)' }}
                            >
                              {retryError}
                            </span>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {visibleCount < rows.length ? (
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            className={styles.expandButton}
            onClick={() => {
              setVisibleCount((c) => Math.min(c + pageSizeStep, rows.length));
            }}
          >
            Daha fazla yükle ({(rows.length - visibleCount).toString()})
          </button>
        </div>
      ) : null}
    </>
  );
}
