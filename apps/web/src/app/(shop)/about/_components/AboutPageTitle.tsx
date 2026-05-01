import Link from 'next/link';

/**
 * Hero / page-title band for /about. Reuses the vendor `page-title-image`
 * markup so the existing SCSS bundle (s-page-title, page_image, ani-zoom)
 * styles it consistently with shop / login / register pages. Copy is
 * brand-led: a real two-line statement, not generic placeholder.
 */
export function AboutPageTitle() {
  return (
    <section className="page-title-image">
      <div className="page_image overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="lazyload ani-zoom"
          src="/images/section/about-us.jpg"
          alt="Akon Butik atölyesinden bir kare"
          width={2880}
          height={1350}
        />
      </div>
      <div className="page_content">
        <div className="container">
          <div className="content">
            <h1 className="heading fw-bold">
              SAKARYA&apos;NIN BUTİK ADRESİ.
              <br className="d-none d-sm-block" />
              ŞIKLIĞIN HAFTALIK HALİ.
            </h1>
            <Link href="/shop" className="tf-btn animate-btn">
              Mağazaya Göz At
              <i className="icon icon-caret-right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
