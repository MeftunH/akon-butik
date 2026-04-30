import { Link } from "react-router-dom";

import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CartButton3 from "../productActionButtons/CartButton3";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard14({ product }: ProductCardProps) {
  return (
    <div className="card-product style-5 style-4 style-padding-2">
      <div className="card-product_wrapper aspect-ratio-1 d-flex overflow-visible">
        <Link
          to={`/product-detail/${product.id}`}
          className="product-img overflow-hidden position-relative"
        >
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt="Product"
            width={500}
            height={500}
          />
          <img
            className="lazyload img-hover"
            src={product.imgHoverSrc}
            alt="Product"
            width={500}
            height={500}
          />
        </Link>
        <ul className="product-action_list">
          <li className="wishlist">
            <WishlistButton
              tooltipDirection="top"
              parentClass="hover-tooltip box-icon hover-primary primary-3"
              product={product}
            />
          </li>
          <li className="compare">
            <CompareButton
              tooltipDirection="top"
              parentClass="hover-tooltip box-icon hover-primary primary-3"
              product={product}
            />
          </li>
          <li>
            <QuickViewButton
              tooltipDirection="top"
              parentClass="hover-tooltip box-icon hover-primary primary-3"
              product={product}
            />
          </li>
        </ul>
      </div>

      <div className="card-product_info d-grid">
        <div className="rate_wrap mb-12 fs-12">
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
        <div className="price-wrap mb-0">
          <span className="price-old h6">${product.oldPrice?.toFixed(2)}</span>
          <span className="price-new h6">${product.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="card-product_action-bot">
        <CartButton3 product={product} />
      </div>
    </div>
  );
}
