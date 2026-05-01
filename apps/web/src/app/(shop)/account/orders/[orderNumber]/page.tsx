import { OrderTimeline, Price, type OrderTimelineStep } from '@akonbutik/ui';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import {
  fetchAccount,
  NOT_AUTHENTICATED,
  type CustomerOrder,
  type OrderAddressSnapshot,
} from '../../../../../lib/account';

const STATUS_LABELS: Record<string, { label: string; tone: string }> = {
  pending: { label: 'Bekliyor', tone: 'bg-warning-subtle text-warning' },
  paid: { label: 'Ödendi', tone: 'bg-info-subtle text-info' },
  fulfilling: { label: 'Hazırlanıyor', tone: 'bg-primary-subtle text-primary' },
  shipped: { label: 'Kargoda', tone: 'bg-primary-subtle text-primary' },
  delivered: { label: 'Teslim Edildi', tone: 'bg-success-subtle text-success' },
  cancelled: { label: 'İptal', tone: 'bg-secondary-subtle text-secondary' },
  refunded: { label: 'İade', tone: 'bg-secondary-subtle text-secondary' },
  failed: { label: 'Başarısız', tone: 'bg-danger-subtle text-danger' },
};

const HAPPY_PATH = ['pending', 'paid', 'fulfilling', 'shipped', 'delivered'] as const;

