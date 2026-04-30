import { Price } from '@akonbutik/ui';
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
  paid: { label: 'Ödendi', tone: 'bg-success-subtle text-success' },
  shipped: { label: 'Kargoda', tone: 'bg-info-subtle text-info' },
  delivered: { label: 'Teslim Edildi', tone: 'bg-success-subtle text-success' },
  cancelled: { label: 'İptal', tone: 'bg-secondary-subtle text-secondary' },
  failed: { label: 'Başarısız', tone: 'bg-danger-subtle text-danger' },
};

interface OrderDetailPageProps {
  params: Promise<{ orderNumber: string }>;
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
  const date = new Date(order.createdAt).toLocaleString('tr-TR');

  return (
    <article>
      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-2">
        <div>
          <h1 className="h3 fw-bold mb-1">Sipariş #{order.orderNumber}</h1>
          <p className="text-muted small mb-0">{date}</p>
        </div>
        <div className="text-end">
          <span className={`badge ${status.tone} fs-6`}>{status.label}</span>
          {order.diaSiparisKodu && (
            <p className="text-muted small mb-0 mt-1">
              DIA: <code>{order.diaSiparisKodu}</code>
            </p>
          )}
        </div>
      </div>

      <section className="mb-4">
        <h2 className="h6 fw-bold mb-3">Ürünler</h2>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Ürün</th>
                <th scope="col">Adet</th>
                <th scope="col">Birim</th>
                <th scope="col">Tutar</th>
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
                  <td>
                    <Price amount={{ amountMinor: line.unitPriceMinor, currency: 'TRY' }} />
                  </td>
                  <td>
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
                <td>
                  <Price amount={{ amountMinor: order.subtotalMinor, currency: 'TRY' }} />
                </td>
              </tr>
              <tr>
                <th colSpan={3} className="text-end fw-normal">
                  Kargo
                </th>
                <td>
                  {order.shippingMinor === 0 ? (
                    <span className="text-success">Ücretsiz</span>
                  ) : (
                    <Price amount={{ amountMinor: order.shippingMinor, currency: 'TRY' }} />
                  )}
                </td>
              </tr>
              <tr>
                <th colSpan={3} className="text-end">
                  Toplam
                </th>
                <td className="fw-bold">
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
          <p className="text-muted">{order.notes}</p>
        </section>
      )}

      <Link href="/account/orders" className="btn btn-link px-0">
        ← Tüm Siparişler
      </Link>
    </article>
  );
}

function AddressBlock({ address }: { address: OrderAddressSnapshot }) {
  return (
    <address className="mb-0 small text-body">
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
