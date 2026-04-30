import Description from "./specifications/Description";
import Policy from "./specifications/Policy";
import Review from "./specifications/Review";
import Faqs from "./specifications/Faqs";

export default function ProductSpecifications3() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="faq-descriptions" id="accordion1">
          <div className="widget-accordion">
            <div
              className="accordion-title"
              data-bs-target="#Description"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="Description"
              role="button"
            >
              <span>Description</span>
              <span className="icon" />
            </div>
            <div
              id="Description"
              className="collapse show"
              data-bs-parent="#accordion1"
            >
              <div className="accordion-content tab-descriptions">
                <Description />
              </div>
            </div>
          </div>
          <div className="widget-accordion">
            <div
              className="accordion-title collapsed"
              data-bs-target="#Shipping1"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="Shipping1"
              role="button"
            >
              <span>Shipping, Return &amp; Refund Policy</span>
              <span className="icon" />
            </div>
            <div
              id="Shipping1"
              className="collapse"
              data-bs-parent="#accordion1"
            >
              <div className="accordion-content tab-policy">
                <Policy />
              </div>
            </div>
          </div>
          <div className="widget-accordion">
            <div
              className="accordion-title collapsed"
              data-bs-target="#Customer"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="Customer"
              role="button"
            >
              <span>Customer Reviews</span>
              <span className="icon" />
            </div>
            <div
              id="Customer"
              className="collapse"
              data-bs-parent="#accordion1"
            >
              <div className="accordion-content tab-reviews write-cancel-review-wrap">
                <Review />
              </div>
            </div>
          </div>
          <div className="widget-accordion">
            <div
              className="accordion-title collapsed"
              data-bs-target="#FAQs"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="FAQs"
              role="button"
            >
              <span>FAQs</span>
              <span className="icon" />
            </div>
            <div id="FAQs" className="collapse" data-bs-parent="#accordion1">
              <div className="accordion-content tab-faqs">
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
