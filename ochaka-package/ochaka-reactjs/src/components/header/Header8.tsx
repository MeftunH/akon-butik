import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import CartLength from "./CartLength";

export default function Header8() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrollingUp(currentScrollY < lastScrollY);
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
      className={`tf-header header-fix style-6 ${
        lastScrollY > 200 && isScrollingUp ? "header-sticky" : ""
      } ${lastScrollY > 100 ? "will-sticky" : ""}`}
    >
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
          <div className="col-xl-2 col-md-4 col-6 text-center text-xl-start">
            <Link
              to={`/`}
              className="logo-site justify-content-center justify-content-xl-start"
            >
              <img
                alt=""
                src="/images/logo/logo-white.svg"
                width={133}
                height={53}
              />
            </Link>
          </div>
          <div className="col-xl-10 col-md-4 col-3">
            <div className="header-right">
              <nav className="box-navigation style-white d-none d-xl-block">
                <ul className="box-nav-menu">
                  <Nav />
                </ul>
              </nav>
              <form
                className="form_search style-btn-abs d-none d-lg-block"
                onSubmit={(e) => e.preventDefault()}
              >
                <input type="text" placeholder="Search item" required />
                <button className="btn-submit link" type="submit">
                  <i className="icon icon-magnifying-glass" />
                </button>
              </form>
              <ul className="nav-icon-list">
                <li className="d-none d-lg-flex">
                  <Link className="nav-icon-item text-white link" to={`/login`}>
                    <i className="icon icon-user" />
                  </Link>
                </li>
                <li className="d-none">
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
    </header>
  );
}
