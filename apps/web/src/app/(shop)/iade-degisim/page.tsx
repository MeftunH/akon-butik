// TODO: hukuki onay — kargo bedeli ve süreçlerle ilgili tablolar
// operasyon ekibinin onayından sonra finalize edilecek.

import { StaticPage } from '../_components/StaticPage';

export const metadata = {
  title: 'İade ve Değişim',
  description:
    'Akon Butik iade ve değişim koşulları, süreler, kargo bedeli ve hesap üzerinden iade adımları.',
};

export default function ReturnsPage() {
  return (
    <StaticPage
      title="İade ve Değişim"
      lead="Sipariş ettiğiniz ürünleri teslim aldığınız günden itibaren 14 gün içinde, kullanılmamış ve etiketleri çıkarılmamış olarak iade edebilirsiniz."
      breadcrumbs={[{ label: 'İade ve Değişim' }]}
      draft
    >
      <h2 className="h5 fw-bold mt-5 mb-3">İade Koşulları</h2>
      <ul>
        <li>
          İade süresi <strong>teslim tarihinden itibaren 14 gündür.</strong>
        </li>
        <li>
          Ürün; etiketleri yerinde, ambalajı bozulmamış ve kullanılmamış halde, fatura aslı veya
          e-arşiv kopyası ile birlikte iade edilmelidir.
        </li>
        <li>
          Standart iadelerde kargo bedeli müşteriye aittir. Kusurlu, hasarlı veya sipariş edilenden
          farklı gelen ürünlerde kargo ücreti Akon Butik tarafından karşılanır.
        </li>
        <li>
          İç giyim, mayo, çorap, küpe ve kişiye özel hazırlanan ürünler hijyen ve özel üretim
          gerekçesiyle iade kapsamı dışındadır (Mesafeli Sözleşmeler Yönetmeliği m. 15).
        </li>
        <li>
          İndirimde alınan ürünler, kampanya koşulları kapsamında iade edilebilir; iade tutarı
          kampanyalı satış fiyatı üzerinden hesaplanır.
        </li>
      </ul>

      <h2 className="h5 fw-bold mt-5 mb-3">Değişim</h2>
      <p>
        Aynı ürünün farklı beden veya rengi ile değişim talebinde bulunabilirsiniz. Talebiniz, stok
        durumuna göre değerlendirilir; istediğiniz varyant stokta yoksa iade işlemi başlatılır ve
        ödemeniz aynı kanaldan iade edilir. Beden değişimi ilk kez yapılan siparişlerde, iade
        kargosu Akon Butik tarafından karşılanır.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">İade Süreci</h2>
      <ol>
        <li>
          <a href="/account/orders">Hesabım, Siparişlerim</a> sayfasından iade etmek istediğiniz
          siparişi açın.
        </li>
        <li>
          Siparişin altındaki &ldquo;İade Talebi Oluştur&rdquo; butonu ile başvuru formunu doldurun.
          İade nedenini seçmeniz, sürecin hızlanması açısından önemlidir.
        </li>
        <li>
          Anlaşmalı kargomuz, başvurunuzu takip eden 1-2 iş günü içinde adresinizden ürünü teslim
          alır. Misafir siparişlerinde, e-posta ile gönderilen iade kargo kodu kullanılarak teslim
          yapılır.
        </li>
        <li>
          Ürün stüdyomuza ulaşıp kontrol edildikten sonra, iade tutarı 7-14 iş günü içinde ödeme
          kanalınıza yatırılır. Kredi kartı iadelerinin hesap ekstrenize yansıma süresi bankaya göre
          değişir.
        </li>
      </ol>

      <h2 className="h5 fw-bold mt-5 mb-3">Cayma Hakkı</h2>
      <p>
        Mesafeli satışlarda, herhangi bir gerekçe göstermeksizin sözleşmeden cayma hakkınız bulunur.
        Cayma süresi, ürünü teslim aldığınız tarihten itibaren 14 gündür. Cayma bildirimini iletişim
        sayfasındaki form aracılığıyla ya da{' '}
        <a href="mailto:destek@akonbutik.com">destek@akonbutik.com</a> adresine yazarak
        yapabilirsiniz.
      </p>

      <p className="text-main-2 mt-5">
        <small>
          Sorularınız için <a href="mailto:destek@akonbutik.com">destek@akonbutik.com</a> ya da{' '}
          <a href="/contact">iletişim sayfası</a>.
        </small>
      </p>
    </StaticPage>
  );
}
