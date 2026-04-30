import { Link } from "react-router-dom";

import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import { useEffect, useState } from "react";

export default function Footer4() {
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 575);
    };
    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleBlock = (key: string) => {
    if (!isMobile) return; // disable toggle on desktop
    setOpenBlocks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // If desktop => everything open
  const getContentStyle = (key: string) => {
    if (!isMobile) {
      return { height: "auto" };
    }
    return {
      height: openBlocks[key] ? "auto" : "0px",
      marginTop: openBlocks[key] ? "10px" : "0px",
      overflow: "hidden",
      transition: "height 0.3s ease",
    };
  };
  return (
    <footer className="tf-footer footer-2 flat-spacing">
      <div className="footer-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="footer-title fw-normal p-md-0">
                Subscribe to get a 25% off coupon for online purchases
              </h2>
            </div>
            <div className="col-md-6">
              <form
                className="form_sub"
                id="subscribe-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="f-content" id="subscribe-content">
                  <fieldset className="col">
                    <input
                      className="style-stroke bg-white"
                      id="subscribe-email"
                      type="email"
                      name="email-form"
                      placeholder="Enter your email"
                      required
                    />
                  </fieldset>
                  <button
                    id="subscribe-button"
                    type="button"
                    className="tf-btn animate-btn type-small-2"
                  >
                    Subscribe
                    <i className="icon icon-arrow-right" />
                  </button>
                </div>
                <div id="subscribe-msg" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="br-line d-flex" />
      </div>
      <div className="footer-body">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6 mb_30 mb-lg-0">
              <div className="footer-col-block">
                <p
                  className="footer-heading footer-heading-mobile"
                  onClick={() => toggleBlock("shop")}
                >
                  Shop
                </p>
                <div
                  className="tf-collapse-content"
                  style={getContentStyle("shop")}
                >
                  <ul className="footer-menu-list">
                    <li>
                      <Link to={`/account-page`} className="link h6">
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link to={`/view-cart`} className="link h6">
                        My Cart
                      </Link>
                    </li>
                    <li>
                      <Link to={`/wishlist`} className="link h6">
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link to={`/shop-default`} className="link h6">
                        Book list
                      </Link>
                    </li>
                    <li>
                      <Link to={`/shop-default`} className="link h6">
                        Sale OFF
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb_30 mb-lg-0">
              <div className="footer-col-block">
                <p
                  className="footer-heading footer-heading-mobile"
                  onClick={() => toggleBlock("support")}
                >
                  Support
                </p>
                <div
                  className="tf-collapse-content"
                  style={getContentStyle("support")}
                >
                  <ul className="footer-menu-list">
                    <li>
                      <Link to={`/faq`} className="link h6">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6">
                        Refunds
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6">
                        After-sales protections
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6">
                        Check order status
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb_30 mb-sm-0">
              <div className="footer-col-block">
                <p
                  className="footer-heading footer-heading-mobile"
                  onClick={() => toggleBlock("info")}
                >
                  Customer care
                </p>
                <div
                  className="tf-collapse-content"
                  style={getContentStyle("info")}
                >
                  <ul className="footer-menu-list">
                    <li>
                      <Link to={`/login`} className="link h6">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to={`/register`} className="link h6">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6">
                        Shipping
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6">
                        Terms &amp; Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-col-block">
                <p
                  className="footer-heading footer-heading-mobile"
                  onClick={() => toggleBlock("newsletter")}
                >
                  Contact us
                </p>
                <div
                  className="tf-collapse-content"
                  style={getContentStyle("newsletter")}
                >
                  <ul className="footer-contact m-0">
                    <li>
                      <i className="icon icon-map-pin" />
                      <span className="br-line" />
                      <a
                        href="https://www.google.com/maps?q=8500+Lorem+Street+Chicago,+IL+55030+Dolor+sit+amet"
                        target="_blank"
                        className="h6 link text-main"
                      >
                        6391 Elgin St. Celina, Delaware 10299
                      </a>
                    </li>
                    <li>
                      <i className="icon icon-phone" />
                      <span className="br-line" />
                      <a href="tel:+88001234567" className="h6 link text-main">
                        +8(800) 123 4567
                      </a>
                    </li>
                    <li>
                      <i className="icon icon-envelope-simple" />
                      <span className="br-line" />
                      <a
                        href="mailto:themesflat@support.com"
                        className="h6 link text-main"
                      >
                        themesflat@support.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="br-line d-flex" />
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="inner-bottom p-0 border-0">
            <ul className="list-hor">
              <li>
                <Link to={`/faq`} className="h6 link">
                  Help &amp; FAQs
                </Link>
              </li>
              <li className="br-line type-vertical" />
              <li>
                <Link to={`/faq`} className="h6 link">
                  Factory
                </Link>
              </li>
            </ul>
            <div className="list-hor flex-wrap">
              <span className="h6">Payment:</span>
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
            <div className="list-hor">
              <div className="tf-currencies">
                <CurrencySelect textBlack />
              </div>
              <span className="br-line type-vertical" />
              <div className="tf-languages">
                <LanguageSelect textBlack />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
