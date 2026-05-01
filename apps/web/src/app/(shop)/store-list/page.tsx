import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'Mağazalar' };

export default function StoresPage() {
  return (
    <StaticPage
      title="Mağazalarımız"
      lead="Akon Butik fiziksel satış noktası."
      breadcrumbs={[{ label: 'Mağazalar' }]}
    >
      <p>
        Sakarya Adapazarı&apos;nın merkezinde, Çark Caddesi&apos;nde tek bir butiğimiz bulunuyor.
        Online siparişleriniz de aynı mağazadan, aynı ekipten geçer.
      </p>

      <h2 className="h5 fw-bold mt-4 mb-2">Akon Butik · Çark Caddesi</h2>
      <p>
        Semerciler Mahallesi, Çark Caddesi No:13 D:101
        <br />
        54100 Adapazarı / Sakarya
        <br />
        Telefon:{' '}
        <a className="link" href="tel:+905335196988">
          +90 533 519 69 88
        </a>
        <br />
        E-posta:{' '}
        <a className="link" href="mailto:info@akonbutik.com">
          info@akonbutik.com
        </a>
      </p>

      <p>
        Mağaza ziyaretiniz öncesinde lütfen bizi arayın; size en uygun saati birlikte planlayalım.
        Yeni gelen kombinleri Instagram&apos;da{' '}
        <a
          className="link"
          href="https://www.instagram.com/akonbutik/"
          target="_blank"
          rel="noreferrer"
        >
          @akonbutik
        </a>{' '}
        üzerinden takip edebilirsiniz.
      </p>
    </StaticPage>
  );
}
