import Description from "./specifications/Description";
import Faqs from "./specifications/Faqs";
import Policy from "./specifications/Policy";
import Review from "./specifications/Review";

export default function ProductSpecifications1() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-animate-tab tab-style-1">
          <ul className="menu-tab menu-tab-1" role="tablist">
            <li className="nav-tab-item" role="presentation">
              <a
                href="#descriptions"
                className="tab-link active"
                data-bs-toggle="tab"
              >
                Descriptions
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a href="#policy" className="tab-link" data-bs-toggle="tab">
                Shipping, Return &amp; Refund Policy
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a href="#reviews" className="tab-link" data-bs-toggle="tab">
                Customer Reviews
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a href="#faqs" className="tab-link" data-bs-toggle="tab">
                FAQs
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane wd-product-descriptions active show"
              id="descriptions"
              role="tabpanel"
            >
              <div className="tab-descriptions">
                <Description />
              </div>
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="policy"
              role="tabpanel"
            >
              <div className="tab-policy">
                <Policy />
              </div>
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="reviews"
              role="tabpanel"
            >
              <div className="tab-reviews write-cancel-review-wrap">
                <Review />
              </div>
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="faqs"
              role="tabpanel"
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
