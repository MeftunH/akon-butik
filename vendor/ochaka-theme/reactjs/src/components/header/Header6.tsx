import { Link } from "react-router-dom";

import Nav from "./Nav";
import CartLength from "./CartLength";
import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";

export default function Header6() {
  return (
    <header className="tf-header header-abs-3">
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 col-3 d-xl-none">
              <a
                href="#mobileMenu"
                data-bs-toggle="offcanvas"
                className="btn-mobile-menu style-white"
              >
                <span />
              </a>
            </div>
            <div className="col-xl-4 d-none d-xl-block">
              <div className="list-hor">
                <div className="tf-languages d-none d-xl-block">
                  <LanguageSelect />
                </div>
                <div className="tf-currencies d-none d-xl-block">
                  <CurrencySelect />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-6">
              <Link to={`/`} className="logo-site justify-content-center">
                <img
                  alt="LOGO"
                  src="/images/logo/logo-white-3.svg"
                  width={171}
                  height={33}
                />
                <div className="logo-bottom">
                  <svg
                    width={14}
                    height={6}
                    viewBox="0 0 14 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.5 1L4.5 3L2.5 5L0.5 3L2.5 1Z" fill="white" />
                    <path
                      d="M10.5 0L13.5 3L10.5 6L7.5 3L10.5 0Z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-small-3 text-white text-uppercase">
                    JEWELRY BOUTIQUE
                  </span>
                  <svg
                    width={14}
                    height={6}
                    viewBox="0 0 14 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.5 0L6.5 3L3.5 6L0.5 3L3.5 0Z" fill="white" />
                    <path
                      d="M11.5 1L13.5 3L11.5 5L9.5 3L11.5 1Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="col-xl-4 col-md-4 col-3">
              <ul className="nav-icon-list">
                <li className="d-none d-lg-flex">
                  <Link className="nav-icon-item text-white link" to={`/login`}>
                    <i className="icon icon-user" />
                  </Link>
                </li>
                <li className="d-none d-md-flex">
                  <a
                    className="nav-icon-item text-white link"
                    href="#search"
                    data-bs-toggle="modal"
                  >
                    <i className="icon icon-magnifying-glass" />
                  </a>
                </li>
                <li className="d-none d-sm-flex">
                  <Link
                    className="nav-icon-item text-white link"
                    to={`/wishlist`}
                  >
                    <i className="icon icon-heart" />
                  </Link>
                </li>
                <li
                  className="shop-cart"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#shoppingCart"
                >
                  <a
                    className="nav-icon-item text-white link"
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
      <div className="header-inner d-none d-xl-block">
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
