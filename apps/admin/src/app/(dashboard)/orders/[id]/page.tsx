import { OrderTimeline, type OrderTimelineStep } from '@akonbutik/ui';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../../lib/admin-fetch';

import { OrderTransitionPanel } from './OrderTransitionPanel';

interface OrderItem {
  id: string;
  productNameSnap: string;
  variantSku: string;
  size: string | null;
  color: string | null;
  unitPriceMinor: number;
  totalPriceMinor: number;
  quantity: number;
}

interface Payment {
  id: string;
  provider: string;
  status: string;
  amountMinor: number;
  createdAt: string;
}

interface Shipment {
  id: string;
  carrier: string | null;
  trackingNumber: string | null;
  status: string;
  shippedAt: string | null;
}

interface AuditEntry {
  id: string;
  action: string;
  payload: Record<string, unknown>;
  createdAt: string;
  adminUser: { id: string; name: string; email: string };
}

interface AddressSnap {
  adSoyad?: string;
  telefon?: string;
  il?: string;
  ilce?: string;
  acikAdres?: string;
  postaKodu?: string;
}

interface AdminOrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  subtotalMinor: number;
  shippingMinor: number;
  totalMinor: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  diaSiparisKodu: string | null;
  notes: string | null;
  createdAt: string;
  paidAt: string | null;
  cancelledAt: string | null;
  refundedAt: string | null;
  billingAddress: AddressSnap;
  shippingAddress: AddressSnap;
  items: OrderItem[];
  payments: Payment[];
  shipments: Shipment[];
  audit: AuditEntry[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: 'Sipariş Detayı' };

const STATUS_LABELS: Record<string, string> = {
  pending: 'Bekliyor',
  paid: 'Ödendi',
  fulfilling: 'Hazırlanıyor',
  shipped: 'Kargoda',
  delivered: 'Teslim Edildi',
  cancelled: 'İptal',
  refunded: 'İade',
};

const STATUS_CLASS: Record<string, string> = {
  pending: 'stt-pending',
  paid: 'stt-complete',
  fulfilling: 'stt-delivery',
  shipped: 'stt-delivery',
  delivered: 'stt-complete',
  cancelled: 'stt-cancel',
  refunded: 'stt-cancel',
};

const STATUS_ORDER: readonly string[] = ['pending', 'paid', 'fulfilling', 'shipped', 'delivered'];

