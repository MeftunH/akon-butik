import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
export default function BeforeAfterSlider() {
  return (
    <section>
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="s-title mb-8">
            Before And After Using Natural Products
          </h1>
          <p className="s-subtitle h6">
            Skin transformation after 2 weeks of using our products
          </p>
        </div>
        <div
          className="banner-V04 img-viewer-compare-wrap image-compare position-relative"
          id="image-compare"
        >
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src="/images/banner/banner-before.jpg"
                srcSet="/images/banner/banner-before.jpg"
                alt="Image one"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="/images/banner/banner-after.jpg"
                srcSet="/images/banner/banner-after.jpg"
                alt="Image two"
              />
            }
          />
          <span
            style={{
              position: "absolute",
              padding: "9px 24px",
              color: "var(--dark)",
              fontFamily: '"Albert Sans", sans-serif',
              borderRadius: 40,
              backgroundColor: "var(--white)",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "24px",
              height: "42px",
              left: "24px",
              bottom: "24px",
            }}
          >
            Before
          </span>
          <span
            style={{
              position: "absolute",
              padding: "9px 24px",
              color: "var(--dark)",
              fontFamily: '"Albert Sans", sans-serif',
              borderRadius: 40,
              backgroundColor: "var(--white)",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "24px",
              height: "42px",
              right: "24px",
              bottom: "24px",
            }}
          >
            After
          </span>
        </div>
      </div>
    </section>
  );
}
