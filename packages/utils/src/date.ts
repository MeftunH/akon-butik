const DATE_TR = new Intl.DateTimeFormat('tr-TR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const DATETIME_TR = new Intl.DateTimeFormat('tr-TR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Istanbul',
});

const RELATIVE_TR = new Intl.RelativeTimeFormat('tr-TR', { numeric: 'auto' });

export function formatDateTR(date: Date | string | number): string {
  return DATE_TR.format(new Date(date));
}

export function formatDateTimeTR(date: Date | string | number): string {
  return DATETIME_TR.format(new Date(date));
}

export function formatRelativeTR(date: Date | string | number, now: Date = new Date()): string {
  const target = new Date(date).getTime();
  const diffSeconds = (target - now.getTime()) / 1000;
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];
  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(diffSeconds) >= secondsInUnit || unit === 'second') {
      return RELATIVE_TR.format(Math.round(diffSeconds / secondsInUnit), unit);
    }
  }
  return RELATIVE_TR.format(0, 'second');
}
