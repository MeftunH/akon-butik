import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <section className="themesFlat">
      <div className="tf-grid-layout xl-col-2 gap-0 watch-grid_2">
        <div className="box-image_V02 hover-img type-space-6">
          <Link to={`/shop-default`} className="box-image_image img-style">
            <img
              src="/images/section/box-image-41.jpg"
              alt="Image"
              className="lazyload"
              width={1440}
              height={1440}
            />
          </Link>
          <div className="box-image_content wow fadeInUp">
            <Link
              to={`/shop-default`}
              className="title link text-display text-white fw-semibold"
            >
              SALE UP 70% OFF
            </Link>
            <p className="desc h5 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <Link
              to={`/shop-default`}
              className="tf-btn btn-white animate-btn animate-dark rounded-0 px-xxl-32"
            >
              DISCOVER NOW
              <i className="icon icon-arrow-right" />
            </Link>
          </div>
        </div>
        <div className="d-grid">
          <div className="tf-grid-layout sm-col-2 gap-0">
            <div className="box-image_V06 type-space-4 hover-img rounded-0">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src="/images/section/box-image-42.jpg"
                  alt="IMG"
                  className="lazyload"
                  width={960}
                  height={960}
                />
              </Link>
              <div className="box-image_content wow fadeInUp">
                <p className="sub-title h4 text-white mb-0">
                  Special Offer Watch
                </p>
                <div className="price-wrap style-end gap-13">
                  <span className="price-new h1 fw-medium text-white">
                    $89,99
                  </span>
                  <span className="price-old h3 non-cl text-white_70">
                    $120,00
                  </span>
                </div>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line style-white letter-space-0"
                >
                  Shop now
                </Link>
              </div>
            </div>
            <Link to={`/shop-default`} className="box-image_V08 hover-img">
              <div className="box-image_image img-style">
                <img
                  src="/images/section/box-image-44.jpg"
                  alt="IMG"
                  className="lazyload"
                  width={960}
                  height={960}
                />
              </div>
              <div className="box-image_content wow fadeInUp align-items-center">
                <h4 className="title text-white fw-normal">
                  Limited Time Offer
                </h4>
                <div className="flat-off text-white">
                  <span className="line-break" />
                  <p className="text-off h3">
                    FLAT
                    <span> 30% </span>
                    OFF
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="tf-grid-layout sm-col-2 gap-0">
            <div className="box-image_V06 type-space-2 hover-img rounded-0">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src="/images/section/box-image-43.jpg"
                  alt="IMG"
                  className="lazyload"
                  width={960}
                  height={960}
                />
              </Link>
              <div className="box-image_content wow fadeInUp">
                <h3 className="title">
                  <Link to={`/shop-default`} className="link">
                    OLEVS Men's Watch
                  </Link>
                </h3>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line letter-space-0"
                >
                  Shop now
                </Link>
              </div>
            </div>
            <div className="box-image_V06 type-space-4 hover-img rounded-0">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src="/images/section/box-image-45.jpg"
                  alt="IMG"
                  className="lazyload"
                  width={960}
                  height={960}
                />
              </Link>
              <div className="box-image_content wow fadeInUp">
                <p className="sub-title h4 text-white mb-0">Limited Edition</p>
                <div className="price-wrap style-end">
                  <span className="price-new h1 fw-medium text-white">
                    $120,00
                  </span>
                  <span className="price-old h3 non-cl text-white_70">
                    $180,00
                  </span>
                </div>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line style-white letter-space-0"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
