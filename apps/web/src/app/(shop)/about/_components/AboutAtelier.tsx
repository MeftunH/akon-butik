/**
 * "Atölyemiz" — production / craft block. Three pillars laid out as a
 * three-column tf-grid-layout with concise paragraphs (no icons, no
 * marketing chrome) so the section reads like a brand mission statement
 * rather than a feature grid.
 */
export function AboutAtelier() {
  const pillars: readonly { title: string; body: string }[] = [
    {
      title: 'Haftalık kombin',
      body: 'Her hafta seçtiğimiz kombinleri Instagram’da @akonbutik üzerinden ilk biz paylaşırız. Sezon değil, hafta hızıyla geliyoruz; bir parça stoktan çıktıysa o parça gerçekten gitti demektir.',
    },
    {
      title: 'Yerinde seçim',
      body: 'Sakarya Çark Caddesi’ndeki vitrinimize giren her parçayı bizzat seçer, dokunur, dener. Kumaş tutuşunu, dikiş kalitesini, dökümünü görmeden rafa koymayız.',
    },
    {
      title: 'Tek tek elden geçer',
      body: 'Online siparişe çıkan her parça paketlenmeden önce ekibimizden bir kişi tarafından bir kez daha kontrol edilir. Sökük, leke veya beden uyuşmazlığı varsa kargoya vermeyiz.',
    },
  ];

  return (
    <section className="s-about-us flat-spacing-2">
      <div className="container">
        <div className="sect-title text-center mb-5">
          <p
            className="brand-name fw-medium mb-2"
            style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            Çalışma Şeklimiz
          </p>
          <h2 className="s-title h2 fw-normal mb-3">
            Vitrini gören, kombini seçen, müşteriyle yüz yüze konuşan bir butik.
          </h2>
          <p className="s-subtitle h6 text-main-2 mb-0">
            Hızlı moda değil; haftalık ritimle, bir vitrin ve küçük bir ekiple çalışan bir butik.
          </p>
        </div>

        <div className="tf-grid-layout tf-col-2 md-col-3 gap-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="atelier-pillar">
              <h3 className="h5 fw-semibold mb-2">{pillar.title}</h3>
              <p className="text-main-2 mb-0" style={{ lineHeight: 1.65 }}>
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
