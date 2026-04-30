import { Link } from "react-router-dom";

import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import NewsLetterForm from "./NewsLetterForm";
import { useEffect, useState } from "react";

export default function Footer3() {
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
    <footer className="tf-footer style-3">
      <div className="ft-item-img">
        <img
          src="/images/section/item-footer.png"
          alt=""
          className="lazyload"
          width={1920}
          height={128}
        />
      </div>
      <div className="footer-body">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb_30 mb-xl-0">
              <div className="footer-infor">
                <Link to={`/`} className="logo-site">
                  <img
                    alt=""
                    src="/images/logo/logo-white.svg"
                    width={133}
                    height={53}
                  />
                </Link>
                <ul className="footer-contact mb-0">
                  <li>
                    <i className="icon icon-map-pin" />
                    <span className="br-line" />
                    <a
                      href="https://www.google.com/maps?q=8500+Lorem+Street+Chicago,+IL+55030+Dolor+sit+amet"
                      target="_blank"
                      className="h6 link text-white_50"
                    >
                      8500 Lorem Street Chicago, IL 55030 Dolor sit amet
                    </a>
                  </li>
                  <li>
                    <i className="icon icon-phone" />
                    <span className="br-line" />
                    <a
                      href="tel:+88001234567"
                      className="h6 link text-white_50"
                    >
                      +8(800) 123 4567
                    </a>
                  </li>
                  <li>
                    <i className="icon icon-envelope-simple" />
                    <span className="br-line" />
                    <a
                      href="mailto:themesflat@support.com"
                      className="h6 link text-white_50"
                    >
                      themesflat@support.com
                    </a>
                  </li>
                </ul>
                <ul className="tf-social-icon_2">
                  <li>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      className="link text-white"
                    >
                      <i className="icon-fb" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      className="link text-white"
                    >
                      <i className="icon-instagram-logo" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/"
                      target="_blank"
                      className="link text-white"
                    >
                      <i className="icon-x" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/"
                      target="_blank"
                      className="link text-white"
                    >
                      <i className="icon-tiktok" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-sm-6 mb_30 mb-xl-0">
              <div className="footer-col-block">
                <p
                  className="footer-heading footer-heading-mobile"
                  onClick={() => toggleBlock("shopping")}
                >
                  Shopping
                </p>
                <div
                  className="tf-collapse-content"
                  style={getContentStyle("shopping")}
                >
                  <ul className="footer-menu-list">
                    <li>
                      <Link to={`/faq`} className="link h6 text-white_50">
                        Shipping
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/shop-default`}
                        className="link h6 text-white_50"
                      >
                        Shop by Brand
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/track-order`}
                        className="link h6 text-white_50"
                      >
                        Track order
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6 text-white_50">
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#size-guide"
                        data-bs-toggle="modal"
                        className="link h6 text-white_50"
                      >
                        Size Guide
                      </a>
                    </li>
                    <li>
                      <Link to={`/wishlist`} className="link h6 text-white_50">
                        My Wishlist
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-sm-6 mb_30 mb-sm-0">
              <div className="footer-col-block">
                <p
                  className="footer-heading footer-heading-mobile"
                  onClick={() => toggleBlock("info")}
                >
                  Information
                </p>
                <div
                  className="tf-collapse-content"
                  style={getContentStyle("info")}
                >
                  <ul className="footer-menu-list">
                    <li>
                      <Link to={`/about-us`} className="link h6 text-white_50">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6 text-white_50">
                        Term &amp; Policy
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6 text-white_50">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link to={`/blog-grid`} className="link h6 text-white_50">
                        News &amp; Blog
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6 text-white_50">
                        Refunds
                      </Link>
                    </li>
                    <li>
                      <Link to={`/faq`} className="link h6 text-white_50">
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6">
              <div className="footer-col-block">
                <p
                  className="footer-heading footer-heading-mobile"
                  onClick={() => toggleBlock("newsletter")}
                >
                  Newsletter
                </p>
                <div
                  className="tf-collapse-content"
                  style={getContentStyle("newsletter")}
                >
                  <div className="footer-newsletter">
                    <p className="h6 caption text-white_50">
                      Become the first to know about offers, new collections and
                      interior trends.
                    </p>
                    <NewsLetterForm isBgDark />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="inner-bottom">
            <ul className="list-hor">
              <li>
                <a href="#" className="h6 link text-white_50">
                  Help &amp; FAQs
                </a>
              </li>
              <li className="br-line type-vertical" />
              <li>
                <a href="#" className="h6 link text-white_50">
                  Factory
                </a>
              </li>
            </ul>
            <div className="list-hor flex-wrap">
              <span className="h6 text-white_50">Payment:</span>
              <ul className="payment-method-list">
                <li>
                  <img
                    alt="Payment"
                    src="/images/payment/visa-3.svg"
                    width={50}
                    height={32}
                  />
                </li>
                <li>
                  <img
                    alt="Payment"
                    src="/images/payment/master-card-3.svg"
                    width={50}
                    height={32}
                  />
                </li>
                <li>
                  <img
                    alt="Payment"
                    src="/images/payment/amex-3.svg"
                    width={50}
                    height={32}
                  />
                </li>
                <li>
                  <img
                    alt="Payment"
                    src="/images/payment/discover-3.svg"
                    width={50}
                    height={32}
                  />
                </li>
                <li>
                  <img
                    alt="Payment"
                    src="/images/payment/paypal-3.svg"
                    width={50}
                    height={32}
                  />
                </li>
              </ul>
            </div>
            <div className="list-hor">
              <div className="tf-currencies">
                <CurrencySelect />
              </div>
              <span className="br-line type-vertical" />
              <div className="tf-languages">
                <LanguageSelect />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
