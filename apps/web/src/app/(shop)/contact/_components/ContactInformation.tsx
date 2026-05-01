import Link from 'next/link';

/**
 * Address + contact block. Reuses the vendor `s-contact-information`
 * markup with TR-localised labels. Address, phone, and email come from
 * the brand's own contact page (see docs/brand-research.md). Opening
 * hours are intentionally omitted: the boutique does not publish them
 * publicly and we won't fabricate. Until they're supplied we surface
 * "Mağaza ziyareti için lütfen bizi arayın" on the visit-us card.
 */
export function ContactInformation() {
  const mapsHref =
    'https://www.google.com/maps/search/?api=1&query=Akon+Butik+%C3%87ark+Caddesi+Sakarya';

  return (
    <section className="s-contact-information flat-spacing">
      <div className="container">
        <div className="row d-flex align-items-start g-4">
          <div className="col-lg-6">
            {/* Static map image — the storefront CSP only allows iframes
                from *.iyzipay.com, so a Google Maps embed would be blocked.
                We render the section image as a stand-in and link out to
                the live map for routing. */}
            <div className="image position-relative" style={{ overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                width={820}
                height={755}
                alt="Akon Butik mağaza dış cephesi"
                src="/images/section/contact-information.jpg"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <p className="text-main-2 small mt-2 mb-0">
              <Link href={mapsHref} target="_blank" rel="noopener noreferrer" className="link">
                Yol Tarifi Al →
              </Link>
            </p>
          </div>

          <div className="col-lg-6">
            <div className="infor-content">
              <p className="title h2 fw-normal text-black mb-4">İletişim Bilgileri</p>
              <ul className="infor-store list-unstyled mb-0">
                <li className="mb-4">
                  <h2 className="caption h6 fw-semibold mb-2">Mağaza Adresimiz</h2>
                  <p className="mb-2" style={{ lineHeight: 1.6 }}>
                    Akon Butik
                    <br />
                    Semerciler Mah., Çark Cd. No:13 D:101
                    <br />
                    54100 Adapazarı / Sakarya
                  </p>
                  <Link
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tf-btn-line"
                  >
                    <span className="h6 text-capitalize fw-semibold">Yol Tarifi Al</span>
                    <i className="icon icon-arrow-top-right fs-20" />
                  </Link>
                </li>

                <li className="mb-4">
                  <h2 className="caption h6 fw-semibold mb-2">Bize Ulaşın</h2>
                  <ul className="store-contact list-unstyled mb-0">
                    <li className="d-flex align-items-center gap-2 mb-2">
                      <i className="icon icon-phone" />
                      <a href="tel:+905335196988" className="h6 link mb-0">
                        +90 533 519 69 88
                      </a>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <i className="icon icon-envelope-simple" />
                      <a href="mailto:info@akonbutik.com" className="h6 link mb-0">
                        info@akonbutik.com
                      </a>
                    </li>
                  </ul>
                </li>

                <li>
                  <h2 className="caption h6 fw-semibold mb-2">Mağaza Ziyareti</h2>
                  <p className="mb-0" style={{ lineHeight: 1.7 }}>
                    Çark Caddesi&apos;ndeki butiğimize uğramadan önce lütfen bizi arayın; size en
                    uygun saati birlikte planlayalım. Sorularınızı dilediğiniz zaman e-posta veya
                    Instagram&apos;dan da iletebilirsiniz.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
