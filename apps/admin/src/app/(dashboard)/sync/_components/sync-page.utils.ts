// Pure formatting helpers for the DIA sync page. No DOM, no network —
// safe to import from server and client components alike.

import type { SyncLogEntry } from './sync-page.types';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Operator-friendly duration: ms / sn / dk depending on magnitude. Returns
 * a non-breaking placeholder when the run is still in flight.
 */
export function formatDuration(start: string, end: string | null): string {
  if (!end) return '—';
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (Number.isNaN(ms) || ms < 0) return '—';
  if (ms < SECOND) return `${ms.toString()} ms`;
  if (ms < MINUTE) return `${(ms / SECOND).toFixed(1)} sn`;
  if (ms < HOUR) return `${(ms / MINUTE).toFixed(1)} dk`;
  return `${(ms / HOUR).toFixed(1)} sa`;
}

/**
 * Live duration since the run started, used for in-flight rows. Computed
 * against `now` so it can be re-rendered by the polling loop.
 */
export function formatLiveDuration(start: string, now: number): string {
  const ms = now - new Date(start).getTime();
  if (Number.isNaN(ms) || ms < 0) return '—';
  if (ms < SECOND) return `${ms.toString()} ms`;
  if (ms < MINUTE) return `${(ms / SECOND).toFixed(0)} sn`;
  return `${(ms / MINUTE).toFixed(1)} dk`;
}

/**
 * Turkish relative-time label: "az önce", "3 dk önce", "2 sa önce", "dün",
 * "5 gün önce". Falls back to a localized date once outside the week.
 */
export function formatRelativeTr(iso: string, now: number): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return '—';
  const delta = now - t;
  if (delta < 30 * SECOND) return 'az önce';
  if (delta < MINUTE) return `${Math.floor(delta / SECOND).toString()} sn önce`;
  if (delta < HOUR) return `${Math.floor(delta / MINUTE).toString()} dk önce`;
  if (delta < DAY) return `${Math.floor(delta / HOUR).toString()} sa önce`;
  if (delta < 2 * DAY) return 'dün';
  if (delta < 7 * DAY) return `${Math.floor(delta / DAY).toString()} gün önce`;
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Absolute timestamp for hover/tooltip. Always rendered the same way
 * regardless of when the page was loaded.
 */
export function formatAbsoluteTr(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/** Common stat keys returned by the worker. Ordered for editorial reading. */
const STAT_LABELS: Record<string, string> = {
  total: 'toplam',
  fetched: 'çekilen',
  processed: 'işlenen',
  upserted: 'işlenen',
  created: 'yeni',
  updated: 'güncel',
  unchanged: 'aynı',
  skipped: 'atlanan',
  errors: 'hata',
  warnings: 'uyarı',
};

const STAT_ORDER = [
  'total',
  'fetched',
  'processed',
  'upserted',
  'created',
  'updated',
  'unchanged',
  'skipped',
  'errors',
  'warnings',
];

/**
 * Compact stat summary for the log row, using known stat keys first
 * (in editorial order) then falling back to whatever else the worker
 * shipped. Caps at `max` segments so dense rows don't sprawl.
 */
export function summarizeStats(stats: Record<string, unknown> | null, max = 4): string {
  if (!stats) return '';
  const entries: [string, unknown][] = [];
  for (const key of STAT_ORDER) {
    if (key in stats) entries.push([key, stats[key]]);
  }
  for (const [k, v] of Object.entries(stats)) {
    if (!STAT_ORDER.includes(k)) entries.push([k, v]);
  }
  return entries
    .slice(0, max)
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([k, v]) => `${formatStatNumber(v)} ${STAT_LABELS[k] ?? k}`)
    .join(' · ');
}

function formatStatNumber(v: unknown): string {
  if (typeof v === 'number') return v.toLocaleString('tr-TR');
  if (typeof v === 'string') return v;
  if (typeof v === 'boolean') return v ? 'evet' : 'hayır';
  return JSON.stringify(v);
}

/**
 * Last-known run for an entity, scanned from a log slice already ordered
 * most-recent-first by the API.
 */
export function findLastRun(log: readonly SyncLogEntry[], entity: string): SyncLogEntry | null {
  for (const row of log) {
    if (row.entity === entity) return row;
  }
  return null;
}

/** True if any row in the slice is currently running for that entity. */
export function isEntityRunning(log: readonly SyncLogEntry[], entity: string): boolean {
  return log.some((row) => row.entity === entity && row.status === 'running');
}
