import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'Kullanım Koşulları' };

export default function TermsPage() {
  return (
    <StaticPage
      title="Kullanım Koşulları"
      lead="akonbutik.com sitesini kullanırken geçerli koşullar."
      breadcrumbs={[{ label: 'Kullanım Koşulları' }]}
      draft
    >
      <p>
        Bu siteyi kullanarak aşağıdaki koşulları kabul etmiş olursunuz. Bu koşullar Türk hukukuna
        göre yorumlanır. Bu sayfanın resmi metni hukuki onaydan sonra güncellenecek.
      </p>

      <h2 className="h5 fw-bold mt-4">1. Hizmet Kapsamı</h2>
      <p>
        Akon Butik, akonbutik.com üzerinden hazır giyim ürünleri satışı yapmaktadır. Ürün
        bilgilerinin doğruluğu için azami özen gösterilmekle birlikte, renk farklılıkları (ekran
        kalibrasyonu) ve stok güncellemesi gecikmeleri olabilmektedir.
      </p>

      <h2 className="h5 fw-bold mt-4">2. Üyelik</h2>
      <p>
        Üye olurken verdiğiniz bilgilerin doğruluğundan siz sorumlusunuz. Hesabınızın güvenliği için
        şifrenizi kimseyle paylaşmayın.
      </p>

      <h2 className="h5 fw-bold mt-4">3. Sipariş ve Ödeme</h2>
      <p>
        Sipariş onayı, ödemenin başarıyla alınması ve ürünün stokta bulunması koşuluna bağlıdır.
        Stok problemi durumunda ödemeniz derhal iade edilir.
      </p>

      <h2 className="h5 fw-bold mt-4">4. Fikri Mülkiyet</h2>
      <p>
        Site içeriği (görseller, metinler, logo) Akon Butik&apos;e aittir. İzinsiz kopyalanması veya
        kullanılması yasaktır.
      </p>

      <h2 className="h5 fw-bold mt-4">5. Uyuşmazlıklar</h2>
      <p>Bu sözleşmeden doğan uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.</p>
    </StaticPage>
  );
}
