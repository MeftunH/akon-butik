import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import CartLength from "./CartLength";

export default function FixedHeader() {
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
      className={`tf-header header-fixed ${
        lastScrollY > 150 ? "is-fixed" : ""
      }`}
    >
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
          <div className="col-xl-3 col-md-4 col-6 d-flex justify-content-center justify-content-xl-start">
            <Link to={`/`} className="logo-site">
              <img
                alt="Logo"
                src="/images/logo/logo.svg"
                width={133}
                height={53}
              />
            </Link>
          </div>
          <div className="col-xl-6 d-none d-xl-block">
            <nav className="box-navigation">
              <ul className="box-nav-menu">
                <Nav />
              </ul>
            </nav>
          </div>
          <div className="col-xl-3 col-md-4 col-3">
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
                  {" "}
                  <CartLength />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
