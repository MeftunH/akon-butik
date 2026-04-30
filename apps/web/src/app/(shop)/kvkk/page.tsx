import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'KVKK Aydınlatma Metni' };

export default function KvkkPage() {
  return (
    <StaticPage
      title="KVKK Aydınlatma Metni"
      lead="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme."
      breadcrumbs={[{ label: 'KVKK' }]}
      draft
    >
      <h2 className="h5 fw-bold mt-4">1. Veri Sorumlusu</h2>
      <p>
        Akon Butik (bundan sonra &ldquo;Şirket&rdquo;), 6698 sayılı Kişisel Verilerin Korunması
        Kanunu (&ldquo;KVKK&rdquo;) uyarınca veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda
        açıklanan amaçlar doğrultusunda işlemektedir.
      </p>

      <h2 className="h5 fw-bold mt-4">2. İşlenen Kişisel Veri Kategorileri</h2>
      <ul>
        <li>Kimlik bilgileri (ad, soyad)</li>
        <li>İletişim bilgileri (e-posta, telefon, adres)</li>
        <li>Müşteri işlem bilgileri (sipariş, ödeme, teslimat)</li>
        <li>Pazarlama bilgileri (bülten aboneliği)</li>
        <li>İşlem güvenliği bilgileri (IP adresi, oturum verileri)</li>
      </ul>

      <h2 className="h5 fw-bold mt-4">3. İşleme Amaçları</h2>
      <ul>
        <li>Sipariş yönetimi ve teslimat</li>
        <li>Müşteri hizmetleri</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        <li>Pazarlama (rıza halinde)</li>
        <li>Site güvenliği</li>
      </ul>

      <h2 className="h5 fw-bold mt-4">4. Aktarım</h2>
      <p>
        Kişisel veriler, kargo firmaları, ödeme sağlayıcısı (iyzico) ve e-fatura entegratörü gibi
        hizmet sağlayıcılarımızla, sözleşmelerimiz çerçevesinde paylaşılır. Yurtdışına aktarım
        yapılmaz.
      </p>

      <h2 className="h5 fw-bold mt-4">5. Haklarınız</h2>
      <p>
        KVKK&apos;nın 11. maddesi uyarınca verilerinize erişme, düzeltme, silme, işlemeye itiraz
        etme haklarınız bulunmaktadır. Taleplerinizi{' '}
        <a href="mailto:kvkk@akonbutik.com">kvkk@akonbutik.com</a> adresine iletebilirsiniz.
      </p>

      <p className="text-muted small mt-4">
        Son güncelleme: bu metin yayınlandığında resmi tarih girilecek.
      </p>
    </StaticPage>
  );
}
