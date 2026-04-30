import { Link } from "react-router-dom";

import { singleStyleProducts } from "@/data/products";
import WishlistButton from "@/components/productActionButtons/WishlistButton";
import CompareButton from "@/components/productActionButtons/CompareButton";
import QuickViewButton from "@/components/productActionButtons/QuickViewButton";
import CartButton2 from "@/components/productActionButtons/CartButton2";

export default function SingleProduct2() {
  const product = singleStyleProducts[1];
  return (
    <div className="card-product style-6 style-padding-3 radius-16">
      <div className="card-product_wrapper aspect-ratio-0 d-flex h-100">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            src={product.imgSrc}
            alt="Product"
            width={800}
            height={474}
          />
          <img
            className="img-hover lazyload"
            src={product.imgSrc}
            alt="Product"
            width={800}
            height={474}
          />
        </Link>
        <ul className="product-action_list">
          <li className="wishlist">
            <WishlistButton product={product} />
          </li>
          <li className="compare">
            <CompareButton product={product} />
          </li>
          <li>
            <QuickViewButton product={product} />
          </li>
        </ul>
        <div className="product-action_bot">
          <CartButton2 product={product} />
        </div>
      </div>
      <div className="card-product_info d-grid">
        <div>
          <div className="rate_wrap w-100 mb-12">
            <i className="icon-star text-star" />
            <i className="icon-star text-star" />
            <i className="icon-star text-star" />
            <i className="icon-star text-star" />
            <i className="icon-star text-star" />
          </div>
          <Link
            to={`/product-detail/${product.id}`}
            className="link name-product h4"
          >
            {product.title}
          </Link>
        </div>
        <div className="product-progress_sold primary-4">
          <div
            className="progress-sold progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-bar" style={{ width: "80%" }} />
          </div>
          <div className="box-quantity">
            <p className="text-avaiable">
              Available:
              <span className="fw-bold text-black">57</span>
            </p>
            <p className="text-avaiable">
              Sold: <span className="fw-bold text-black">72</span>
            </p>
          </div>
        </div>
        <div className="price-wrap">
          <span className="price-new h6">${product.price.toFixed(2)}</span>
          <span className="price-old h6">${product.oldPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
