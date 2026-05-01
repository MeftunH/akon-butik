import { Pagination } from '@akonbutik/ui';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../lib/admin-fetch';

import { formatDateTime, formatRelative, formatTl, isSameDayAs } from './_components/format';
import {
  OrderListFiltersBar,
  STATUS_PILL_OPTIONS,
  type OrderListFilters,
} from './_components/OrderListFilters';
import { OrderListStatStrip } from './_components/OrderListStatStrip';
import { OrderRelativeTime } from './_components/OrderRelativeTime';
import styles from './_components/orders.module.scss';
import { DiaBadge, OrderStatusBadge } from './_components/OrderStatusBadge';
import { isOrderStatus, type OrderStatus } from './_components/status';

interface AdminOrder {
  id: string;
  orderNumber: string;
  status: string;
  totalMinor: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  diaSiparisKodu: string | null;
  createdAt: string;
  paidAt: string | null;
  _count: { items: number };
}

interface OrderListResponse {
  items: AdminOrder[];
  total: number;
  page: number;
  pageSize: number;
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
    q?: string;
    from?: string;
    to?: string;
    diaPending?: string;
  }>;
}

export const metadata = { title: 'Siparişler' };

const PAGE_SIZE = 25;

const buildHrefFor = (params: URLSearchParams): string => {
  const qs = params.toString();
  return qs ? `/orders?${qs}` : '/orders';
};

const matchesQuery = (order: AdminOrder, query: string): boolean => {
  if (!query) return true;
  const needle = query.toLocaleLowerCase('tr-TR');
  return (
    order.customerName.toLocaleLowerCase('tr-TR').includes(needle) ||
    order.customerEmail.toLocaleLowerCase('tr-TR').includes(needle) ||
    order.orderNumber.toLocaleLowerCase('tr-TR').includes(needle)
  );
};

const matchesDateRange = (order: AdminOrder, from: string, to: string): boolean => {
  if (!from && !to) return true;
  const created = order.createdAt.slice(0, 10);
  if (from && created < from) return false;
  if (to && created > to) return false;
  return true;
};

