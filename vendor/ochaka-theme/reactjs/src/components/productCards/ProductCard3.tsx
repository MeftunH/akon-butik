import { Link } from "react-router-dom";

import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CountdownTimer from "../common/Countdown";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
  addedClass?: string;
}
export default function ProductCard3({ product }: ProductCardProps) {
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
          {product.hoverImgSrc ? (
            <img
              className="lazyload img-hover"
              src={product.hoverImgSrc}
              alt="Product"
              width={648}
              height={736}
            />
          ) : (
            ""
          )}
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
        <ul className="product-badge_list">
          {product.badge?.map((badge, i) => (
            <li
              key={i}
              className={`product-badge_item h6 ${
                badge.toLowerCase().includes("flash")
                  ? "flash-sale d-none d-sm-flex"
                  : badge.toLowerCase().includes("hot")
                  ? "hot"
                  : badge.toLowerCase().includes("limited")
                  ? "limit"
                  : "sale"
              }`}
            >
              {badge.toLowerCase().includes("flash") ? (
                <>
                  <i className="icon icon-thunder" /> {badge}
                </>
              ) : (
                badge
              )}
            </li>
          ))}
        </ul>
        {product.countdown ? (
          <div className="product-countdown">
            <div className="js-countdown cd-has-zero">
              <CountdownTimer style={5} />
            </div>
          </div>
        ) : (
          ""
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
