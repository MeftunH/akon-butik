import Link from 'next/link';

/**
 * Footer CTA banner. Single sentence, single action — drives the visitor
 * straight to /shop. Uses the brand-red `tf-btn` button so it sits in the
 * existing storefront button family without bespoke colour rules.
 */
export function AboutCta() {
  return (
    <section className="s-about-cta flat-spacing-2">
      <div className="container">
        <div
          className="text-center"
          style={{
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            padding: '64px 16px',
          }}
        >
          <p className="fw-medium mb-2 text-main-2" style={ABOUT_EYEBROW_STYLE}>
            Yeni Sezon
          </p>
          <h2 className="h3 fw-normal mb-3">Yeni sezon vitrinde.</h2>
          <p className="h6 fw-normal text-main-2 mb-4">
            Bu hafta atölyeden çıkan parçaları görmek için mağazaya göz atın.
          </p>
          <Link href="/shop" className="tf-btn animate-btn">
            Mağazaya Göz At
            <i className="icon icon-caret-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const ABOUT_EYEBROW_STYLE: React.CSSProperties = {
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontSize: 12,
  lineHeight: 1.4,
};