export default async function OrdersPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const requestedPage = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);

  const statusFilter: OrderStatus | 'all' = (() => {
    if (!sp.status || sp.status === 'all') return 'all';
    return isOrderStatus(sp.status) ? sp.status : 'all';
  })();

  const filters: OrderListFilters = {
    status: statusFilter,
    q: sp.q?.trim() ?? '',
    from: sp.from ?? '',
    to: sp.to ?? '',
    diaPending: sp.diaPending === '1',
  };

  const hasPostFilter = Boolean(filters.q || filters.from || filters.to || filters.diaPending);

  // Backend currently honours `status` only (and pagination). For the
  // post-filtered view we widen the fetch window to 100 (API max) and
  // do the additional filtering here. See the report for the gap.
  const apiQs = new URLSearchParams({
    page: hasPostFilter ? '1' : requestedPage.toString(),
    pageSize: hasPostFilter ? '100' : PAGE_SIZE.toString(),
  });
  if (filters.status !== 'all') apiQs.set('status', filters.status);

  const resp = await fetchAdmin<OrderListResponse>(`/admin/orders?${apiQs.toString()}`);
  if (resp === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  // Stat strip uses the same fetched window (newest-first; today's
  // orders are guaranteed at the top). When the window is the
  // full-page case we already have 100 items; when statusFilter is
  // narrow we still derive what we can.
  const nowMs = Date.now();
  const statSource = resp.items;
  const todayItems = statSource.filter((o) => isSameDayAs(o.createdAt, nowMs));
  const todayCount = todayItems.length;
  const todayRevenueMinor = todayItems.reduce((sum, o) => sum + o.totalMinor, 0);
  const paidUnfulfilledCount = statSource.filter(
    (o) => o.status === 'paid' || o.status === 'fulfilling',
  ).length;

  // Apply post-filters in-memory (within the fetched window).
  const filtered = resp.items.filter(
    (o) =>
      matchesQuery(o, filters.q) &&
      matchesDateRange(o, filters.from, filters.to) &&
      (!filters.diaPending || o.diaSiparisKodu === null),
  );

  const totalForPaging = hasPostFilter ? filtered.length : resp.total;
  const lastPage = Math.max(1, Math.ceil(totalForPaging / PAGE_SIZE));
  const page = Math.min(requestedPage, lastPage);
  const visible = hasPostFilter
    ? filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : resp.items;

  const buildHref = (p: number): string => {
    const next = new URLSearchParams();
    if (filters.status !== 'all') next.set('status', filters.status);
    if (filters.q) next.set('q', filters.q);
    if (filters.from) next.set('from', filters.from);
    if (filters.to) next.set('to', filters.to);
    if (filters.diaPending) next.set('diaPending', '1');
    next.set('page', p.toString());
    return buildHrefFor(next);
  };

  const statusPillHref = (key: OrderStatus | 'all'): string => {
    const next = new URLSearchParams();
    if (key !== 'all') next.set('status', key);
    if (filters.q) next.set('q', filters.q);
    if (filters.from) next.set('from', filters.from);
    if (filters.to) next.set('to', filters.to);
    if (filters.diaPending) next.set('diaPending', '1');
    return buildHrefFor(next);
  };

  return (
    <div className="my-account-content">
      <div className={styles.headerRowResponsive}>
        <div>
          <p className={styles.sectionEyebrow}>Akon Butik · Yönetim</p>
          <h2 className={styles.sectionTitle}>Siparişler</h2>
        </div>
        <span className="h6 text-main mb-0">
          {resp.total.toLocaleString('tr-TR')} kayıt
          {hasPostFilter && (
            <>
              {' '}
              · <em style={{ fontStyle: 'normal' }}>{filtered.length} eşleşme</em>
            </>
          )}
        </span>
      </div>

      <OrderListStatStrip
        todayCount={todayCount}
        todayRevenueMinor={todayRevenueMinor}
        paidUnfulfilledCount={paidUnfulfilledCount}
        windowHint={
          hasPostFilter ? 'son 100 sipariş üzerinden' : `son ${statSource.length.toString()} kayıt`
        }
      />

      <OrderListFiltersBar initial={filters} />

      <div className="account-order_tab mb-3">
        <ul className="tab-order_detail nav nav-pills flex-wrap gap-2 list-unstyled mb-0">
          {STATUS_PILL_OPTIONS.map((opt) => {
            const active = filters.status === opt.key;
            return (
              <li key={opt.key} className="nav-tab-item">
                <Link
                  href={statusPillHref(opt.key)}
                  className={`tf-btn-line tf-btn-tab${active ? ' active' : ''}`}
                >
                  <span className="h6">{opt.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {visible.length === 0 ? (
        <div className={styles.emptyEditorial}>
          <h6 className="fw-semibold">Henüz eşleşen sipariş yok.</h6>
          <p className="h6 mb-0">
            Filtreleri gevşetmeyi veya başka bir tarih aralığı denemeyi düşünebilirsiniz. Yeni
            siparişler geldiğinde burada belireceklerdir.
          </p>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className={`table-my_order order_recent ${styles.tableDense}`}>
            <thead>
              <tr>
                <th>Sipariş</th>
                <th>Müşteri</th>
                <th>Ürün</th>
                <th className={styles.num}>Tutar</th>
                <th>Durum</th>
                <th>DIA</th>
                <th>Yaş</th>
                <th aria-label="İşlem" />
              </tr>
            </thead>
            <tbody>
              {visible.map((o) => {
                const absLabel =
                  formatDateTime(o.createdAt) ?? new Date(o.createdAt).toLocaleString('tr-TR');
                const initialRel = formatRelative(o.createdAt, nowMs) ?? '—';
                return (
                  <tr key={o.id} className="tb-order-item">
                    <td>
                      <Link href={`/orders/${o.id}`} className={styles.code}>
                        {o.orderNumber}
                      </Link>
                    </td>
                    <td>
                      <div className={styles.customerStack}>
                        <span className={styles.stackName}>{o.customerName}</span>
                        <span className={styles.stackEmail}>{o.customerEmail}</span>
                      </div>
                    </td>
                    <td>
                      <span className="h6 text-main mb-0">{o._count.items} parça</span>
                    </td>
                    <td className={styles.num}>{formatTl(o.totalMinor)}</td>
                    <td>
                      <OrderStatusBadge status={o.status} />
                    </td>
                    <td>
                      <DiaBadge diaCode={o.diaSiparisKodu} />
                    </td>
                    <td>
                      <OrderRelativeTime
                        iso={o.createdAt}
                        initialLabel={initialRel}
                        absoluteLabel={absLabel}
                        className={styles.relTime}
                        absoluteClassName={styles.relAbs}
                      />
                    </td>
                    <td>
                      <Link
                        href={`/orders/${o.id}`}
                        className="link fw-semibold"
                        aria-label={`${o.orderNumber} detayını görüntüle`}
                      >
                        Detay
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {lastPage > 1 && (
        <div className="wd-full mt-3">
          <Pagination page={page} lastPage={lastPage} buildHref={buildHref} />
        </div>
      )}
    </div>
  );
}
