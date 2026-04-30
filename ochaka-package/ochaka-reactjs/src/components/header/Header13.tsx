import { Link } from "react-router-dom";

import Nav from "./Nav";
import CartLength from "./CartLength";
import CartTotal from "./CartTotal";
import WishlistLength from "./WishlistLength";
import HeaderCategorySelect from "./HeaderCategorySelect";

export default function Header13() {
  return (
    <header className="tf-header style-5 bg-white primary-4 mb-16">
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 col-3 d-xl-none">
              <a
                href="#mobileMenu"
                data-bs-toggle="offcanvas"
                className="btn-mobile-menu"
              >
                <span />
              </a>
            </div>
            <div className="col-xl-2 col-md-4 col-6 text-center text-xl-start">
              <Link
                to={`/`}
                className="logo-site justify-content-center justify-content-xl-start"
              >
                <img
                  alt=""
                  src="/images/logo/logo-4.svg"
                  width={131}
                  height={28}
                />
              </Link>
            </div>
            <div className="col-xl-10 col-md-4 col-3">
              <div className="header-right">
                <HeaderCategorySelect parentClass="form_search-product style-search-2 style-search-3 d-none d-xl-flex" />
                <ul className="nav-icon-list text-nowrap">
                  <li className="d-none d-lg-flex">
                    <Link
                      className="nav-icon-item-2 text-black link"
                      to={`/login`}
                    >
                      <i className="icon icon-user" />
                      <div className="nav-icon-item_sub">
                        <span className="text-sub text-main-6 text-small-2">
                          Hello, sign in
                        </span>
                        <span className="h6">Your account</span>
                      </div>
                    </Link>
                  </li>
                  <li className="d-none d-sm-flex">
                    <Link
                      className="nav-icon-item-2 text-black link"
                      to={`/wishlist`}
                    >
                      <i className="icon icon-heart" />
                      <span className="count">
                        {" "}
                        <WishlistLength />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <a
                      className="nav-icon-item-2 text-black link"
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                    >
                      <div className="position-relative d-flex">
                        <i className="icon icon-shopping-cart-simple" />
                        <span className="count">
                          <CartLength />
                        </span>
                      </div>
                      <div className="nav-icon-item_sub d-none d-sm-grid">
                        <span className="text-sub text-main-6 text-small-2">
                          Your cart
                        </span>
                        <span className="h6">
                          <CartTotal />
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-inner d-none d-xl-block bg-white">
        <div className="container">
          <div className="header-inner_wrap wrap-2 line-y">
            <div className="col-left">
              <div className="nav-category-wrap main-action-active active-1600">
                <div className="btn-nav-drop style-2 text-nowrap btn-active rounded-0">
                  <span className="btn-mobile-menu type-small style-white">
                    <span />
                  </span>
                  <h6 className="name-category fw-semibold">All Departments</h6>
                  <i className="icon icon-caret-down" />
                </div>
                <ul className="box-nav-category type-2 active-item active">
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-phone-case" />
                      Phone Cases
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-charger" />
                      Chargers &amp; Cables
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-headphone" />
                      Headphones
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-mouse" />
                      Mouse
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-webcam" />
                      Webcams
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-microphone" />
                      Microphones
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-storage-device" />
                      Storage Devices
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-adapter" />
                      Adapters &amp; Hubs
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-cleaning-kit" />
                      Cleaning Kits
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-audio" />
                      Audio Accessories
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-stylus-pen" />
                      Stylus Pens
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-power-strip" />
                      Power Strips
                    </Link>
                  </li>
                  <li>
                    <Link to={`/shop-default`} className="nav-category_link h5">
                      <i className="icon icon-network" />
                      Network Accessories
                    </Link>
                  </li>
                </ul>
              </div>
              <nav className="box-navigation">
                <ul className="box-nav-menu">
                  <Nav />
                </ul>
              </nav>
            </div>
            <div className="col-right">
              <i className="icon icon-truck" />
              <p className="h6 text-black">
                Free Shipping for orders over
                <span className="fw-bold text-primary">$150</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
