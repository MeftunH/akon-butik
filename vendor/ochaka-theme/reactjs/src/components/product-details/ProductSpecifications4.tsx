import Description from "./specifications/Description";
import Policy from "./specifications/Policy";
import Review from "./specifications/Review";
import Faqs from "./specifications/Faqs";

export default function ProductSpecifications4() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-animate-tab tab-style-3">
          <ul className="menu-tab menu-tab-3" role="tablist" id="parentTab">
            <li className="nav-tab-item" role="presentation">
              <a
                href="#descriptions"
                className="tab-link h5 fw-5 active"
                data-bs-toggle="tab"
              >
                Descriptions
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a
                href="#policy"
                className="tab-link h5 fw-5"
                data-bs-toggle="tab"
              >
                Shipping, Return &amp; Refund Policy
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a
                href="#reviews"
                className="tab-link h5 fw-5"
                data-bs-toggle="tab"
              >
                Customer Reviews
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a href="#faqs" className="tab-link h5 fw-5" data-bs-toggle="tab">
                FAQs
              </a>
            </li>
          </ul>
          <div className="tab-content" id="parentTabContent">
            <div
              className="tab-pane wd-product-descriptions active show"
              id="descriptions"
              role="tabpanel"
              aria-labelledby="descriptions"
            >
              <div className="tab-descriptions">
                <Description />
              </div>
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="policy"
              role="tabpanel"
              aria-labelledby="policy"
            >
              <div className="tab-policy">
                <Policy />
              </div>
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews"
            >
              <div className="tab-reviews write-cancel-review-wrap">
                <Review />
              </div>
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="faqs"
              role="tabpanel"
              aria-labelledby="faqs"
            >
              <div className="tab-faqs">
                <div className="flat-animate-tab tab-style-2">
                  <Faqs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
