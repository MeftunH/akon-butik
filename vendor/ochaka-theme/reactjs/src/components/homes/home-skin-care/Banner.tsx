import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="flat-spacing">
      <div className="banner-V01 hover-img4">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="banner_img img-style4 mb-md-0">
                <img
                  src="/images/banner/bannerV01.jpg"
                  alt="Banner"
                  className="lazyload"
                  width={1230}
                  height={831}
                />
              </div>
            </div>
            <div className="col-md-5 d-flex align-items-center">
              <div className="banner_content wow fadeInUp">
                <h6 className="sub-title fw-semibold text-primary">
                  Buy 1 get 1 free and 50% sale off
                </h6>
                <a href="#" className="title text-display fw-semibold link">
                  Fall winter collection
                </a>
                <p className="sub-text text-black h5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <Link to={`/shop-default`} className="tf-btn animate-btn">
                  Shop now
                  <i className="icon icon-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
