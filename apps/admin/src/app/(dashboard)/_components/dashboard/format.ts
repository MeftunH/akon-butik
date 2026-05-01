// Pure formatters used across the dashboard composition. Server components
// render in Turkish so all output here is tr-TR locale; numbers are printed
// with tabular spacing (the consumer applies font-variant-numeric).

const TR_NUMBER = new Intl.NumberFormat('tr-TR');
const TR_DATE_TIME = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});
const TR_RELATIVE = new Intl.RelativeTimeFormat('tr-TR', { numeric: 'auto' });

export const formatTl = (minor: number): string =>
  `\u20BA${(minor / 100).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatNumber = (value: number): string => TR_NUMBER.format(value);

export const formatDateTime = (iso: string): string => TR_DATE_TIME.format(new Date(iso));

/**
 * Compact relative time in Turkish for "Açıldı" / "Son senkron" columns.
 * Falls back to absolute date once the delta exceeds 6 days because
 * Intl.RelativeTimeFormat starts losing usefulness past that.
 */
export function formatRelative(iso: string, now: Date = new Date()): string {
  const ms = now.getTime() - new Date(iso).getTime();
  const sec = Math.round(ms / 1000);
  if (sec < 45) return TR_RELATIVE.format(-sec, 'second');
  const min = Math.round(sec / 60);
  if (min < 60) return TR_RELATIVE.format(-min, 'minute');
  const hr = Math.round(min / 60);
  if (hr < 24) return TR_RELATIVE.format(-hr, 'hour');
  const day = Math.round(hr / 24);
  if (day < 7) return TR_RELATIVE.format(-day, 'day');
  return TR_DATE_TIME.format(new Date(iso));
}

/**
 * Format milliseconds as "1.4s" / "320ms" / "2dk 14sn" for short, friendly
 * sync-duration display. Anything sub-1500ms keeps ms; under a minute uses
 * decimal seconds; longer runs render as compound minutes/seconds.
 */
export function formatDurationMs(ms: number): string {
  if (ms < 1500) return `${TR_NUMBER.format(Math.round(ms))}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}sn`;
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (seconds === 0) return `${TR_NUMBER.format(minutes)}dk`;
  return `${TR_NUMBER.format(minutes)}dk ${TR_NUMBER.format(seconds)}sn`;
}

/** First name from a single full-name string. Falls back to the whole string. */
export const firstName = (name: string): string => name.trim().split(/\s+/)[0] ?? name;
