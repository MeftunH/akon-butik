import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'Mağazalar' };

export default function StoresPage() {
  return (
    <StaticPage
      title="Mağazalarımız"
      lead="Akon Butik fiziksel satış noktaları."
      breadcrumbs={[{ label: 'Mağazalar' }]}
      draft
    >
      <p>
        Akon Butik şu anda yalnızca <strong>akonbutik.com</strong> üzerinden satış yapmaktadır.
        Fiziksel mağaza ağımız 2026 sonbaharında İstanbul&apos;da açılacak.
      </p>

      <p>
        Açılış duyurusunu kaçırmamak için bültenimize abone olabilir veya sosyal medya hesaplarımızı
        takip edebilirsiniz.
      </p>
    </StaticPage>
  );
}
