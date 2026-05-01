import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../lib/admin-fetch';

import styles from './_components/dashboard/dashboard.module.scss';
import { DashboardHeader } from './_components/dashboard/DashboardHeader';
import { LastSyncCard, type SyncLogEntry } from './_components/dashboard/LastSyncCard';
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

interface ProductListResponse {
  total: number;
  items: { status: 'visible' | 'hidden' | 'needs_review' }[];
}

/**
 * Admin dashboard home. Composition (top to bottom):
 *
 *   1. Greeting strip — first-name greeting, refreshed timestamp, role pill
 *   2. Stat group — asymmetric: hero pending card with 7-day spark + delta,
 *      flanked by two compact rows for fulfilling / total counts
 *   3. Last DIA sync card — entity, semantic tone, +N inserted / N updated
 *      tabular counts, monospace duration; failure messages get a quiet rose
 *      band underneath linking to the full log
 *   4. Recent orders — refined table with an "Açıldı" relative-time column
 *      and a hover affordance that slides an arrow next to the order code
 *
 * Data is fetched in parallel; 401s redirect to /login. The page is rendered
 * fresh on every request (admin-fetch sets cache: no-store) so timestamps
 * and counts always reflect the current backend state.
 */
export default async function DashboardPage(): Promise<React.JSX.Element> {
  const [me, productsResp, ordersResp, log] = await Promise.all([
    fetchAdmin<AdminProfile>('/admin/auth/me'),
    fetchAdmin<ProductListResponse>('/admin/products?pageSize=100'),
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
  // productsResp is fetched eagerly so the stat group can grow without an
  // extra round-trip (the current revision doesn't surface product counts;
  // it stays here for parity with the previous page and as a no-op assert).
  void productsResp;

  const recentOrders = ordersResp.items.slice(0, 5);
  const renderedAt = new Date();

  return (
    <div className="my-account-content">
      <DashboardHeader fullName={me.name} role={me.role} refreshedAt={renderedAt} />

      <StatGroup orders={ordersResp.items} totalOrders={ordersResp.total} now={renderedAt} />

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
