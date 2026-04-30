import Description from "./specifications/Description";
import Policy from "./specifications/Policy";
import Review from "./specifications/Review";
import Faqs from "./specifications/Faqs";

export default function ProductSpecifications2() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="list-product-description">
          <div className="tab-descriptions">
            <Description />
          </div>
          <div className="tab-policy">
            <Policy />
          </div>
          <div className="tab-reviews write-cancel-review-wrap">
            <Review />
          </div>
          <div className="tab-faqs">
            <div className="flat-animate-tab tab-style-2">
              <Faqs />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
