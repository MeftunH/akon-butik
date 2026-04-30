import Slider1 from "./sliders/Slider1";
import DeliveryPolicy from "./DeliveryPolicy";
import PaymentMethods from "./PaymentMethods";
import ProductSkuCategories from "./ProductSkuCategories";
import { defaultImageswithOutofStock } from "@/data/singleProductSlides";

export default function DetailsOutOfStock({ product }) {
  return (
    <section className="flat-single-product flat-spacing-3">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product Images */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="product-thumbs-slider">
                  <Slider1 slideItems={defaultImageswithOutofStock} />
                </div>
              </div>
            </div>
            {/* /Product Images */}
            {/* Product Info */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main sticky-top" />
                <div className="tf-product-info-list other-image-zoom">
                  <h2 className="product-info-name">{product.title}</h2>
                  <div className="product-info-meta">
                    <div className="rating">
                      <div className="d-flex gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 5.4091L8.913 5.07466L6.99721 0.261719L5.08143 5.07466L0 5.4091L3.89741 8.7184L2.61849 13.7384L6.99721 10.9707L11.376 13.7384L10.097 8.7184L14 5.4091Z"
                              fill="#EF9122"
                            />
                          </svg>
                        ))}
                      </div>
                      <div className="reviews text-main">(3.671 review)</div>
                    </div>
                  </div>
                  <div className="tf-product-heading justify-content-start align-items-center p-0 border-0">
                    <div className="product-info-price price-wrap">
                      <span className="price-new price-on-sale h2 fw-4">
                        $ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="tf-product-info-liveview mb-0">
                      <div className="liveview-count size-40">
                        <span className="count fw-6 h6">23</span>
                      </div>
                      <p className="fw-6 h6">
                        People are viewing this right now
                      </p>
                    </div>
                  </div>
                  <form
                    className="form-out-stock"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <h4 className="box-title-out-stock">
                      <i className="icon icon-envelope" />
                      Email when stock available
                    </h4>
                    <div className="">
                      <input
                        className="tf-field-input tf-input"
                        id="name"
                        placeholder="Your name"
                        type="text"
                        name="name"
                        required
                      />
                    </div>
                    <div className="">
                      <input
                        className="tf-field-input tf-input"
                        id="email"
                        placeholder="Email address"
                        type="email"
                        name="email"
                        required
                      />
                    </div>
                    <button className="tf-btn animate-btn">
                      Subscribe now
                    </button>
                  </form>
                  <DeliveryPolicy />
                  <PaymentMethods />
                  <ProductSkuCategories />
                </div>
              </div>
            </div>
            {/* /Product Info */}
          </div>
        </div>
      </div>
    </section>
  );
}
