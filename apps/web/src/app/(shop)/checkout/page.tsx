import { CheckoutFlow } from './_components/CheckoutFlow';

export const metadata = {
  title: 'Ödeme',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
