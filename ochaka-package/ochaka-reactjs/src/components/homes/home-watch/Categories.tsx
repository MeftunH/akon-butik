import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h2 className="s-title h1 fw-medium mb-8">Popular Categories</h2>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <div className="watch-grid wow fadeInUp">
          <div className="item aa box-image_category hover-img">
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                className="lazyload"
                src="/images/collections/cls-19.jpg"
                alt="Image"
                width={782}
                height={1140}
              />
            </Link>
            <div className="box-image_content">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-white animate-btn animate-dark rounded-0 px-xxl-32"
              >
                <span className="h6 fw-medium">CLASSIC WATCH</span>
              </Link>
            </div>
          </div>
          <div className="item bb box-image_category hover-img">
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                className="lazyload"
                src="/images/collections/cls-20.jpg"
                alt="Image"
                width={1220}
                height={546}
              />
            </Link>
            <div className="box-image_content">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-white animate-btn animate-dark rounded-0 px-xxl-32"
              >
                <span className="h6 fw-medium">RETRO WATCH</span>
              </Link>
            </div>
          </div>
          <div className="item cc box-image_category hover-img">
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                className="lazyload"
                src="/images/collections/cls-21.jpg"
                alt="Image"
                width={586}
                height={546}
              />
            </Link>
            <div className="box-image_content">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-white animate-btn animate-dark rounded-0 px-xxl-32"
              >
                <span className="h6 fw-medium">MECHANICAL WATCH</span>
              </Link>
            </div>
          </div>
          <div className="item dd box-image_category hover-img">
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                className="lazyload"
                src="/images/collections/cls-22.jpg"
                alt="Image"
                width={586}
                height={546}
              />
            </Link>
            <div className="box-image_content">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-white animate-btn animate-dark rounded-0 px-xxl-32"
              >
                <span className="h6 fw-medium">LUXURY WATCH</span>
              </Link>
            </div>
          </div>
          <div className="item ee box-image_category hover-img">
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                className="lazyload"
                src="/images/collections/cls-23.jpg"
                alt="Image"
                width={782}
                height={1140}
              />
            </Link>
            <div className="box-image_content">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-white animate-btn animate-dark rounded-0 px-xxl-32"
              >
                <span className="h6 fw-medium">FASHION WATCH</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
