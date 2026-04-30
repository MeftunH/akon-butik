import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="themesFlat">
      <div className="container-full-2">
        <div className="s-banner-header">
          <div className="image">
            <img
              className="lazyload w-100"
              src="/images/section/fashion-style.svg"
              alt="Fashion"
              width={1840}
              height={230}
            />
          </div>
          <div className="bot">
            <div className="topbar-left">
              <h6 className="text-up fw-normal text-line-clamp-1">
                Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
                elit
              </h6>
              <div className="group-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line letter-space-0"
                >
                  Men
                </Link>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line letter-space-0"
                >
                  Women
                </Link>
              </div>
            </div>
            <span className="br-line bg-black d-none d-xl-flex" />
            <a
              href="#search"
              data-bs-toggle="modal"
              className="btn-open_search link text-nowrap d-none d-md-flex"
            >
              <i className="icon icon-magnifying-glass" />
              Search product
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
