import { Link } from "react-router-dom";

export default function PurchasedTogether() {
  return (
    <div className="tf-product-fbt">
      <h4 className="title text-xl fw-medium">Often purchased together</h4>
      <form
        className="tf-product-form-bundle"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="tf-bundle-products">
          <div className="tf-bundle-product-item">
            <Link to={`/product-detail/1`} className="bundle-image">
              <img
                className=" ls-is-cached lazyloaded"
                data-src="/images/products/product-16.jpg"
                alt="img-product"
                src="/images/products/product-16.jpg"
                width={1044}
                height={1392}
              />
            </Link>
            <div className="bundle-info">
              <div className="text-small">T-shirt</div>
              <h6 className="text-black text-line-clamp-1">
                Summer two piece set
              </h6>
              <div className="price-wrap">
                <span className="price-old h6 fw-normal">$99,99</span>
                <span className="price-new h6">$69,99</span>
              </div>
            </div>
            <div className="bundle-check">
              <input type="checkbox" className="tf-check" />
            </div>
          </div>
          <div className="tf-bundle-product-item">
            <Link to={`/product-detail/1`} className="bundle-image">
              <img
                className=" ls-is-cached lazyloaded"
                data-src="/images/products/product-17.jpg"
                alt="img-product"
                src="/images/products/product-17.jpg"
                width={1044}
                height={1392}
              />
            </Link>
            <div className="bundle-info">
              <div className="text-small">T-shirt</div>
              <h6 className="text-black text-line-clamp-1">
                Nike Sportswear Tee Shirts
              </h6>
              <div className="price-wrap">
                <span className="price-old h6 fw-normal">$99,99</span>
                <span className="price-new h6">$69,99</span>
              </div>
            </div>
            <div className="bundle-check">
              <input type="checkbox" className="tf-check" />
            </div>
          </div>
          <div className="tf-bundle-product-item">
            <Link to={`/product-detail/1`} className="bundle-image">
              <img
                className=" ls-is-cached lazyloaded"
                data-src="/images/products/product-18.jpg"
                alt="img-product"
                src="/images/products/product-18.jpg"
                width={1044}
                height={1392}
              />
            </Link>
            <div className="bundle-info">
              <div className="text-small">T-shirt</div>
              <h6 className="text-black text-line-clamp-1">
                Short sleeve office shirt
              </h6>
              <div className="price-wrap">
                <span className="price-old h6 fw-normal">$99,99</span>
                <span className="price-new h6">$69,99</span>
              </div>
            </div>
            <div className="bundle-check">
              <input type="checkbox" className="tf-check" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
