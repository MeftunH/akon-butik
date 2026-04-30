import { StaticPage } from '../_components/StaticPage';

export const metadata = { title: 'Çerez Politikası' };

export default function CookiesPage() {
  return (
    <StaticPage
      title="Çerez Politikası"
      lead="Akon Butik web sitesinde kullanılan çerezler hakkında bilgilendirme."
      breadcrumbs={[{ label: 'Çerez Politikası' }]}
      draft
    >
      <h2 className="h5 fw-bold mt-4">Çerez Nedir?</h2>
      <p>
        Çerezler (cookies), web sitelerinin tarayıcınızda sakladığı küçük metin dosyalarıdır. Site
        ziyaretinizi tanımak, tercihlerinizi hatırlamak ve oturumunuzu yönetmek için kullanılırlar.
      </p>

      <h2 className="h5 fw-bold mt-4">Kullandığımız Çerezler</h2>
      <ul>
        <li>
          <strong>Zorunlu çerezler</strong> (oturum, sepet) — site çalışması için gereklidir,
          kapatılamaz.
        </li>
        <li>
          <strong>Performans çerezleri</strong> — anonim ziyaret istatistiklerini toplar.
        </li>
        <li>
          <strong>Tercih çerezleri</strong> — dil tercihiniz, son baktığınız ürünler gibi bilgileri
          hatırlar.
        </li>
      </ul>

      <h2 className="h5 fw-bold mt-4">Çerezleri Yönetme</h2>
      <p>
        Tarayıcınızın ayarlarından mevcut çerezleri silebilir veya gelecekte kabul etmeyi
        reddedebilirsiniz. Zorunlu çerezleri engellerseniz site bazı işlevlerini kaybeder.
      </p>
    </StaticPage>
  );
}
