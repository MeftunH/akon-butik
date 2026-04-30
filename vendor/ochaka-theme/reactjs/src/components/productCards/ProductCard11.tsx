import { Link } from "react-router-dom";

import ProductSaleMarquee from "../common/ProductSaleMarquee";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CartButton2 from "../productActionButtons/CartButton2";
import CountdownTimer from "../common/Countdown";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard11({ product }: ProductCardProps) {
  return (
    <div className="card-product style-5">
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

        {product.showCountdown && (
          <div className="product-countdown">
            <div className="js-countdown cd-has-zero">
              <CountdownTimer style={5} />
            </div>
          </div>
        )}

        {product.showMarquee && <ProductSaleMarquee />}

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
        <div className="rate_wrap w-100 mb-12 fs-12">
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
    </div>
  );
}
