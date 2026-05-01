import Link from 'next/link';

import styles from './dashboard.module.scss';
import { formatNumber } from './format';

interface OrderForStats {
  status: string;
  createdAt: string;
}

interface StatGroupProps {
  orders: readonly OrderForStats[];
  totalOrders: number;
  now?: Date;
}

interface DayBucket {
  iso: string;
  count: number;
  isToday: boolean;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Build a 7-day count trail ending today. Orders without a parseable date
 * are silently dropped — we don't want a single bad row to throw the page.
 */
function buildSpark(orders: readonly OrderForStats[], now: Date): readonly DayBucket[] {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const buckets: DayBucket[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getTime() - (6 - i) * DAY_MS);
    return { iso: d.toISOString().slice(0, 10), count: 0, isToday: i === 6 };
  });
  const byIso = new Map(buckets.map((b, i) => [b.iso, i]));
  for (const o of orders) {
    const t = Date.parse(o.createdAt);
    if (Number.isNaN(t)) continue;
    const iso = new Date(t).toISOString().slice(0, 10);
    const idx = byIso.get(iso);
    if (idx === undefined) continue;
    const bucket = buckets[idx];
    if (bucket) bucket.count += 1;
  }
  return buckets;
}

/**
 * Asymmetric stat composition: a hero "pending" card with tabular numerals,
 * a 7-day spark trail, and a delta vs yesterday; flanked by two compact
 * rows for fulfilling and total counts. Deliberately NOT three identical
 * cards (the SaaS reflex this redesign rejects).
 */
export function StatGroup({
  orders,
  totalOrders,
  now = new Date(),
}: StatGroupProps): React.JSX.Element {
  const pending = orders.filter((o) => o.status === 'pending');
  const fulfilling = orders.filter((o) => o.status === 'paid' || o.status === 'fulfilling');

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();
  const yesterdayMs = todayMs - DAY_MS;

  // Today / yesterday counts off the full order list. Counted by createdAt
  // rather than status so the comparison reads as "siparişler" volume.
  const todayCount = orders.reduce((acc, o) => {
    const t = Date.parse(o.createdAt);
    return Number.isNaN(t) || t < todayMs ? acc : acc + 1;
  }, 0);
  const yesterdayCount = orders.reduce((acc, o) => {
    const t = Date.parse(o.createdAt);
    if (Number.isNaN(t)) return acc;
    return t >= yesterdayMs && t < todayMs ? acc + 1 : acc;
  }, 0);

  const buckets = buildSpark(orders, now);
  const peak = Math.max(1, ...buckets.map((b) => b.count));

  const delta = todayCount - yesterdayCount;
  const deltaText: string =
    yesterdayCount === 0 && todayCount === 0
      ? 'Dün ve bugün hareketsiz.'
      : delta === 0
        ? 'Dün ile aynı tempo.'
        : delta > 0
          ? `Düne göre ${formatNumber(delta)} fazla.`
          : `Düne göre ${formatNumber(Math.abs(delta))} daha az.`;

  const last7 = buckets.reduce((acc, b) => acc + b.count, 0);

  return (
    <section className={styles.statGroup} aria-label="Sipariş özeti">
      <Link href="/orders?status=pending" className={styles.statHero}>
        <div>
          <p className={styles.statHeroLabel}>Bekleyen sipariş</p>
          <p className={styles.statHeroFigure}>
            <span className={styles.statHeroNumber}>{formatNumber(pending.length)}</span>
            <span className={styles.statHeroSuffix}>işlenmeyi bekliyor</span>
          </p>
        </div>

        <div className={styles.spark} aria-hidden>
          {buckets.map((b) => (
            <span
              key={b.iso}
              className={`${styles.sparkBar} ${b.isToday ? styles.sparkBarToday : ''}`.trim()}
              style={{ height: `${((b.count / peak) * 100).toFixed(2)}%` }}
            />
          ))}
        </div>

        <div className={styles.statHeroFooter}>
          <p className={styles.statHeroNote}>
            <strong>{deltaText}</strong> Son 7 gün içinde toplam {formatNumber(last7)} sipariş.
          </p>
          <span className={styles.statHeroCta} aria-hidden>
            İncele
            <i className="icon icon-arrow-right" />
          </span>
        </div>
      </Link>

      <div className={styles.statSide}>
        <Link href="/orders?status=paid" className={styles.statRow}>
          <span>
            <span className={styles.statRowLabel}>Hazırlanıyor</span>
            <span className={styles.statRowSub}>Ödendi, kargoya hazır.</span>
          </span>
          <span className={styles.statRowNumber}>{formatNumber(fulfilling.length)}</span>
        </Link>

        <Link href="/orders" className={styles.statRow}>
          <span>
            <span className={styles.statRowLabel}>Toplam Sipariş</span>
            <span className={styles.statRowSub}>Sistemdeki tüm kayıtlar.</span>
          </span>
          <span className={styles.statRowNumber}>{formatNumber(totalOrders)}</span>
        </Link>
      </div>
    </section>
  );
}
