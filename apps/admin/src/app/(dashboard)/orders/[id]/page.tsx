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

const STATUS_TONE: Record<string, string> = {
  pending: 'bg-warning-subtle text-warning',
  paid: 'bg-success-subtle text-success',
  fulfilling: 'bg-info-subtle text-info',
  shipped: 'bg-info-subtle text-info',
  delivered: 'bg-success-subtle text-success',
  cancelled: 'bg-secondary-subtle text-secondary',
  refunded: 'bg-secondary-subtle text-secondary',
};

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await fetchAdmin<AdminOrderDetail | null>(`/admin/orders/${id}`);
  if (order === ADMIN_NOT_AUTHENTICATED) redirect('/login');
  if (!order) notFound();

  const tl = (minor: number): string =>
    `₺${(minor / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;

  return (
    <article>
      <nav aria-label="breadcrumb" className="mb-3 small">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link href="/orders" className="text-muted text-decoration-none">
              Siparişler
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {order.orderNumber}
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-3">
        <div>
          <h1 className="h3 fw-bold mb-1">Sipariş {order.orderNumber}</h1>
          <p className="small text-muted mb-0">
            {new Date(order.createdAt).toLocaleString('tr-TR')}
          </p>
        </div>
        <div className="text-end">
          <span
            className={`badge fs-6 ${STATUS_TONE[order.status] ?? 'bg-secondary-subtle text-secondary'}`}
          >
            {order.status}
          </span>
          {order.diaSiparisKodu && (
            <p className="small text-muted mt-2 mb-0">
              DIA: <code>{order.diaSiparisKodu}</code>
            </p>
          )}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <section className="border rounded bg-white p-4 mb-4">
            <h2 className="h6 fw-bold mb-3">Ürünler</h2>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
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
                    <tr key={line.id}>
                      <td>
                        <div className="fw-semibold">{line.productNameSnap}</div>
                        <div className="small text-muted">
                          {line.variantSku}
                          {line.size && ` · ${line.size}`}
                          {line.color && ` · ${line.color}`}
                        </div>
                      </td>
                      <td>×{line.quantity}</td>
                      <td>{tl(line.unitPriceMinor)}</td>
                      <td className="text-end">{tl(line.totalPriceMinor)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3} className="text-end fw-normal">
                      Ara Toplam
                    </th>
                    <td className="text-end">{tl(order.subtotalMinor)}</td>
                  </tr>
                  <tr>
                    <th colSpan={3} className="text-end fw-normal">
                      Kargo
                    </th>
                    <td className="text-end">
                      {order.shippingMinor === 0 ? (
                        <span className="text-success">Ücretsiz</span>
                      ) : (
                        tl(order.shippingMinor)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th colSpan={3} className="text-end">
                      Toplam
                    </th>
                    <td className="text-end fw-bold">{tl(order.totalMinor)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          <section className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="border rounded bg-white p-4 h-100">
                <h2 className="h6 fw-bold mb-3">Müşteri</h2>
                <p className="mb-1">
                  <strong>{order.customerName}</strong>
                </p>
                <p className="small text-muted mb-1">{order.customerEmail}</p>
                <p className="small text-muted mb-0">{order.customerPhone}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border rounded bg-white p-4 h-100">
                <h2 className="h6 fw-bold mb-3">Ödeme</h2>
                {order.payments.length === 0 ? (
                  <p className="text-muted small mb-0">Ödeme kaydı yok.</p>
                ) : (
                  order.payments.map((p) => (
                    <div key={p.id} className="small">
                      <div>
                        <strong>{p.provider}</strong>{' '}
                        <span className="badge bg-secondary-subtle text-secondary">{p.status}</span>
                      </div>
                      <div className="text-muted">{tl(p.amountMinor)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="border rounded bg-white p-4 h-100">
                <h2 className="h6 fw-bold mb-3">Fatura Adresi</h2>
                <AddressBlock address={order.billingAddress} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="border rounded bg-white p-4 h-100">
                <h2 className="h6 fw-bold mb-3">Teslimat Adresi</h2>
                <AddressBlock address={order.shippingAddress} />
              </div>
            </div>
          </section>

          {order.notes && (
            <section className="border rounded bg-white p-4 mb-4">
              <h2 className="h6 fw-bold mb-2">Sipariş Notu</h2>
              <p className="small text-muted mb-0">{order.notes}</p>
            </section>
          )}
        </div>

        <div className="col-lg-4">
          <OrderTransitionPanel orderId={order.id} currentStatus={order.status} />

          <section className="border rounded bg-white p-4 mt-4">
            <h2 className="h6 fw-bold mb-3">Geçmiş</h2>
            {order.audit.length === 0 ? (
              <p className="small text-muted mb-0">Henüz işlem yok.</p>
            ) : (
              <ul className="list-unstyled small mb-0">
                {order.audit.map((entry) => {
                  const from = (entry.payload as { from?: string }).from;
                  const to = (entry.payload as { to?: string }).to;
                  const note = (entry.payload as { note?: string | null }).note;
                  return (
                    <li key={entry.id} className="border-start border-2 ps-3 mb-3">
                      <div className="fw-semibold">
                        {entry.action}: {from} → {to}
                      </div>
                      {note && <div className="text-muted">{note}</div>}
                      <div className="text-muted small">
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
    </article>
  );
}

function AddressBlock({ address }: { address: AddressSnap }) {
  if (!address.adSoyad) {
    return <p className="small text-muted mb-0">Adres bilgisi yok.</p>;
  }
  return (
    <address className="small mb-0">
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
