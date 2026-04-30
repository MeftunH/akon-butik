import { Price } from '@akonbutik/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { api, ApiError } from '@/lib/api';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

interface OrderSummaryResponse {
  id: string;
  orderNumber: string;
  status: string;
  totalMinor: number;
  itemCount: number;
  diaSiparisKodu: string | null;
}

export const metadata = {
  title: 'Siparişiniz alındı',
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderNumber = typeof params['order'] === 'string' ? params['order'] : undefined;
  if (!orderNumber) notFound();

  let order: OrderSummaryResponse;
  try {
    order = await api<OrderSummaryResponse>(`/checkout/orders/${orderNumber}`, {
      revalidate: 0,
    });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <main className="container py-5 text-center" style={{ maxWidth: 640 }}>
      <div className="rounded-circle bg-success-subtle d-inline-flex align-items-center justify-content-center mb-4"
        style={{ width: 80, height: 80 }}>
        <span style={{ fontSize: 40 }}>✓</span>
      </div>
      <h1 className="h2 fw-bold mb-2">Siparişiniz alındı!</h1>
      <p className="text-muted mb-4">
        Sipariş numaranız: <strong>{order.orderNumber}</strong>
      </p>

      <div className="border rounded p-4 mb-4 text-start">
        <div className="d-flex justify-content-between mb-2">
          <span>Toplam tutar</span>
          <Price amount={{ amountMinor: order.totalMinor, currency: 'TRY' }} size="lg" />
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Ürün sayısı</span>
          <span>{order.itemCount}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Durum</span>
          <span className="badge text-bg-success">Ödendi</span>
        </div>
        {order.diaSiparisKodu && (
          <div className="d-flex justify-content-between mt-2 small text-muted">
            <span>DIA Sipariş No</span>
            <span>{order.diaSiparisKodu}</span>
          </div>
        )}
      </div>

      <p className="text-muted small mb-4">
        Sipariş onayı e-postası gönderildi. Kargo takibinizi hesabınızdan veya{' '}
        <Link href="/track-order">Sipariş Takibi</Link> sayfasından izleyebilirsiniz.
      </p>

      <Link href="/" className="btn btn-primary">
        Alışverişe Devam Et
      </Link>
    </main>
  );
}
