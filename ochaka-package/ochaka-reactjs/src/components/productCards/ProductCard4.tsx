import { Link } from "react-router-dom";

import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard4({ product }: ProductCardProps) {
  return (
    <div className="card-product style-5">
      <div className="card-product_wrapper aspect-ratio-0 d-flex">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt="Product"
            width={648}
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
        {(product.badge || product.badgeExtra) && (
          <ul className="product-badge_list">
            {product.badge && (
              <li className="product-badge_item h6 sale">{product.badge}</li>
            )}
            {product.badgeExtra && (
              <li className="product-badge_item h6 new">
                {product.badgeExtra}
              </li>
            )}
          </ul>
        )}
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
        <div className="price-wrap mb-0">
          <h4 className="price-new">${product.price.toFixed(2)}</h4>
          <span className="price-old h6">${product.oldPrice?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
