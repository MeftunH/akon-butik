'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import {
  SYNC_STATUS_TEXT,
  type SyncEntity,
  type SyncEntityMeta,
  type SyncEntitySnapshot,
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

interface SyncTriggerCardProps {
  meta: SyncEntityMeta;
  snapshot: SyncEntitySnapshot;
  /**
   * Cooldown floor (seconds) — even after a sync settles, we hold the
   * trigger button briefly so an over-eager double-click doesn't queue
   * twice. Set to 0 to disable.
   */
  cooldownSeconds?: number;
}

/**
 * One editorial trigger card. Reads its own snapshot rendered server-
 * side, posts to /api/admin/sync/:entity, then waits for the parent
 * page poller to pick up the refresh. Unlike the previous implementation
 * the in-flight state is sourced from the server snapshot (not local
 * state) so it survives navigation and matches the log table.
 */
export function SyncTriggerCard({
  meta,
  snapshot,
  cooldownSeconds = 4,
}: SyncTriggerCardProps): React.ReactElement {
  const router = useRouter();
  const [postBusy, setPostBusy] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  const isRunning = snapshot.isRunning || postBusy;
  const isCoolingDown = cooldownUntil !== null && now < cooldownUntil && !snapshot.isRunning;
  const disabled = isRunning || isCoolingDown;

  // Wall clock for live duration + relative time freshness. 1 s tick is
  // visible only on the in-flight card; otherwise the snapshot is stable.
  useEffect(() => {
    if (!snapshot.isRunning && cooldownUntil === null) return undefined;
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      window.clearInterval(id);
    };
  }, [snapshot.isRunning, cooldownUntil]);

  const trigger = async (): Promise<void> => {
    setPostError(null);
    setPostBusy(true);
    try {
      const res = await fetch(`/api/admin/sync/${meta.key}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(body?.message ?? `Senkron başlatılamadı (${res.status.toString()})`);
      }
      // Cooldown lock the button for a beat, then let the page poller
      // surface the new "running" row.
      if (cooldownSeconds > 0) {
        setCooldownUntil(Date.now() + cooldownSeconds * 1000);
      }
      // Force one immediate refresh so the snapshot below flips to running.
      router.refresh();
    } catch (err) {
      setPostError(err instanceof Error ? err.message : 'Beklenmeyen bir hata');
    } finally {
      setPostBusy(false);
    }
  };

  const buttonNote = useMemo(() => {
    if (postError) return { text: postError, isError: true };
    if (snapshot.isRunning) return { text: 'Sıra bu girişte; tekrar tetiklemeden bekleyin' };
    if (isCoolingDown) {
      const left = Math.max(0, Math.ceil(((cooldownUntil ?? 0) - now) / 1000));
      return { text: `${left.toString()} sn sonra tekrar tetiklenebilir` };
    }
    return { text: meta.typicalDuration };
  }, [postError, snapshot.isRunning, isCoolingDown, cooldownUntil, now, meta.typicalDuration]);

  return (
    <article
      className={`${styles.triggerCard} ${snapshot.isRunning ? styles.isRunning : ''}`}
      aria-busy={snapshot.isRunning}
    >
      <header className={styles.triggerCardHead}>
        <span className={styles.triggerNumeral} aria-hidden>
          {meta.numeral}
        </span>
        <div>
          <h3 className={styles.triggerLabel}>{meta.label}</h3>
          <p className={styles.triggerTagline}>{meta.tagline}</p>
          <span className={styles.triggerCadence}>
            {meta.cadence} · {meta.typicalDuration}
          </span>
        </div>
      </header>

      <p className={styles.triggerDescription}>{meta.description}</p>

      <SnapshotRail snapshot={snapshot} now={now} />

      <div className={styles.triggerAction}>
        <button
          type="button"
          className={styles.triggerButton}
          onClick={() => void trigger()}
          disabled={disabled}
          aria-disabled={disabled}
          title={
            isRunning
              ? 'Senkron şu anda çalışıyor; bitmesini bekleyin'
              : isCoolingDown
                ? 'Soğuma süresi'
                : `${meta.label} senkronunu manuel başlat`
          }
          data-entity={meta.key}
        >
          <span>
            {snapshot.isRunning
              ? 'Çalışıyor'
              : postBusy
                ? 'Tetikleniyor'
                : isCoolingDown
                  ? 'Bekleniyor'
                  : 'Senkronu Başlat'}
          </span>
          <span className={styles.triggerButtonGlyph} aria-hidden>
            {snapshot.isRunning ? <PulseGlyph entity={meta.key} /> : '→'}
          </span>
        </button>
        <span
          className={`${styles.triggerButtonNote} ${
            buttonNote.isError ? styles.triggerButtonNoteError : ''
          }`}
          role={buttonNote.isError ? 'alert' : undefined}
        >
          {buttonNote.text}
        </span>
      </div>
    </article>
  );
}

interface SnapshotRailProps {
  snapshot: SyncEntitySnapshot;
  now: number;
}

function SnapshotRail({ snapshot, now }: SnapshotRailProps): React.ReactElement {
  const { lastRun } = snapshot;
  if (!lastRun) {
    return (
      <div className={styles.snapshot}>
        <div>
          <span className={styles.snapshotLabel}>Son senkron</span>
          <span className={styles.snapshotEmpty}>Henüz çalışmadı</span>
        </div>
        <span className={`${styles.snapshotStatus} ${styles.statusEmpty}`}>—</span>
      </div>
    );
  }

  const isRunning = lastRun.status === 'running';
  const statusToneClass =
    lastRun.status === 'success'
      ? styles.statusOk
      : lastRun.status === 'failed'
        ? styles.statusFail
        : styles.statusRun;

  const durationText = isRunning
    ? formatLiveDuration(lastRun.startedAt, now)
    : formatDuration(lastRun.startedAt, lastRun.finishedAt);

  const summary = lastRun.error ? lastRun.error.slice(0, 90) : summarizeStats(lastRun.stats, 4);

  return (
    <div className={styles.snapshot}>
      <div>
        <span className={styles.snapshotLabel}>Son senkron</span>
        <time
          className={styles.snapshotValue}
          dateTime={lastRun.startedAt}
          title={formatAbsoluteTr(lastRun.startedAt)}
        >
          {formatRelativeTr(lastRun.startedAt, now)} · {durationText}
        </time>
        {summary ? <span className={styles.snapshotStat}>{summary}</span> : null}
      </div>
      <span className={`${styles.snapshotStatus} ${statusToneClass}`}>
        {isRunning ? <span className={styles.pulse} aria-hidden /> : null}
        {SYNC_STATUS_TEXT[lastRun.status]}
      </span>
    </div>
  );
}

function PulseGlyph({ entity }: { entity: SyncEntity }): React.ReactElement {
  // Tiny visual hint for the trigger button while running. We re-render
  // with a key tied to the entity so it remounts when the entity changes.
  return <span key={entity} className={styles.pulse} />;
}

// Re-export for the empty state to use the same trigger primitive.
export type { SyncLogEntry };
