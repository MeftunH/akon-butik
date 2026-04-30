import { Link } from "react-router-dom";

export default function VoucerBanner() {
  return (
    <section>
      <div className="container">
        <div className="banner-V02 hover-img wow fadeInUp">
          <div className="banner_img img-style">
            <img
              src="/images/banner/bannerV02.jpg"
              alt="Banner"
              className="lazyload"
              width={2880}
              height={374}
            />
          </div>
          <div className="banner_content">
            <div className="box-text">
              <h2 className="title type-semibold">
                <a href="#" className="text-primary">
                  Voucher Today
                </a>
              </h2>
              <h4 className="sub-title fw-bold">
                Get a voucher for any order over
                <span className="text-primary">$150</span>
              </h4>
            </div>
            <div className="group-btn">
              <Link
                to={`/shop-default`}
                className="tf-btn animate-btn type-small-3"
              >
                Get a voucher
                <i className="icon icon-arrow-right" />
              </Link>
              <Link
                to={`/shop-default`}
                className="tf-btn btn-white animate-btn animate-dark type-small-3"
              >
                Discover more
                <i className="icon icon-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
