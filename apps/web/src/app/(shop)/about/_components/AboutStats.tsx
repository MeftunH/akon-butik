/**
 * "Bizi nereden bulursunuz" — asymmetric composition: a single bold
 * locality call-out on the left, three concise verifiable facts on the
 * right. Replaces the earlier numeric stats panel because we won't put
 * any stat on the storefront that wasn't sourced from real records.
 */
export function AboutStats() {
  return (
    <section className="s-about-stats flat-spacing">
      <div className="container">
        <div className="row g-4 align-items-end">
          <div className="col-12 col-lg-5">
            <p
              className="brand-name fw-medium mb-2"
              style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              Bizi Bulun
            </p>
            <p
              className="display-3 mb-1 fw-semibold"
              style={{
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#c8102e',
              }}
            >
              Çark Caddesi
            </p>
            <p className="h5 fw-normal mb-0 text-main-2">
              Sakarya, Adapazarı. Tek vitrin, tek adres.
            </p>
          </div>

          <div className="col-12 col-lg-7">
            <div className="row g-4">
              <div className="col-sm-4">
                <p className="h2 fw-semibold mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  No. 13
                </p>
                <p className="h6 fw-normal text-main-2 mb-0">
                  Çark Caddesi&apos;nde fiziki butiğimiz.
                </p>
              </div>
              <div className="col-sm-4">
                <p className="h2 fw-semibold mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  81
                </p>
                <p className="h6 fw-normal text-main-2 mb-0">ilin tamamına anlaşmalı kargo.</p>
              </div>
              <div className="col-sm-4">
                <p className="h2 fw-semibold mb-1">Haftalık</p>
                <p className="h6 fw-normal text-main-2 mb-0">
                  yeni kombin, Instagram&apos;da @akonbutik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
