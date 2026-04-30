import { Link } from "react-router-dom";

import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";

export default function Topbar3() {
  return (
    <>
      <div className="tf-topbar_slide bg-dark-olive-2">
        <div className="topbar-top tf-btn-swiper-main">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-sm-1 d-none d-sm-block">
                <div className="text-white link-black d-flex justify-content-end nav-prev-swiper">
                  <i className="icon icon-caret-left" />
                </div>
              </div>
              <div className="col-lg-4 col-sm-7 col-12">
                <div
                  dir="ltr"
                  className="swiper tf-swiper"
                  data-auto="true"
                  data-loop="true"
                  data-delay={3000}
                >
                  <div className="swiper-wrapper">
                    {/* item 1 */}
                    <div className="swiper-slide">
                      <h6 className="text-white fw-normal text-center">
                        Shopping day, 15% off all products
                      </h6>
                    </div>
                    {/* item 2 */}
                    <div className="swiper-slide">
                      <h6 className="text-white fw-normal text-center">
                        Free shipping on orders of $50 or more
                      </h6>
                    </div>
                    {/* item 3 */}
                    <div className="swiper-slide">
                      <h6 className="text-white fw-normal text-center">
                        Pick up in store: Ready in an hour
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-1 d-none d-sm-block">
                <div className="text-white link-black d-flex nav-next-swiper">
                  <i className="icon icon-caret-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tf-topbar type-space-3 line-bt sp-has_line_bt">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 d-none d-lg-block">
              <ul className="topbar-left topbar-option-list justify-content-start">
                <li className="h6">
                  <Link to={`/faq`} className="link">
                    Help &amp; FAQs
                  </Link>
                </li>
                <li className="br-line bg-line opacity-100" />
                <li className="h6">
                  <Link to={`/about-us`} className="link track">
                    About us
                  </Link>
                </li>
                <li className="br-line bg-line opacity-100 d-none d-xxl-block" />
                <li className="h6 d-none d-xxl-block">
                  <Link to={`/faq`} className="link track">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-6 col-lg-8">
              <div className="topbar-center justify-content-start justify-content-sm-center justify-content-lg-end justify-content-xl-center">
                <h6 className="text-up fw-normal text-line-clamp-1">
                  Ochaka treasure trove of human knowledge
                </h6>
                <div className="group-btn text-nowrap">
                  <Link to={`/shop-default`} className="tf-btn-line">
                    View All Books
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-4 d-none d-lg-block">
              <ul className="topbar-right topbar-option-list">
                <li className="tf-currencies d-none d-xl-block">
                  <CurrencySelect textBlack />
                </li>
                <li className="br-line bg-line opacity-100 d-none d-xl-inline-flex" />
                <li className="tf-languages d-none d-xl-block">
                  <LanguageSelect textBlack />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
