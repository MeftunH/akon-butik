import { useEffect, useState } from "react";
import Nav from "./Nav";

import { Link } from "react-router-dom";
import WishlistLength from "./WishlistLength";
import CartLength from "./CartLength";
import CartTotal from "./CartTotal";
import HeaderCategorySelect from "./HeaderCategorySelect";
import CategoryDropdown from "./CategoryDropdown";

export default function FixedHeader2({
  parentClass = "tf-header header-fixed style-5 bg-dark-blu",
  haContainer = false,
}) {
  const isWhiteHeader = parentClass.includes("bg-white");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <header
      className={`${parentClass}  ${lastScrollY > 150 ? "is-fixed" : ""}`}
    >
      <div className="header-top d-xl-none">
        <div className={haContainer ? "container" : "container-full-2"}>
          <div className="row align-items-center">
            <div className="col-md-4 col-3 d-xl-none">
              <a
                href="#mobileMenu"
                data-bs-toggle="offcanvas"
                className={`btn-mobile-menu ${
                  isWhiteHeader ? "" : "style-white"
                } `}
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
                  src={
                    isWhiteHeader
                      ? "/images/logo/logo.svg"
                      : "/images/logo/logo-white-2.svg"
                  }
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
                      className={`nav-icon-item-2 text-${
                        isWhiteHeader ? "black" : "white"
                      } link`}
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
                      className={`nav-icon-item-2 text-${
                        isWhiteHeader ? "black" : "white"
                      } link`}
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
                      className={`nav-icon-item-2 text-${
                        isWhiteHeader ? "black" : "white"
                      } link`}
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
                        <span
                          className={`text-sub ${
                            isWhiteHeader ? "text-main-6" : ""
                          } text-small-2`}
                        >
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
        <div className={haContainer ? "container" : "container-full-2"}>
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
