import { StaticPage } from '../_components/StaticPage';

export const metadata = {
  title: 'Sıkça Sorulan Sorular',
  description:
    'Kargo, iade, beden değişimi, ödeme seçenekleri ve KVKK ile ilgili sıkça sorulan sorular.',
};

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ: readonly FaqItem[] = [
  {
    question: 'Siparişim ne zaman elime ulaşır?',
    answer:
      'Hafta içi saat 14:00\u2019e kadar verilen siparişler aynı gün, sonrasındakiler bir sonraki iş günü kargoya verilir. Anlaşmalı kargo firmamız, Sakarya merkezimizden Türkiye genelinde 1-3 iş günü içinde teslimat yapmaktadır.',
  },
  {
    question: 'Kargo ücreti ne kadar?',
    answer:
      '450 TL ve üzeri tüm alışverişlerinizde kargo ücretsizdir. Bu tutarın altındaki siparişlerde sabit 49,90 TL kargo ücreti uygulanır. İade kargo bedeli, kusurlu ürünler dışında müşteriye aittir.',
  },
  {
    question: 'Bedenim olmazsa nasıl değişim yaparım?',
    answer:
      'Hesabım, Siparişlerim sayfasından ilgili siparişi açıp \u201Cİade Talebi Oluştur\u201D butonu ile beden değişimi talebinde bulunabilirsiniz. İlk değişim talebinde iade kargo bedeli Akon Butik tarafından karşılanır; istediğiniz beden stokta varsa yeni paketiniz 1-2 iş günü içinde hazırlanır.',
  },
  {
    question: 'İade süresi kaç gün?',
    answer: (
      <>
        Mesafeli Sözleşmeler Yönetmeliği uyarınca, ürünü teslim aldığınız tarihten itibaren 14 gün
        içinde herhangi bir gerekçe göstermeksizin iade edebilirsiniz. Detaylar için{' '}
        <a href="/iade-degisim">İade ve Değişim</a> sayfası.
      </>
    ),
  },
  {
    question: 'Kapıda ödeme var mı?',
    answer:
      'Şu an için kapıda ödeme seçeneği bulunmamaktadır. Tüm ödemeler iyzico altyapısı üzerinden, 3D Secure doğrulamalı kredi kartı ile alınmaktadır. Havale ve EFT seçeneği yakında ödeme adımına eklenecektir.',
  },
  {
    question: 'Taksit yapabilir miyim?',
    answer:
      'Anlaşmalı banka kredi kartlarına 2-9 ay arası taksit imkânı sunulmaktadır. Geçerli taksit seçenekleri ve kampanyalı bankalar, ödeme adımında kart bilgilerinizi girdiğinizde otomatik olarak görüntülenir.',
  },
  {
    question: 'Faturam nasıl gelir?',
    answer:
      'Sipariş paketinizin içinde basılı fatura yer alır. Aynı zamanda e-Arşiv kopyanız, sipariş onay e-postası ile birlikte e-posta adresinize iletilir. Kurumsal fatura talep ediyorsanız, sipariş notu alanına vergi dairesi ve numarasını yazmanız yeterlidir.',
  },
  {
    question: 'Hesap oluşturmadan alışveriş yapabilir miyim?',
    answer:
      'Evet, misafir olarak alışveriş tamamlayabilirsiniz. Hesap açmanız, sipariş takibi, iade başvurusu ve adres yönetimi açısından kolaylık sağlar; ileride yapacağınız alışverişlerde tekrar bilgi girmeniz gerekmez.',
  },
  {
    question: 'Kişisel verilerimi nasıl koruyorsunuz?',
    answer: (
      <>
        Akon Butik, 6698 sayılı KVKK kapsamında veri sorumlusu sıfatıyla kişisel verilerinizi
        yalnızca sipariş, iletişim ve yasal yükümlülükler için işler. Detaylı bilgiler için{' '}
        <a href="/kvkk">KVKK Aydınlatma Metni</a> ve <a href="/cerezler">Çerez Politikası</a>{' '}
        sayfalarımız.
      </>
    ),
  },
  {
    question: 'Hesabımı nasıl silebilirim?',
    answer: (
      <>
        Hesabınızı silmek için <a href="mailto:kvkk@akonbutik.com">kvkk@akonbutik.com</a> adresine
        kayıtlı e-posta adresinizden bir talep göndermeniz yeterlidir. Talebiniz en geç 30 gün
        içinde sonuçlandırılır; mali ve hukuki yükümlülükler nedeniyle saklanması zorunlu sipariş
        kayıtları, ilgili mevzuatın öngördüğü süre boyunca arşivde tutulur.
      </>
    ),
  },
  {
    question: 'Ürün stokta yoksa ne yapabilirim?',
    answer:
      'Tükendi etiketi gördüğünüz varyant şu an mevcut değil. Yenilenme bildirimi için ürün sayfasındaki bülten kutusunu kullanabilir, Instagram hesabımızdan koleksiyon güncellemelerini takip edebilirsiniz.',
  },
];

export default function FaqPage() {
  return (
    <StaticPage
      title="Sıkça Sorulan Sorular"
      lead="Kargo, iade, beden değişimi, ödeme seçenekleri ve hesap yönetimi ile ilgili en sık aldığımız soruların yanıtları."
      breadcrumbs={[{ label: 'Sıkça Sorulan Sorular' }]}
    >
      <div className="accordion" id="faqAccordion">
        {FAQ.map((item, i) => (
          <div className="accordion-item mb-2" key={item.question}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${i === 0 ? '' : 'collapsed'}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faq-${i.toString()}`}
                aria-expanded={i === 0}
                aria-controls={`faq-${i.toString()}`}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`faq-${i.toString()}`}
              className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-main-2 mt-5">
        <small>
          Aradığınız yanıtı bulamadıysanız, <a href="/contact">iletişim sayfası</a> üzerinden bize
          yazabilir, hafta içi 09:00 ile 18:00 arasında WhatsApp destek hattımızdan hızlı yanıt
          alabilirsiniz.
        </small>
      </p>
    </StaticPage>
  );
}
