import { Link } from "react-router-dom";

import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CountdownTimer from "../common/Countdown";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard8({ product }: ProductCardProps) {
  return (
    <div className="card-product product-style_list-slide">
      <div className="card-product_wrapper d-flex radius-16">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt="Product"
            width={568}
            height={812}
          />
          <img
            className="lazyload img-hover"
            src={product.imgSrc}
            alt="Product"
            width={568}
            height={812}
          />
        </Link>
        <ul className="product-action_list">
          <li>
            <CartButton product={product} />
          </li>
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
      </div>

      <div className="card-product_info">
        <div>
          <p className="tag-product text-small mb-0">{product.tag}</p>
          <h4 className="name-product">
            <Link
              to={`/product-detail/${product.id}`}
              className="text-purple link"
            >
              {product.title}
            </Link>
          </h4>
          <div className="box-price-rate">
            <div className="price-wrap mb-0">
              <h4 className="price-new">${product.price.toFixed(2)}</h4>
              <span className="price-old h6">
                ${product.oldPrice?.toFixed(2)}
              </span>
            </div>
            <div className="rate_wrap">
              <i className="icon-star text-star" />
              <i className="icon-star text-star" />
              <i className="icon-star text-star" />
              <i className="icon-star text-star" />
              <i className="icon-star text-star" />
            </div>
          </div>
        </div>

        <span className="br-line" />

        <p className="product-text_sub">
          Immune Support &amp; Overall Health for All Dogs! Boost your dog’s
          natural defenses with this nutrient-rich dog...
        </p>

        <div className="product-progress_sold">
          <div className="box-quantity">
            <p className="text-avaiable">
              Available:{" "}
              <span className="fw-bold text-black">{product.available}</span>
            </p>
            <p className="text-avaiable">
              Sold: <span className="fw-bold text-black">{product.sold}</span>
            </p>
          </div>
          <div
            className="progress-sold progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar bg-deep-violet"
              style={{ width: "80%" }}
            />
          </div>
        </div>

        <div className="box-hurry-sale">
          <p>
            <span className="h5 fw-medium text-black">Hurry up</span>
            <br />
            <span>offer ends in:</span>
          </p>
          <div className="count-down_v02 style-2">
            <div className="js-countdown cd-has-zero">
              <CountdownTimer style={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
