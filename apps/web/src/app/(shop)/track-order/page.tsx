import Link from 'next/link';

import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'Sipariş Takibi' };

export default function TrackOrderPage() {
  return (
    <StaticPage
      title="Sipariş Takibi"
      lead="Sipariş numaranız ve e-posta adresinizle siparişinizi takip edin."
      breadcrumbs={[{ label: 'Sipariş Takibi' }]}
    >
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="alert alert-info small" role="note">
            Hesabınız varsa siparişlerinizi doğrudan{' '}
            <Link href="/account/orders" className="alert-link">
              Hesabım → Siparişlerim
            </Link>{' '}
            sayfasından takip edebilirsiniz.
          </div>

          <p className="text-muted">
            Misafir sipariş takibi yakında bu sayfada olacak. Şu an için sipariş numaranızı bilen
            müşterilerimiz <a href="mailto:destek@akonbutik.com">destek@akonbutik.com</a> adresine
            yazarak güncel durumu öğrenebilir.
          </p>
        </div>
      </div>
    </StaticPage>
  );
}
