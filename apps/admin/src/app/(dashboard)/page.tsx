import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../lib/admin-fetch';

import styles from './_components/dashboard/dashboard.module.scss';
import { DashboardHeader } from './_components/dashboard/DashboardHeader';
import { LastSyncCard, type SyncLogEntry } from './_components/dashboard/LastSyncCard';
import { OperatorShortcuts } from './_components/dashboard/OperatorShortcuts';
import { RecentOrdersTable, type RecentOrder } from './_components/dashboard/RecentOrdersTable';
import { StatGroup } from './_components/dashboard/StatGroup';

interface AdminProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

interface OrderListResponse {
  total: number;
  items: RecentOrder[];
}

interface ProductRow {
  status: 'visible' | 'hidden' | 'needs_review';
}

interface ProductListResponse {
  total: number;
  items: ProductRow[];
}

/**
 * Admin dashboard home. Composition (top to bottom):
 *
 *   1. Greeting strip — first-name greeting, refreshed timestamp, role pill
 *   2. Stat group — asymmetric: hero pending card with 7-day spark + delta,
 *      flanked by a today-revenue tile and a needs-review tile so the
 *      operator can read inflow, money, and triage backlog at a glance
 *   3. Operator shortcuts — three quick links (yeni ürün, DIA senkron,
 *      incelenmesi gereken ürünler) sized for muscle memory
 *   4. Last DIA sync card — entity, semantic tone, +N inserted / N updated
 *      tabular counts, monospace duration; failure messages get a quiet rose
 *      band underneath linking to the full log
 *   5. Recent orders — refined table with an "Açıldı" relative-time column
 *      and a hover affordance that slides an arrow next to the order code
 *
 * Data is fetched in parallel; 401s redirect to /login. The page is rendered
 * fresh on every request (admin-fetch sets cache: no-store) so timestamps
 * and counts always reflect the current backend state.
 */
export default async function DashboardPage(): Promise<React.JSX.Element> {
  const [me, productsResp, ordersResp, log] = await Promise.all([
    fetchAdmin<AdminProfile>('/admin/auth/me'),
    fetchAdmin<ProductListResponse>('/admin/products?pageSize=200'),
    fetchAdmin<OrderListResponse>('/admin/orders?pageSize=100'),
    fetchAdmin<SyncLogEntry[]>('/admin/sync/log?limit=5'),
  ]);
  if (
    me === ADMIN_NOT_AUTHENTICATED ||
    productsResp === ADMIN_NOT_AUTHENTICATED ||
    ordersResp === ADMIN_NOT_AUTHENTICATED ||
    log === ADMIN_NOT_AUTHENTICATED
  ) {
    redirect('/login');
  }

  const recentOrders = ordersResp.items.slice(0, 5);
  const renderedAt = new Date();

  // Today-window in the server's locale. We anchor against the rendered
  // timestamp so the value always agrees with the greeting clock.
  const todayStart = new Date(renderedAt);
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();

  // Today's paid-order revenue. We count by createdAt (when the order was
  // placed) rather than paidAt because operators read this as "today's
  // sales", not "today's settlements".
  const todayRevenueMinor = ordersResp.items.reduce((acc, order) => {
    if (order.status !== 'paid' && order.status !== 'fulfilling' && order.status !== 'shipped') {
      return acc;
    }
    const t = Date.parse(order.createdAt);
    if (Number.isNaN(t) || t < todayStartMs) return acc;
    return acc + order.totalMinor;
  }, 0);
  const todayPaidCount = ordersResp.items.reduce((acc, order) => {
    if (order.status !== 'paid' && order.status !== 'fulfilling' && order.status !== 'shipped') {
      return acc;
    }
    const t = Date.parse(order.createdAt);
    return Number.isNaN(t) || t < todayStartMs ? acc : acc + 1;
  }, 0);

  // Needs-review count. The /admin/products list returns the status column
  // directly so we can read the backlog without an extra round trip.
  const needsReviewCount = productsResp.items.reduce(
    (acc, p) => (p.status === 'needs_review' ? acc + 1 : acc),
    0,
  );

  return (
    <div className="my-account-content">
      <DashboardHeader fullName={me.name} role={me.role} refreshedAt={renderedAt} />

      <StatGroup
        orders={ordersResp.items}
        totalOrders={ordersResp.total}
        todayRevenueMinor={todayRevenueMinor}
        todayPaidCount={todayPaidCount}
        needsReviewCount={needsReviewCount}
        now={renderedAt}
      />

      <OperatorShortcuts needsReviewCount={needsReviewCount} />

      <LastSyncCard entry={log[0] ?? null} now={renderedAt} />

      <section aria-labelledby="recent-orders-title">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.sectionEyebrow}>Son hareket</p>
            <h2 id="recent-orders-title" className={styles.sectionTitle}>
              Son siparişler
            </h2>
          </div>
          <Link href="/orders" className={styles.sectionLink}>
            Tümünü gör
            <i className="icon icon-arrow-right" aria-hidden />
          </Link>
        </div>
        <RecentOrdersTable orders={recentOrders} now={renderedAt} />
      </section>
    </div>
  );
}
