import { Link } from "react-router-dom";

import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import {
  blogMenuItems,
  demoItems,
  infoPages,
  productMenuColumns,
  shopPages,
} from "@/data/menu";
export default function MobileMenu() {
  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span className="icon-close-popup" data-bs-dismiss="offcanvas">
        <i className="icon-close" />
      </span>
      <div className="canvas-header">
        <p className="text-logo-mb">Ochaka.</p>
        <Link to={`/login`} className="tf-btn type-small style-2">
          Login
          <i className="icon icon-user" />
        </Link>
        <span className="br-line" />
      </div>
      <div className="canvas-body">
        <div className="mb-content-top">
          <ul className="nav-ul-mb" id="wrapper-menu-navigation">
            <li className="nav-mb-item">
              <a
                href="#dropdown-menu-0"
                className="mb-menu-link collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-menu-0"
              >
                <span>HOME</span>
                <span className="icon icon-caret-down" />
              </a>
              <div id="dropdown-menu-0" className="collapse" style={{}}>
                <ul className="sub-nav-menu">
                  {demoItems.map((item, index) => (
                    <li key={index}>
                      <Link to={item.href} className="sub-nav-link ">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="nav-mb-item">
              <a
                href="#dropdown-menu-1"
                className="mb-menu-link collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-menu-1"
              >
                <span>SHOP</span>
                <span className="icon icon-caret-down" />
              </a>
              <div id="dropdown-menu-1" className="collapse" style={{}}>
                <ul className="sub-nav-menu">
                  {shopPages.map((col, index) => (
                    <li key={index}>
                      <a
                        href={`#dropdown-menu-1-group-${index}`}
                        className="collapsed sub-nav-link"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="dropdown-menu-1-group-0"
                      >
                        <span>{col.heading}</span>
                        <span className="icon icon-caret-down" />
                      </a>
                      <div
                        id={`dropdown-menu-1-group-${index}`}
                        className="collapse"
                      >
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {col.items.map((item, i) => (
                            <li key={i}>
                              <Link to={item.href} className="sub-nav-link ">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="nav-mb-item">
              <a
                href="#dropdown-menu-2"
                className="mb-menu-link collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-menu-2"
              >
                <span>PRODUCT</span>
                <span className="icon icon-caret-down" />
              </a>
              <div id="dropdown-menu-2" className="collapse" style={{}}>
                <ul className="sub-nav-menu">
                  {productMenuColumns.map((col, i) => (
                    <li key={i}>
                      <a
                        href={`#dropdown-menu-2-group-${i}`}
                        className="collapsed sub-nav-link"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="dropdown-menu-2-group-0"
                      >
                        <span>{col.heading}</span>
                        <span className="icon icon-caret-down" />
                      </a>
                      <div
                        id={`dropdown-menu-2-group-${i}`}
                        className="collapse"
                      >
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {col.items.map((item, j) => (
                            <li key={j}>
                              <Link to={item.href} className="sub-nav-link">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="nav-mb-item">
              <a
                href="#dropdown-menu-3"
                className="mb-menu-link collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-menu-3"
              >
                <span>PAGE</span>
                <span className="icon icon-caret-down" />
              </a>
              <div id="dropdown-menu-3" className="collapse" style={{}}>
                <ul className="sub-nav-menu">
                  {infoPages.map((page, index) => (
                    <li key={index}>
                      <Link to={page.href} className="sub-nav-link">
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="nav-mb-item">
              <a
                href="#dropdown-menu-4"
                className="collapsed mb-menu-link"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="dropdown-menu-4"
              >
                <span>BLOG</span>
                <span className="icon icon-caret-down" />
              </a>
              <div id="dropdown-menu-4" className="collapse">
                <ul className="sub-nav-menu">
                  {blogMenuItems.map((item, index) => (
                    <li key={index}>
                      <Link to={item.href} className="sub-nav-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="group-btn">
          <Link to={`/wishlist`} className="tf-btn type-small style-2">
            Wishlist
            <i className="icon icon-heart" />
          </Link>
          <div data-bs-dismiss="offcanvas">
            <a
              href="#search"
              data-bs-toggle="modal"
              className="tf-btn type-small style-2"
            >
              Search
              <i className="icon icon-magnifying-glass" />
            </a>
          </div>
        </div>
        <div className="flow-us-wrap">
          <h5 className="title">Follow us on</h5>
          <ul className="tf-social-icon">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="social-facebook"
              >
                <span className="icon">
                  <i className="icon-fb" />
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="social-instagram"
              >
                <span className="icon">
                  <i className="icon-instagram-logo" />
                </span>
              </a>
            </li>
            <li>
              <a href="https://x.com/" target="_blank" className="social-x">
                <span className="icon">
                  <i className="icon-x" />
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                className="social-tiktok"
              >
                <span className="icon">
                  <i className="icon-tiktok" />
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="payment-wrap">
          <h5 className="title">Payment:</h5>
          <ul className="payment-method-list">
            <li>
              <img
                alt="Payment"
                src="/images/payment/visa.png"
                width={200}
                height={128}
              />
            </li>
            <li>
              <img
                alt="Payment"
                src="/images/payment/master-card.png"
                width={200}
                height={128}
              />
            </li>
            <li>
              <img
                alt="Payment"
                src="/images/payment/amex.png"
                width={200}
                height={128}
              />
            </li>
            <li>
              <img
                alt="Payment"
                src="/images/payment/discover.png"
                width={200}
                height={128}
              />
            </li>
            <li>
              <img
                alt="Payment"
                src="/images/payment/paypal.png"
                width={200}
                height={128}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="canvas-footer">
        <div className="tf-currencies">
          <CurrencySelect textBlack />
        </div>
        <span className="br-line" />
        <div className="tf-languages">
          <LanguageSelect textBlack />
        </div>
      </div>
    </div>
  );
}
