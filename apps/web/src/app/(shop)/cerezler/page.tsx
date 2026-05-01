// TODO: hukuki onay — çerez kategorileri ve süreleri yayın öncesi
// teknik ekiple birlikte gözden geçirilmelidir.

import { StaticPage } from '../_components/StaticPage';

export const metadata = {
  title: 'Çerez Politikası',
  description:
    'Akon Butik web sitesinde kullanılan çerezler, kullanım amaçları ve yönetim seçenekleri.',
};

export default function CookiesPage() {
  return (
    <StaticPage
      title="Çerez Politikası"
      lead="Akon Butik web sitesinde kullanılan çerezler, kullanım amaçları ve bu çerezleri nasıl yönetebileceğiniz."
      breadcrumbs={[{ label: 'Çerez Politikası' }]}
      draft
    >
      <h2 className="h5 fw-bold mt-5 mb-3">Çerez Nedir?</h2>
      <p>
        Çerezler, ziyaret ettiğiniz web sitelerinin tarayıcınızda saklamasına izin verdiği küçük
        metin dosyalarıdır. Oturumunuzu açık tutmak, sepetinizi hatırlamak, dil ve teslimat
        tercihlerinizi bir sonraki ziyaretinizde tekrar sormamak için kullanılırlar.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">Kullandığımız Çerez Türleri</h2>
      <ul>
        <li>
          <strong>Zorunlu çerezler.</strong> Oturum, sepet ve güvenlik doğrulaması için gereklidir.
          Sitenin düzgün çalışabilmesi için kapatılamaz.
        </li>
        <li>
          <strong>Tercih çerezleri.</strong> Dil, son baktığınız ürünler, favoriler gibi seçimleri
          hatırlar. Tarayıcı ayarlarınızdan kapatabilirsiniz.
        </li>
        <li>
          <strong>Performans ve istatistik çerezleri.</strong> Hangi sayfaların daha çok ziyaret
          edildiğini, hata oranlarını ve sayfa yüklenme süresini anonim olarak ölçer. Hiçbir kişisel
          tanımlayıcı içermez.
        </li>
        <li>
          <strong>Pazarlama çerezleri.</strong> Yalnızca açık rızanız ile etkinleştirilir; size daha
          alakalı kampanya ve ürün önerileri sunmamızı sağlar.
        </li>
      </ul>

      <h2 className="h5 fw-bold mt-5 mb-3">Çerez Süreleri</h2>
      <p>
        Oturum çerezleri tarayıcınızı kapattığınızda silinir. Kalıcı çerezler, kullanım amacına
        bağlı olarak bir oturumdan 12 aya kadar saklanabilir. İlgili sürelerin detayı, çerez yönetim
        panelinde her bir çerez için ayrıca belirtilmektedir.
      </p>

      <h2 className="h5 fw-bold mt-5 mb-3">Çerezleri Yönetme</h2>
      <p>
        Tarayıcınızın ayarlarından mevcut çerezleri silebilir, gelecekte hangi çerezleri kabul
        edeceğinizi belirleyebilirsiniz. Zorunlu çerezleri engellerseniz sepet, oturum ve ödeme
        akışları çalışmayabilir.
      </p>
      <ul>
        <li>Chrome: Ayarlar → Gizlilik ve güvenlik → Çerezler ve diğer site verileri</li>
        <li>Safari: Tercihler → Gizlilik → Çerezleri ve site verilerini yönet</li>
        <li>Firefox: Ayarlar → Gizlilik ve Güvenlik → Çerezler ve Site Verileri</li>
      </ul>

      <h2 className="h5 fw-bold mt-5 mb-3">İletişim</h2>
      <p>
        Çerez politikamız hakkında sorularınız için{' '}
        <a href="mailto:kvkk@akonbutik.com">kvkk@akonbutik.com</a> adresine yazabilirsiniz.
      </p>
    </StaticPage>
  );
}
