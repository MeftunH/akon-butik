// TODO: hukuki onay — sözleşme niteliğindeki bu metin yayın öncesi
// avukat tarafından gözden geçirilmelidir.

import { StaticPage } from '../_components/StaticPage';

export const metadata = {
  title: 'Kullanım Koşulları',
  description: 'akonbutik.com sitesini kullanırken geçerli koşullar ve üye yükümlülükleri.',
};

export default function TermsPage() {
  return (
    <StaticPage
      title="Kullanım Koşulları"
      lead="akonbutik.com sitesini kullanırken geçerli koşullar, hakların çerçevesi ve üyelik yükümlülükleri."
      breadcrumbs={[{ label: 'Kullanım Koşulları' }]}
      draft
    >
      <p>
        Bu siteyi kullanarak aşağıdaki koşulları kabul etmiş olursunuz. Koşullar, Türk hukukuna ve
        yürürlükteki Tüketicinin Korunması Hakkında Kanun, Mesafeli Sözleşmeler Yönetmeliği ile
        Elektronik Ticaretin Düzenlenmesi Hakkında Kanun hükümlerine göre yorumlanır.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">1. Hizmet Kapsamı</h2>
      <p>
        Akon Butik, akonbutik.com üzerinden hazır giyim ve aksesuar ürünlerinin satışını
        yapmaktadır. Ürün görsellerinde, ekran kalibrasyonu ve aydınlatma koşullarına bağlı olarak
        gerçek ürünle minör renk farkları görülebilir. Stok durumu, sipariş onaylanana kadar
        değişebilir.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">2. Üyelik</h2>
      <p>
        Üyelik, 18 yaşını doldurmuş ve hukuki ehliyeti tam olan gerçek kişiler için açıktır. Üyelik
        sırasında verdiğiniz bilgilerin doğru ve güncel olması zorunludur. Hesabınızın güvenliğinden
        siz sorumlusunuz; şifrenizi kimseyle paylaşmamanızı tavsiye ederiz.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">3. Sipariş ve Sözleşmenin Kurulması</h2>
      <p>
        Sipariş, ödemenin Akon Butik tarafından başarıyla tahsil edilmesi ve ürünün stokta bulunması
        koşuluyla onaylanır. Onay, sipariş özetinin e-posta ile gönderilmesiyle birlikte mesafeli
        satış sözleşmesini kurar. Stok hatası halinde ödemenizin tamamı, kullandığınız ödeme
        kanalına en geç 14 gün içinde iade edilir.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">4. Ödeme</h2>
      <p>
        Ödemeler iyzico altyapısı üzerinden, kredi kartı ile 3D Secure doğrulaması yapılarak alınır.
        Kart bilgileriniz Akon Butik sunucularında saklanmaz. Taksit seçenekleri, anlaşmalı bankalar
        ve geçerli kampanyalar dahilinde ödeme adımında gösterilir.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">5. Teslimat</h2>
      <p>
        Siparişler genellikle 1-2 iş günü içinde kargoya verilir; teslimat süresi anlaşmalı kargo
        firmasının taahhüdüne bağlıdır. Adresin yanlış veya eksik bildirilmesinden kaynaklanan
        gecikmelerden Akon Butik sorumlu tutulamaz.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">6. Cayma Hakkı, İade ve Değişim</h2>
      <p>
        Mesafeli Sözleşmeler Yönetmeliği uyarınca, ürünü teslim aldığınız tarihten itibaren 14 gün
        içinde herhangi bir gerekçe göstermeksizin cayma hakkını kullanabilirsiniz. Hijyen gereği iç
        giyim, mayo ve aksesuar ürünleri ile kişiye özel hazırlanan parçalar bu hakkın istisnasıdır.
        Detaylı koşullar için <a href="/iade-degisim">İade ve Değişim</a> sayfasını inceleyiniz.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">7. Fikri Mülkiyet</h2>
      <p>
        Site içeriği (ürün görselleri, kampanya metinleri, logo, marka adı) Akon Butik&apos;e
        aittir. İzinsiz kopyalanması, çoğaltılması veya ticari amaçla kullanılması yasaktır.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">8. Sorumluluk Sınırı</h2>
      <p>
        Site içeriğinin doğruluğu için azami özen gösterilmekle birlikte, Akon Butik teknik
        aksaklık, kesinti veya üçüncü taraf hizmetlerinden kaynaklanan dolaylı zararlardan sorumlu
        tutulamaz.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">9. Uyuşmazlıkların Çözümü</h2>
      <p>
        Bu sözleşmeden doğan uyuşmazlıklarda Tüketici Hakem Heyetleri ve Sakarya Mahkemeleri ile
        İcra Daireleri yetkilidir. Uyuşmazlık tutarı, ilgili yıl için Ticaret Bakanlığınca açıklanan
        parasal sınırlara göre değerlendirilir.
      </p>
    </StaticPage>
  );
}
