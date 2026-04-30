import { Link } from "react-router-dom";

import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard5({ product }: ProductCardProps) {
  return (
    <div className="card-product style-5 style-padding">
      <div className="card-product_wrapper aspect-ratio-0 d-flex">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt="Product"
            width={768}
            height={736}
          />
          <img
            className="lazyload img-hover"
            src={product.hoverImgSrc}
            alt="Product"
            width={648}
            height={736}
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
      <div className="card-product_info d-grid">
        <p className="tag-product text-small">{product.tag}</p>
        <h6 className="name-product">
          <Link to={`/product-detail/${product.id}`} className="link">
            {product.title}
          </Link>
        </h6>
        <div className="rate_wrap w-100">
          <i className="icon-star text-star" />
          <i className="icon-star text-star" />
          <i className="icon-star text-star" />
          <i className="icon-star text-star" />
          <i className="icon-star text-star" />
        </div>
        <div className="price-wrap">
          <h4 className="price-new">${product.price.toFixed(2)}</h4>
          <span className="price-old h6">${product.oldPrice?.toFixed(2)}</span>
        </div>
        <div className="product-progress_sold">
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
              Available:
              <span className="fw-bold text-black">{product.available}</span>
            </p>
            <p className="text-avaiable">
              Sold:
              <span className="fw-bold text-black">{product.sold}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
