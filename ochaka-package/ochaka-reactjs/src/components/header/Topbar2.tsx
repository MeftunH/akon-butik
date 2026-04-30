import { Link } from "react-router-dom";

import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";

export default function Topbar2() {
  return (
    <div className="tf-topbar bg-dark-blu type-space-2 line-bt-3">
      <div className="container-full-2">
        <div className="row">
          <div className="col-xl-6 col-lg-8">
            <div className="topbar-left justify-content-center justify-content-sm-start">
              <ul className="topbar-option-list">
                <li className="h6 d-none d-sm-flex">
                  <a href="tel:18001234567" className="text-white link track">
                    <i className="icon icon-phone" /> Call us for free: +1(800)
                    123 4567
                  </a>
                </li>
                <li className="br-line d-none d-sm-flex" />
                <li className="h6">
                  <Link to={`/track-order`} className="text-white link">
                    Free Shipping for orders over $150
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-6 col-lg-4 d-none d-lg-block">
            <ul className="topbar-right topbar-option-list">
              <li className="h6">
                <Link to={`/faq`} className="text-white link">
                  Help &amp; FAQs
                </Link>
              </li>
              <li className="br-line" />
              <li className="h6">
                <Link to={`/track-order`} className="text-white link track">
                  <i className="icon icon-document-search" /> Track Order
                </Link>
              </li>
              <li className="br-line d-none d-xl-inline-flex" />
              <li className="tf-languages d-none d-xl-block">
                <LanguageSelect />
              </li>
              <li className="br-line d-none d-xl-inline-flex" />
              <li className="tf-currencies d-none d-xl-block">
                <CurrencySelect />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
