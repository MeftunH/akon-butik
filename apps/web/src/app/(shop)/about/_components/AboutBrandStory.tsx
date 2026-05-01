/**
 * "Markamız" — origin + values. Reuses the vendor `s-about` grid so the
 * left-image + right-text rhythm matches the rest of the storefront.
 * Copy is original Turkish prose, written for a small family-run boutique
 * voice: warm, precise, never glossy.
 */
export function AboutBrandStory() {
  return (
    <section className="s-about flat-spacing">
      <div className="container">
        <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
          <div className="item_2 image d-none d-md-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lazyload"
              src="/images/gallery/about-2.jpg"
              alt="Akon Butik koleksiyonundan bir parça"
              width={696}
              height={710}
            />
          </div>
          <div className="wd-2-cols">
            <div className="content-blog text-md-start">
              <div className="box-intro">
                <p
                  className="brand-name fw-medium"
                  style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  Markamız
                </p>
                <h2 className="slogan h3 fw-normal">
                  Sakarya&apos;nın kalbinde, kadın giyimine adanmış bir butik.
                </h2>
                <p className="intro-text">
                  Akon Butik, Sakarya Adapazarı&apos;nın merkezindeki Çark Caddesi&apos;nde 13
                  numaralı butiğimizden Türkiye&apos;nin dört bir yanına kombin ulaştıran bir kadın
                  giyim markasıdır. Şık ve günlük parçaları, modaya değil kişisel stile yarayacak
                  şekilde bir araya getiriyoruz.
                </p>
                <p className="intro-text">
                  Tek bir vitrinden, tek bir adresten. Her hafta yeni gelen kombinleri Instagram
                  hesabımız <span className="fw-medium">@akonbutik</span> üzerinden ilk biz
                  paylaşırız; mağazamıza gelen müşterilerimizle yüz yüze sohbet etmeyi, bedeni
                  birlikte denemeyi seviyoruz. Akon Butik bir aile butiğidir, hızlı moda değil.
                </p>
              </div>
            </div>
          </div>
          <div className="item_1 image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lazyload"
              src="/images/gallery/about-1.jpg"
              alt="Atölye dikim masası"
              width={696}
              height={710}
            />
          </div>
          <div className="d-md-none d-xl-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lazyload d-md-none"
              src="/images/gallery/about-2.jpg"
              alt="Akon Butik koleksiyonundan bir parça"
              width={696}
              height={710}
            />
          </div>
          <div className="item_3 image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lazyload"
              src="/images/gallery/about-3.jpg"
              alt="Vitrinden bir kare"
              width={696}
              height={710}
            />
          </div>
          <div className="item_4 image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="lazyload"
              src="/images/gallery/about-4.jpg"
              alt="Sezon parçaları"
              width={696}
              height={710}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
