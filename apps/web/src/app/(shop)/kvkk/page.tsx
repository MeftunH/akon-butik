// TODO: hukuki onay — bu metin geçici bir taslaktır. Yayına çıkmadan
// önce avukat / KVKK danışmanı tarafından gözden geçirilmelidir.

import { StaticPage } from '../_components/StaticPage';

export const metadata = {
  title: 'KVKK Aydınlatma Metni',
  description:
    'Akon Butik olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metnimiz.',
};

export default function KvkkPage() {
  return (
    <StaticPage
      title="KVKK Aydınlatma Metni"
      lead="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, müşterilerimizin kişisel verilerini nasıl işlediğimize dair açıklamalar."
      breadcrumbs={[{ label: 'KVKK Aydınlatma' }]}
      draft
    >
      <h2 className="h5 fw-bold mt-5 mb-3">1. Veri Sorumlusu</h2>
      <p>
        Akon Butik (bu metinde &ldquo;Şirket&rdquo;), 6698 sayılı Kişisel Verilerin Korunması Kanunu
        (&ldquo;KVKK&rdquo;) kapsamında veri sorumlusu sıfatıyla, web sitesi ziyaretçilerinin ve
        müşterilerinin kişisel verilerini aşağıda açıklanan amaçlar doğrultusunda, hukuka ve
        dürüstlük kurallarına uygun olarak işlemektedir.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">2. İşlenen Kişisel Veri Kategorileri</h2>
      <ul>
        <li>
          <strong>Kimlik bilgileri:</strong> ad, soyad.
        </li>
        <li>
          <strong>İletişim bilgileri:</strong> e-posta adresi, cep telefonu, teslimat ve fatura
          adresi.
        </li>
        <li>
          <strong>Müşteri işlem bilgileri:</strong> sipariş geçmişi, ödeme tutarı, teslimat tarihi,
          iade ve değişim talepleri.
        </li>
        <li>
          <strong>Pazarlama bilgileri:</strong> bülten aboneliği, alışveriş tercihleri, favoriler.
        </li>
        <li>
          <strong>İşlem güvenliği bilgileri:</strong> IP adresi, oturum kimliği, tarayıcı tipi,
          erişim kayıtları.
        </li>
      </ul>

      <h2 className="h5 fw-bold mt-5 mb-3">3. İşleme Amaçları ve Hukuki Sebepleri</h2>
      <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
      <ul>
        <li>
          Sipariş yönetimi, ödemenin alınması, ürünün hazırlanması ve teslimat sürecinin yürütülmesi
          (KVKK m. 5/2-c, sözleşmenin kurulması ve ifası).
        </li>
        <li>Müşteri hizmetleri, iade ve değişim taleplerinin sonuçlandırılması (KVKK m. 5/2-c).</li>
        <li>
          Vergi, ticaret ve elektronik ticaret mevzuatından kaynaklanan saklama, fatura ve bilgi
          verme yükümlülüklerinin yerine getirilmesi (KVKK m. 5/2-ç).
        </li>
        <li>
          Yeni koleksiyon, kampanya ve fırsatlardan haberdar etmek amacıyla pazarlama iletişimi
          (yalnızca açık rıza alındığında, KVKK m. 5/1).
        </li>
        <li>
          Dolandırıcılık önleme, site güvenliği ve hukuki taleplere karşı savunma hakkı (KVKK m.
          5/2-e ve f).
        </li>
      </ul>

      <h2 className="h5 fw-bold mt-5 mb-3">4. Aktarım</h2>
      <p>
        Kişisel verileriniz, hizmetin yürütülmesi için zorunlu olduğu ölçüde aşağıdaki üçüncü
        taraflarla paylaşılmaktadır: anlaşmalı kargo firmaları (teslimat adresi ve iletişim
        bilgisi), ödeme kuruluşu iyzico (kart sahibi adı ve sipariş tutarı; kart numarası Şirkete
        iletilmez), e-fatura ve e-arşiv entegratörü (kimlik ve fatura bilgileri), yetkili kamu
        kurumları (yasal talep halinde). Yurtdışına veri aktarımı yapılmamaktadır.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">5. Saklama Süresi</h2>
      <p>
        Kişisel verileriniz; ticaret hukuku, vergi mevzuatı ve KVKK çerçevesinde belirlenen yasal
        saklama süreleri boyunca tutulur. Pazarlama amaçlı işlenen veriler, rıza geri alınana kadar
        muhafaza edilir.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">6. Haklarınız</h2>
      <p>
        KVKK&apos;nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme,
        işlenmişse buna ilişkin bilgi talep etme, işleme amacını ve amacına uygun kullanılıp
        kullanılmadığını sorgulama, eksik veya yanlış işlenmiş veriyi düzelttirme, kanunda öngörülen
        koşullarda silinmesini ya da yok edilmesini isteme, otomatik sistemlerle yapılan analizler
        sonucu aleyhinize bir sonuç ortaya çıkmışsa buna itiraz etme haklarına sahipsiniz.
      </p>
      <p>
        Taleplerinizi <a href="mailto:kvkk@akonbutik.com">kvkk@akonbutik.com</a> adresine
        iletebilirsiniz. Şirket başvurunuzu en geç 30 gün içerisinde sonuçlandıracaktır.
      </p>

      <p className="text-main-2 mt-5">
        <small>Son güncelleme: bu metin yayınlandığında resmi tarih girilecektir.</small>
      </p>
    </StaticPage>
  );
}
