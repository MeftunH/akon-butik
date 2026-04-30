import { Link } from "react-router-dom";

import Nav from "./Nav";
import CartLength from "./CartLength";

export default function Header5() {
  return (
    <header className="tf-header style-4">
      <div className="header-top">
        <div className="container-full-2">
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
            <div className="col-xl-4 d-none d-xl-block">
              <div className="box-support-online">
                <i className="icon icon-phone" />
                <span className="br-line type-vertical" />
                <div className="sp-wrap">
                  <span className="text-small">Online support</span>
                  <a
                    href="tel:4055550128"
                    className="phone-number h4 fw-semibold link"
                  >
                    (405) 555-0128
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-6">
              <Link to={`/`} className="logo-site justify-content-center">
                <img
                  alt="Logo"
                  width={133}
                  height={53}
                  src="/images/logo/logo.svg"
                />
              </Link>
            </div>
            <div className="col-xl-4 col-md-4 col-3">
              <ul className="nav-icon-list">
                <li className="d-none d-lg-flex">
                  <Link className="nav-icon-item link" to={`/login`}>
                    <i className="icon icon-user" />
                  </Link>
                </li>
                <li className="d-none d-md-flex">
                  <a
                    className="nav-icon-item link"
                    href="#search"
                    data-bs-toggle="modal"
                  >
                    <i className="icon icon-magnifying-glass" />
                  </a>
                </li>
                <li className="d-none d-sm-flex">
                  <Link className="nav-icon-item link" to={`/wishlist`}>
                    <i className="icon icon-heart" />
                  </Link>
                </li>
                <li
                  className="shop-cart"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#shoppingCart"
                >
                  <a
                    className="nav-icon-item link"
                    href="#shoppingCart"
                    data-bs-toggle="offcanvas"
                  >
                    <i className="icon icon-shopping-cart-simple" />
                  </a>
                  <span className="count">
                    <CartLength />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-inner bg-black d-none d-xl-block">
        <div className="container">
          <nav className="box-navigation style-white">
            <ul className="box-nav-menu">
              <Nav />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
