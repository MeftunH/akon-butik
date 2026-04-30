import { Link } from "react-router-dom";

import Nav from "./Nav";
import CartLength from "./CartLength";
import CartTotal from "./CartTotal";
import WishlistLength from "./WishlistLength";

import HeaderCategorySelect from "./HeaderCategorySelect";
import CategoryDropdown from "./CategoryDropdown";

export default function Header7() {
  return (
    <header className="tf-header style-5">
      <div className="header-top">
        <div className="container-full-2">
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
            <div className="col-xl-2 col-md-4 col-6 text-center text-xl-start">
              <Link
                to={`/`}
                className="logo-site justify-content-center justify-content-xl-start"
              >
                <img
                  alt=""
                  src="/images/logo/logo-white-2.svg"
                  width={133}
                  height={53}
                />
              </Link>
            </div>
            <div className="col-xl-10 col-md-4 col-3">
              <div className="header-right">
                <HeaderCategorySelect parentClass="form_search-product style-search-2 d-none d-xl-flex" />
                <ul className="nav-icon-list text-nowrap">
                  <li className="d-none d-lg-flex">
                    <Link
                      className="nav-icon-item-2 text-white link"
                      to={`/login`}
                    >
                      <i className="icon icon-user" />
                      <div className="nav-icon-item_sub">
                        <span className="text-sub text-small-2">
                          Hello, sign in
                        </span>
                        <span className="h6">Your account</span>
                      </div>
                    </Link>
                  </li>
                  <li className="d-none d-sm-flex">
                    <Link
                      className="nav-icon-item-2 text-white link"
                      to={`/wishlist`}
                    >
                      <i className="icon icon-heart" />
                      <span className="count">
                        <WishlistLength />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <a
                      className="nav-icon-item-2 text-white link"
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
                        <span className="text-sub text-small-2">Your cart</span>
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
        <div className="container-full-2">
          <div className="header-inner_wrap">
            <div className="col-left">
              <CategoryDropdown />
              <span className="br-line type-vertical h-24" />
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
