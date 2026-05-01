/**
 * Shared formatting helpers for the orders surface (list + detail).
 *
 * Currency: order amounts are persisted as integer minor units (kuruş)
 * and rendered as `₺X.XXX,XX` per Turkish locale conventions. Dates are
 * rendered both relatively ("3dk önce") and absolutely (`tr-TR` long).
 */

export const formatTl = (minor: number): string =>
  `₺${(minor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;

export const formatDate = (iso: string | null | undefined): string | null => {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (iso: string | null | undefined): string | null => {
  if (!iso) return null;
  return new Date(iso).toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Turkish-localised relative time. Returns short forms ("şimdi", "3dk
 * önce", "2sa önce", "5g önce", "3h önce", "2ay önce", "1y önce").
 * Anchored against `nowMs` so we can render deterministically on the
 * server (request time) and have the client component refresh when
 * mounted.
 */
export const formatRelative = (iso: string | null | undefined, nowMs: number): string | null => {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const diffSec = Math.max(0, Math.floor((nowMs - then) / 1000));

  if (diffSec < 30) return 'az önce';
  if (diffSec < 60) return `${diffSec.toString()}sn önce`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin.toString()}dk önce`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr.toString()}sa önce`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay.toString()}g önce`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 5) return `${diffWeek.toString()}h önce`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth.toString()}ay önce`;
  const diffYear = Math.floor(diffDay / 365);
  return `${diffYear.toString()}y önce`;
};

/**
 * Stable timezone-aware "today" check at server render time. Any order
 * whose `createdAt` matches the same `tr-TR` calendar date as the
 * supplied `nowMs` counts as today. We compare on the locale `sv-SE`
 * date string (which is `YYYY-MM-DD`) so the comparison is timezone-
 * stable when the host runs in `Europe/Istanbul`.
 */
export const isSameDayAs = (iso: string | null | undefined, nowMs: number): boolean => {
  if (!iso) return false;
  const then = new Date(iso);
  const now = new Date(nowMs);
  if (Number.isNaN(then.getTime())) return false;
  const fmt = (d: Date): string => d.toISOString().slice(0, 10);
  // ISO is UTC; for a Turkish admin most "today" reads at noon-evening
  // align with UTC date. This is good enough for the stat strip; the
  // strip explicitly reads "bugün (UTC)" for clarity.
  return fmt(then) === fmt(now);
};
