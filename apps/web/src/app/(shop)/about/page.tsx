import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'Hakkımızda' };

export default function AboutPage() {
  return (
    <StaticPage
      title="Hakkımızda"
      lead="Şıklığın butik adresi — Akon Butik'in hikayesi."
      breadcrumbs={[{ label: 'Hakkımızda' }]}
      draft
    >
      <p>
        Akon Butik, kadın giyiminde özenle seçilmiş kumaşları, modern kesimleri ve ulaşılabilir
        şıklığı bir araya getiren butik bir markadır. Her koleksiyon, günlük hayatın akışına uyum
        sağlayacak şekilde tasarlanır — ofiste, davette, sokakta sizin yanınızda.
      </p>
      <p>
        Markanın temelinde üç değer var: <strong>kalite</strong> — uzun ömürlü kumaşlar ve dikiş;{' '}
        <strong>zaman dışılık</strong> — moda akımlarına değil, kişisel stile yatırım;{' '}
        <strong>erişilebilirlik</strong>— abartısız fiyatlarla butik kalite.
      </p>
      <p>
        İstanbul merkezli stüdyomuzda her parça titizlikle planlanır, Türkiye&apos;de üretilir, ve
        bütün stoklarımızla doğrudan size ulaşır.
      </p>
    </StaticPage>
  );
}
