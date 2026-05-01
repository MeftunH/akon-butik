import type { CustomerOrderSummary } from '../../../../lib/account';

const PENDING_STATUSES = new Set(['pending', 'paid', 'fulfilling']);
const COMPLETED_STATUSES = new Set(['delivered']);

interface AccountStatsProps {
  orders: readonly CustomerOrderSummary[];
}

/**
 * Vendor `dashboard/MyAccount.tsx` stat strip — three `order-box` cards
 * showing the customer's pending / completed / total order counts.
 *
 * Vendor wraps these in a Swiper carousel; we render a flexbox 3-col
 * (mobile-first) instead because three cards don't justify the Swiper
 * runtime overhead. If we ever ship more than three categories (e.g.,
 * 'iade', 'iptal'), we'll lift this back to the Swiper pattern.
 */
export function AccountStats({ orders }: AccountStatsProps) {
  const pending = orders.filter((o) => PENDING_STATUSES.has(o.status)).length;
  const completed = orders.filter((o) => COMPLETED_STATUSES.has(o.status)).length;
  const total = orders.length;

  const cards = [
    { label: 'Bekleyen Siparişler', count: pending, icon: 'icon-clock-cd' },
    { label: 'Tamamlanan', count: completed, icon: 'icon-check-circle' },
    { label: 'Toplam Sipariş', count: total, icon: 'icon-shopping-cart-simple' },
  ];

  return (
    <div className="acount-order_stats row g-3 mb-4">
      {cards.map((card) => (
        <div key={card.label} className="col-md-4">
          <div className="order-box d-flex align-items-center gap-3 bg-white rounded-3 p-4 border">
            <span
              className="order_icon d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary"
              style={{ width: 56, height: 56 }}
            >
              <i className={`icon ${card.icon} fs-4`} />
            </span>
            <div className="order_info">
              <p className="info_label h6 text-main-2 mb-1">{card.label}</p>
              <p className="info_count type-semibold h3 fw-bold mb-0">{card.count.toString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
