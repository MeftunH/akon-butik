import { Link } from "react-router-dom";

export default function BannerCollections() {
  return (
    <section className="themesFlat">
      <div className="container-full-2">
        <div className="tf-grid-layout lg-col-2 gap-0">
          <div className="box-image_V04 hover-img">
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                src="/images/section/box-image-6.jpg"
                alt=""
                className="lazyload"
                width={1380}
                height={1035}
              />
            </Link>
            <div className="box-image_content align-items-center text-center">
              <span className="sub-text h6 text-primary">SALE OFF 50%</span>
              <h2 className="title type-semibold">
                <Link to={`/shop-default`} className="link">
                  Wall Shelves For Bathroom
                </Link>
              </h2>
              <p className="sub-title h6">
                Keep your bathroom neat and tidy with wall shelves.
              </p>
              <Link to={`/shop-default`} className="tf-btn animate-btn">
                Shop now
                <i className="icon icon-arrow-right" />
              </Link>
            </div>
          </div>
          <div className="box-image_V04 hover-img">
            <Link to={`/shop-default`} className="box-image_image img-style">
              <img
                src="/images/section/box-image-7.jpg"
                alt=""
                className="lazyload"
                width={1380}
                height={1035}
              />
            </Link>
            <div className="box-image_content align-items-center text-center">
              <span className="sub-text h6 text-primary">SALE OFF 50%</span>
              <h2 className="title type-semibold">
                <Link to={`/shop-default`} className="link">
                  Smart Storage With Style
                </Link>
              </h2>
              <p className="sub-title h6">
                Durable and stylish, these shelves resist moisture.
              </p>
              <Link to={`/shop-default`} className="tf-btn animate-btn">
                Shop now
                <i className="icon icon-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