const formatTl = (minor: number): string =>
  `₺${(minor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;

const formatDateTime = (iso: string | null | undefined): string | null =>
  iso ? new Date(iso).toLocaleString('tr-TR') : null;

/**
 * Builds the linear lifecycle timeline for an order using the canonical
 * pending → paid → fulfilling → shipped → delivered chain. Cancelled /
 * refunded short-circuit the chain — we surface those as a final step
 * with `cancel` icon.
 */
function buildTimeline(order: AdminOrderDetail): OrderTimelineStep[] {
  const currentIdx = STATUS_ORDER.indexOf(order.status);
  const steps: OrderTimelineStep[] = [
    {
      key: 'placed',
      title: 'Sipariş Oluşturuldu',
      date: formatDateTime(order.createdAt),
      completed: currentIdx >= 0,
      icon: 'icon-check-1',
    },
    {
      key: 'paid',
      title: 'Ödeme Alındı',
      date: formatDateTime(order.paidAt),
      completed: currentIdx >= STATUS_ORDER.indexOf('paid'),
      icon: 'icon-check-1',
    },
    {
      key: 'fulfilling',
      title: 'Hazırlanıyor',
      date: null,
      completed: currentIdx >= STATUS_ORDER.indexOf('fulfilling'),
      icon: 'icon-check-1',
    },
    {
      key: 'shipped',
      title: 'Kargoya Verildi',
      date:
        formatDateTime(order.shipments[0]?.shippedAt ?? null) ??
        (currentIdx >= STATUS_ORDER.indexOf('shipped') ? '—' : null),
      completed: currentIdx >= STATUS_ORDER.indexOf('shipped'),
      icon: 'icon-truck',
      details: order.shipments
        .filter((s) => s.trackingNumber)
        .map((s) => `Kargo: ${s.carrier ?? '—'} · Takip No: ${s.trackingNumber ?? '—'}`),
    },
    {
      key: 'delivered',
      title: 'Teslim Edildi',
      date: null,
      completed: currentIdx >= STATUS_ORDER.indexOf('delivered'),
      icon: 'icon-check-1',
    },
  ];

  if (order.status === 'cancelled') {
    steps.push({
      key: 'cancelled',
      title: 'İptal Edildi',
      date: formatDateTime(order.cancelledAt),
      completed: true,
      icon: 'icon-x',
    });
  } else if (order.status === 'refunded') {
    steps.push({
      key: 'refunded',
      title: 'İade Edildi',
      date: formatDateTime(order.refundedAt),
      completed: true,
      icon: 'icon-arrow-return',
    });
  }

  return steps;
}

function AddressBlock({ address }: { address: AddressSnap }) {
  if (!address.adSoyad) {
    return <p className="h6 text-main mb-0">Adres bilgisi yok.</p>;
  }
  return (
    <address className="h6 mb-0">
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

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await fetchAdmin<AdminOrderDetail | null>(`/admin/orders/${id}`);
  if (order === ADMIN_NOT_AUTHENTICATED) redirect('/login');
  if (!order) notFound();

  const timeline = buildTimeline(order);

  return (
    <div className="my-account-content flat-animate-tab">
      <nav aria-label="breadcrumb" className="mb-3 h6">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link href="/orders" className="text-decoration-none link">
              Siparişler
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {order.orderNumber}
          </li>
        </ol>
      </nav>

      <div className="account-order_detail">
        <div className="order-detail_image d-none d-md-block">
          <div className="dashboard-order-image-fallback">
            <i className="icon icon-package-thin" aria-hidden />
          </div>
        </div>
        <div className="order-detail_content tf-grid-layout">
          <div className="detail-content_info">
            <div
              className={`detail-info_status tb-order_status ${STATUS_CLASS[order.status] ?? 'stt-pending'}`}
            >
              {STATUS_LABELS[order.status] ?? order.status}
            </div>
            <div className="detail-info_prd">
              <p className="prd_name h4 text-black mb-1">Sipariş #{order.orderNumber}</p>
              <p className="h6 text-main mb-0">
                {order.items.length} ürün · {formatTl(order.totalMinor)}
              </p>
            </div>
            <div className="detail-info_item">
              <p className="info-item_label h6 text-main mb-1">Sipariş tarihi</p>
              <p className="info-item_value">{formatDateTime(order.createdAt)}</p>
            </div>
            <div className="detail-info_item">
              <p className="info-item_label h6 text-main mb-1">Müşteri</p>
              <p className="info-item_value">
                {order.customerName} · {order.customerEmail}
              </p>
            </div>
            {order.diaSiparisKodu && (
              <div className="detail-info_item">
                <p className="info-item_label h6 text-main mb-1">DIA</p>
                <p className="info-item_value">
                  <code>{order.diaSiparisKodu}</code>
                </p>
              </div>
            )}
          </div>
          <span className="br-line d-flex" />
          <div>
            <Link href="/orders" className="tf-btn style-line">
              Tüm Siparişler
              <i className="icon icon-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="account-order_tab">
            <ul className="tab-order_detail" role="tablist">
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#order-history"
                  data-bs-toggle="tab"
                  className="tf-btn-line tf-btn-tab active"
                >
                  <span className="h4">Sipariş Geçmişi</span>
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a href="#item-detail" data-bs-toggle="tab" className="tf-btn-line tf-btn-tab">
                  <span className="h4">Ürün Detayı</span>
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a href="#courier" data-bs-toggle="tab" className="tf-btn-line tf-btn-tab">
                  <span className="h4">Kargo</span>
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a href="#receiver" data-bs-toggle="tab" className="tf-btn-line tf-btn-tab">
                  <span className="h4">Alıcı</span>
                </a>
              </li>
            </ul>
            <div className="tab-content overflow-hidden">
              <div className="tab-pane active show" id="order-history" role="tabpanel">
                <OrderTimeline steps={timeline} />
              </div>

              <div className="tab-pane" id="item-detail" role="tabpanel">
                <div className="overflow-auto">
                  <table className="table-my_order">
                    <thead>
                      <tr>
                        <th>Ürün</th>
                        <th>Adet</th>
                        <th>Birim</th>
                        <th className="text-end">Tutar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((line) => (
                        <tr key={line.id} className="tb-order-item">
                          <td>
                            <div className="infor-prd">
                              <h6 className="prd_name mb-1">{line.productNameSnap}</h6>
                              <p className="prd_select text-small mb-0">
                                <span>{line.variantSku}</span>
                                {line.size && <span>Beden: {line.size}</span>}
                                {line.color && <span>Renk: {line.color}</span>}
                              </p>
                            </div>
                          </td>
                          <td className="h6">×{line.quantity}</td>
                          <td className="h6">{formatTl(line.unitPriceMinor)}</td>
                          <td className="text-end h6 fw-semibold">
                            {formatTl(line.totalPriceMinor)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={3} className="text-end fw-normal h6">
                          Ara Toplam
                        </th>
                        <td className="text-end h6">{formatTl(order.subtotalMinor)}</td>
                      </tr>
                      <tr>
                        <th colSpan={3} className="text-end fw-normal h6">
                          Kargo
                        </th>
                        <td className="text-end h6">
                          {order.shippingMinor === 0 ? (
                            <span className="text-success">Ücretsiz</span>
                          ) : (
                            formatTl(order.shippingMinor)
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th colSpan={3} className="text-end h6 fw-semibold">
                          Toplam
                        </th>
                        <td className="text-end h6 fw-bold">{formatTl(order.totalMinor)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="tab-pane" id="courier" role="tabpanel">
                {order.shipments.length === 0 ? (
                  <p className="h6 text-main">Henüz kargo bilgisi eklenmemiş.</p>
                ) : (
                  <div className="order-receiver">
                    {order.shipments.map((s) => (
                      <div key={s.id} className="recerver_text h6">
                        <span className="text">
                          {s.carrier ?? 'Kargo'} · {s.status}
                        </span>
                        <span className="text_info">
                          {s.trackingNumber ? <code>{s.trackingNumber}</code> : '—'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="tab-pane" id="receiver" role="tabpanel">
                <div className="row g-3">
                  <div className="col-md-6">
                    <h6 className="fw-semibold mb-2">Fatura Adresi</h6>
                    <AddressBlock address={order.billingAddress} />
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-semibold mb-2">Teslimat Adresi</h6>
                    <AddressBlock address={order.shippingAddress} />
                  </div>
                </div>
                {order.notes && (
                  <div className="mt-4">
                    <h6 className="fw-semibold mb-2">Sipariş Notu</h6>
                    <p className="h6 text-main mb-0">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="dashboard-card mt-4">
            <h3 className="account-title type-semibold h5 mb-3">Ödeme</h3>
            {order.payments.length === 0 ? (
              <p className="h6 text-main mb-0">Ödeme kaydı yok.</p>
            ) : (
              <ul className="list-unstyled mb-0">
                {order.payments.map((p) => (
                  <li
                    key={p.id}
                    className="d-flex justify-content-between align-items-center py-2 border-bottom"
                  >
                    <div>
                      <span className="h6 fw-semibold me-2">{p.provider}</span>
                      <span className="tb-order_status stt-info">{p.status}</span>
                    </div>
                    <span className="h6 fw-semibold">{formatTl(p.amountMinor)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="col-lg-4">
          <OrderTransitionPanel orderId={order.id} currentStatus={order.status} />

          <section className="dashboard-card mt-4">
            <h3 className="account-title type-semibold h5 mb-3">Geçmiş</h3>
            {order.audit.length === 0 ? (
              <p className="h6 text-main mb-0">Henüz işlem yok.</p>
            ) : (
              <ul className="audit-feed list-unstyled mb-0">
                {order.audit.map((entry) => {
                  const from = (entry.payload as { from?: string }).from;
                  const to = (entry.payload as { to?: string }).to;
                  const note = (entry.payload as { note?: string | null }).note;
                  return (
                    <li key={entry.id} className="audit-feed_item">
                      <div className="h6 fw-semibold">
                        {entry.action}: {from ?? '—'} → {to ?? '—'}
                      </div>
                      {note && <div className="h6 text-main">{note}</div>}
                      <div className="h6 text-main">
                        {entry.adminUser.name} · {new Date(entry.createdAt).toLocaleString('tr-TR')}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
