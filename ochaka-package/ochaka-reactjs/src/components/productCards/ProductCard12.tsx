import { Link } from "react-router-dom";

import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CartButton2 from "../productActionButtons/CartButton2";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard12({ product }: ProductCardProps) {
  return (
    <div className="card-product style-6">
      <div className="card-product_wrapper aspect-ratio-0 d-flex style-line-radius">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt="Product"
            width={648}
            height={730}
          />
          <img
            className="lazyload img-hover"
            src={product.imgHoverSrc}
            alt="Product"
            width={648}
            height={730}
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
          <CartButton2
            product={product}
            parentClass="tf-btn bg-primary primary-2 animate-btn"
          />
        </div>
        {product.badge && (
          <ul className="product-badge_list">
            <li
              className={`product-badge_item type-radius h6 ${product.badgeClass}`}
            >
              {product.badge}
            </li>
          </ul>
        )}
      </div>

      <div className="card-product_info d-grid">
        <div>
          <div className="rate_wrap w-100 mb-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className="icon-star text-star" />
            ))}
          </div>
          <Link
            to={`/product-detail/${product.id}`}
            className="link name-product h4"
          >
            {product.title}
          </Link>
        </div>

        <div className="product-progress_sold primary-2">
          <div
            className="progress-sold progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar"
              style={{ width: `${product.progress}%` }}
            />
          </div>
          <div className="box-quantity">
            <p className="text-avaiable">
              Available:{" "}
              <span className="fw-bold text-black">{product.available}</span>
            </p>
            <p className="text-avaiable">
              Sold: <span className="fw-bold text-black">{product.sold}</span>
            </p>
          </div>
        </div>

        <div className="price-wrap">
          <h4 className="price-new">${product.price.toFixed(2)}</h4>
          <span className="price-old h6">${product.oldPrice?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
