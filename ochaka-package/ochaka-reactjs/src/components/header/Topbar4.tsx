import { Link } from "react-router-dom";

import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";

export default function Topbar4({ isFullWidth = true }) {
  return (
    <div className="tf-topbar type-space-2 line-bt primary-2">
      <div className={isFullWidth ? "container-full-2" : "container"}>
        <div className="row">
          <div className="col-xl-7 col-lg-8">
            <div className="topbar-left justify-content-center justify-content-sm-start">
              <ul className="topbar-option-list">
                <li className="h6 d-none d-sm-flex">
                  <a href="tel:18001234567" className="text-main link track">
                    <i className="icon icon-phone" /> Call us for free: +1(800)
                    123 4567
                  </a>
                </li>
                <li className="br-line d-none d-sm-flex bg-line opacity-100" />
                <li className="h6">
                  <Link to={`/track-order`} className="text-main link track">
                    <i className="icon icon-envelope-simple" />
                    <span> Email us: </span>
                    <span> support@ochaka.com </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-5 col-lg-4 d-none d-lg-block">
            <ul className="topbar-right topbar-option-list">
              <li className="h6">
                <Link to={`/faq`} className="text-main link">
                  Help &amp; FAQs
                </Link>
              </li>
              <li className="h6">
                <Link to={`/track-order`} className="text-main link track">
                  <i className="icon icon-document-search" /> Track Order
                </Link>
              </li>
              <li className="tf-languages d-none d-xl-block">
                <LanguageSelect textColor="color-white-2" textBlack />
              </li>
              <li className="tf-currencies d-none d-xl-block">
                <CurrencySelect textColor="color-white-2" textBlack />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
