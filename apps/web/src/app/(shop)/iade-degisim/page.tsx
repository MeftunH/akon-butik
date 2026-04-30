import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'İade ve Değişim' };

export default function ReturnsPage() {
  return (
    <StaticPage
      title="İade ve Değişim"
      lead="Sipariş ettiğiniz ürünleri 14 gün içinde iade edebilirsiniz."
      breadcrumbs={[{ label: 'İade ve Değişim' }]}
      draft
    >
      <h2 className="h5 fw-bold mt-4">İade Koşulları</h2>
      <ul>
        <li>
          İade süresi <strong>teslim tarihinden itibaren 14 gün</strong>.
        </li>
        <li>
          Ürün; etiketleri, ambalajı ve fatura aslı ile birlikte kullanılmamış halde olmalıdır.
        </li>
        <li>
          İade kargo bedeli müşteriye aittir. Kusurlu ürünlerde Akon Butik kargo bedelini karşılar.
        </li>
        <li>
          İç giyim, çorap ve aksesuar ürünleri hijyen nedeniyle iade edilemez (mevzuat gereği).
        </li>
      </ul>

      <h2 className="h5 fw-bold mt-4">Değişim</h2>
      <p>
        Aynı ürünün farklı beden veya rengi ile değişim talep edebilirsiniz. Stokta olmayan ürünler
        için iade işlemi yapılır, tutar ödeme kanalınıza geri iade edilir.
      </p>

      <h2 className="h5 fw-bold mt-4">İade Süreci</h2>
      <ol>
        <li>
          <a href="/account/orders">Hesabım → Siparişlerim</a> sayfasından ilgili siparişi açın.
        </li>
        <li>&ldquo;İade Talebi Oluştur&rdquo; butonu ile başvuruyu gönderin.</li>
        <li>Anlaşmalı kargomuz 1-2 iş günü içinde adresinizden ürünü teslim alır.</li>
        <li>
          Ürün stüdyomuza ulaşıp kontrol edildikten sonra iade tutarı 7-14 iş günü içinde ödeme
          kanalınıza yatar.
        </li>
      </ol>

      <p className="text-muted small mt-4">
        Sorularınız için <a href="mailto:destek@akonbutik.com">destek@akonbutik.com</a>.
      </p>
    </StaticPage>
  );
}
