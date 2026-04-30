import Link from 'next/link';
import { redirect } from 'next/navigation';

import { api, ApiError } from '@/lib/api';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = {
  title: 'Ödeme onaylanıyor…',
  robots: { index: false, follow: false },
};

interface OrderSummaryResponse {
  id: string;
  orderNumber: string;
  status: string;
}

/**
 * Hit by the mock payment provider after redirect. Calls the backend mock
 * callback endpoint to mark the payment captured, then redirects to the
 * success page (or shows an error if the callback failed).
 */
export default async function CheckoutCallbackPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderId =
    typeof params['orderId'] === 'string' ? params['orderId'] : undefined;
  if (!orderId) {
    return (
      <main className="container py-5 text-center">
        <h1 className="h3 text-danger mb-3">Sipariş bulunamadı</h1>
        <p className="text-muted">URL geçerli bir sipariş içermiyor.</p>
        <Link href="/" className="btn btn-link">
          Ana Sayfa
        </Link>
      </main>
    );
  }

  try {
    const order = await api<OrderSummaryResponse>(
      `/checkout/callback/mock?orderId=${encodeURIComponent(orderId)}`,
      { method: 'POST', revalidate: 0 },
    );
    redirect(`/checkout/success?order=${encodeURIComponent(order.orderNumber)}`);
  } catch (err) {
    if (err instanceof ApiError) {
      return (
        <main className="container py-5 text-center">
          <h1 className="h3 text-danger mb-3">Ödeme onayı başarısız</h1>
          <p className="text-muted mb-4">Lütfen ekibimizle iletişime geçin.</p>
          <Link href="/" className="btn btn-primary">
            Ana Sayfa
          </Link>
        </main>
      );
    }
    throw err;
  }
}
