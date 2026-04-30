import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'Sıkça Sorulan Sorular' };

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ: readonly FaqItem[] = [
  {
    question: 'Siparişim ne zaman elime ulaşır?',
    answer:
      'Siparişler genellikle 1-2 iş günü içinde kargoya verilir, teslimat şehrinize göre 1-3 iş günü sürer.',
  },
  {
    question: 'Kargo ücreti ne kadar?',
    answer:
      '450 TL ve üzeri alışverişlerde kargo ücretsizdir. Altındaki siparişlerde sabit 49,90 TL kargo ücreti uygulanır.',
  },
  {
    question: 'Ürün stokta yok ne yapmalıyım?',
    answer:
      'İlgili varyant kartında "Stokta yok" yazıyorsa o beden/renk şu an mevcut değil. Sosyal medyamızdan koleksiyon yenilenmelerini takip edebilirsiniz.',
  },
  {
    question: 'Ödeme seçenekleri nelerdir?',
    answer:
      'Kredi kartı (3D Secure) ile ödeme yapılabilir. Yakında havale/EFT seçeneği de eklenecek.',
  },
  {
    question: 'Faturam nasıl gelir?',
    answer:
      'Sipariş paketinizde basılı fatura yer alır. Aynı zamanda e-Arşiv faturanız e-postanıza otomatik gönderilir.',
  },
  {
    question: 'Hesap oluşturmadan alışveriş yapabilir miyim?',
    answer:
      'Evet, misafir olarak alışveriş tamamlayabilirsiniz. Ancak hesap açmanız sipariş takibi ve sonraki alışverişlerde adres yönetimi için kolaylık sağlar.',
  },
];

export default function FaqPage() {
  return (
    <StaticPage
      title="Sıkça Sorulan Sorular"
      lead="En sık aldığımız sorular ve cevapları."
      breadcrumbs={[{ label: 'SSS' }]}
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

      <p className="text-muted small mt-4">
        Aradığınızı bulamadıysanız <a href="/contact">iletişim sayfası</a> üzerinden bize ulaşın.
      </p>
    </StaticPage>
  );
}
