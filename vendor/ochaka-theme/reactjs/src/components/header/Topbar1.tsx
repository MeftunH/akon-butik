import { Link } from "react-router-dom";

import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";

export default function Topbar1({
  containerFull = false,
  parentClass = "tf-topbar bg-black",
  light = false,
  containerFullClass = "container-full-2",
}) {
  return (
    <div className={parentClass}>
      <div className={containerFull ? containerFullClass : "container"}>
        <div className="row">
          <div className="col-xl-7 col-lg-8">
            <div className="topbar-left">
              <h6
                className={`text-up ${
                  light ? "" : "text-white"
                } fw-normal text-line-clamp-1`}
              >
                Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
                elit
              </h6>
              <div className="group-btn">
                <Link
                  to={`/shop-default`}
                  className={`tf-btn-line  letter-space-0  ${
                    light ? "" : "style-white"
                  }`}
                >
                  Men
                </Link>
                <Link
                  to={`/shop-default`}
                  className={`tf-btn-line  letter-space-0  ${
                    light ? "" : "style-white"
                  }`}
                >
                  Women
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-4 d-none d-lg-block">
            <ul
              className={`topbar-right ${light ? "" : "topbar-option-list"} `}
            >
              <li className="h6">
                <Link
                  to={`/faq`}
                  className={` ${light ? "" : "text-white"} link`}
                >
                  Help &amp; FAQs
                </Link>
              </li>
              <li className={`br-line  ${light ? "type-vertical" : ""}`} />
              <li className="h6">
                <Link
                  to={`/faq`}
                  className={` ${light ? "" : "text-white"} link`}
                >
                  Factory
                </Link>
              </li>
              <li
                className={`br-line d-none d-xl-inline-flex  ${
                  light ? "type-vertical" : ""
                }`}
              />
              <li className="tf-currencies d-none d-xl-block">
                <CurrencySelect textBlack={light} />
              </li>
              <li
                className={`br-line d-none d-xl-inline-flex  ${
                  light ? "type-vertical" : ""
                }`}
              />
              <li className="tf-languages d-none d-xl-block">
                <LanguageSelect textBlack={light} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