interface OrderDetailPageProps {
  params: Promise<{ orderNumber: string }>;
}

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Build the OrderTimeline steps for the storefront customer view.
 * Cancelled / refunded paths short-circuit to a 2-step view ("Sipariş
 * Verildi" + "İptal/İade Edildi"). Happy path renders all five
 * canonical steps with completion derived from `status`'s position in
 * the chain.
 */
function buildTimeline(order: CustomerOrder): readonly OrderTimelineStep[] {
  if (order.status === 'cancelled') {
    return [
      {
        key: 'placed',
        title: 'Sipariş Verildi',
        date: formatDate(order.createdAt),
        completed: true,
        icon: 'icon-check-1',
      },
      {
        key: 'cancelled',
        title: 'Sipariş İptal Edildi',
        completed: true,
        icon: 'icon-close',
      },
    ];
  }
  if (order.status === 'refunded') {
    return [
      {
        key: 'placed',
        title: 'Sipariş Verildi',
        date: formatDate(order.createdAt),
        completed: true,
        icon: 'icon-check-1',
      },
      {
        key: 'refunded',
        title: 'Sipariş İade Edildi',
        completed: true,
        icon: 'icon-arrow-counter-clockwise',
      },
    ];
  }

  const idx = HAPPY_PATH.indexOf(order.status as (typeof HAPPY_PATH)[number]);
  const reachedIndex = idx === -1 ? 0 : idx;

  return [
    {
      key: 'placed',
      title: 'Sipariş Verildi',
      date: formatDate(order.createdAt),
      completed: reachedIndex >= 0,
      icon: 'icon-check-1',
    },
    {
      key: 'paid',
      title: 'Ödeme Alındı',
      date: formatDate(order.paidAt),
      completed: reachedIndex >= 1,
      icon: 'icon-credit-card',
    },
    {
      key: 'fulfilling',
      title: 'Hazırlanıyor',
      completed: reachedIndex >= 2,
      icon: 'icon-package',
    },
    {
      key: 'shipped',
      title: 'Kargoya Verildi',
      completed: reachedIndex >= 3,
      icon: 'icon-truck',
    },
    {
      key: 'delivered',
      title: 'Teslim Edildi',
      completed: reachedIndex >= 4,
      icon: 'icon-check-circle',
    },
  ];
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderNumber } = await params;
  const order = await fetchAccount<CustomerOrder | null>(`/customers/me/orders/${orderNumber}`);
  if (order === NOT_AUTHENTICATED) {
    redirect(`/login?next=/account/orders/${orderNumber}`);
  }
  if (!order) notFound();

  const status = STATUS_LABELS[order.status] ?? {
    label: order.status,
    tone: 'bg-secondary-subtle text-secondary',
  };
  const date = formatDate(order.createdAt);
  const timelineSteps = buildTimeline(order);

  return (
    <article className="account-order_detail">
      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-2">
        <div>
          <h1 className="h3 fw-bold mb-1">Sipariş #{order.orderNumber}</h1>
          <p className="text-main-2 small mb-0">{date}</p>
        </div>
        <div className="text-end">
          <span className={`badge ${status.tone} fs-6`}>{status.label}</span>
          {order.diaSiparisKodu && (
            <p className="text-main-2 small mb-0 mt-1">
              DIA Sipariş Kodu: <code>{order.diaSiparisKodu}</code>
            </p>
          )}
        </div>
      </div>

      <section className="account-order_track mb-4 p-4 rounded-3 border bg-white">
        <h2 className="h5 fw-bold mb-3">Sipariş Durumu</h2>
        <OrderTimeline steps={timelineSteps} />
      </section>

      <section className="mb-4">
        <h2 className="h5 fw-bold mb-3">Ürünler</h2>
        <div className="table-responsive">
          <table className="table-my_order w-100 align-middle">
            <thead>
              <tr>
                <th className="tb-order_product">Ürün</th>
                <th>Adet</th>
                <th>Birim</th>
                <th className="tb-order_price text-end">Tutar</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((line) => (
                <tr key={line.id} className="tb-order-item">
                  <td className="tb-order_product">
                    <div className="fw-semibold">{line.productNameSnap}</div>
                    <div className="small text-main-2">
                      {line.variantSku}
                      {line.size && ` · ${line.size}`}
                      {line.color && ` · ${line.color}`}
                    </div>
                  </td>
                  <td>×{line.quantity}</td>
                  <td>
                    <Price amount={{ amountMinor: line.unitPriceMinor, currency: 'TRY' }} />
                  </td>
                  <td className="tb-order_price text-end fw-semibold">
                    <Price amount={{ amountMinor: line.totalPriceMinor, currency: 'TRY' }} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3} className="text-end fw-normal">
                  Ara Toplam
                </th>
                <td className="text-end">
                  <Price amount={{ amountMinor: order.subtotalMinor, currency: 'TRY' }} />
                </td>
              </tr>
              <tr>
                <th colSpan={3} className="text-end fw-normal">
                  Kargo
                </th>
                <td className="text-end">
                  {order.shippingMinor === 0 ? (
                    <span className="text-success fw-semibold">Ücretsiz</span>
                  ) : (
                    <Price amount={{ amountMinor: order.shippingMinor, currency: 'TRY' }} />
                  )}
                </td>
              </tr>
              <tr>
                <th colSpan={3} className="text-end">
                  Toplam
                </th>
                <td className="text-end fw-bold">
                  <Price amount={{ amountMinor: order.totalMinor, currency: 'TRY' }} size="lg" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="row g-4 mb-4">
        <div className="col-md-6">
          <h2 className="h6 fw-bold mb-2">Fatura Adresi</h2>
          <AddressBlock address={order.billingAddress} />
        </div>
        <div className="col-md-6">
          <h2 className="h6 fw-bold mb-2">Teslimat Adresi</h2>
          <AddressBlock address={order.shippingAddress} />
        </div>
      </section>

      {order.notes && (
        <section className="mb-4">
          <h2 className="h6 fw-bold mb-2">Sipariş Notu</h2>
          <p className="text-main">{order.notes}</p>
        </section>
      )}

      <Link href="/account/orders" className="tf-btn style-line">
        <i className="icon icon-arrow-left me-2" /> Tüm Siparişler
      </Link>
    </article>
  );
}

function AddressBlock({ address }: { address: OrderAddressSnapshot }) {
  return (
    <address className="mb-0 small text-body bg-light rounded-3 p-3 border">
      <strong>{address.adSoyad}</strong>
      <br />
      {address.acikAdres}
      <br />
      {address.ilce} / {address.il} {address.postaKodu}
      <br />
      {address.telefon}
    </address>
  );
}
