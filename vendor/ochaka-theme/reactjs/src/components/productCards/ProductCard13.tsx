import { Link } from "react-router-dom";

import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
  parentClass?: string;
}
export default function ProductCard13({
  product,
  parentClass = "card-product product-style_list-mini type-2 style-border hover-img",
}: ProductCardProps) {
  return (
    <div className={parentClass}>
      <div className="card-product_wrapper">
        <Link
          to={`/product-detail/${product.id}`}
          className="product-img img-style"
        >
          <img
            className="img-product lazyload"
            src={product.imgSrc}
            alt="Product"
            width={366}
            height={366}
          />
        </Link>
      </div>

      <div className="card-product_info">
        {product.rating ? (
          <div className="rate_wrap mb-12 fs-12">
            {[...Array(product.rating)].map((_, i) => (
              <i key={i} className="icon-star text-star" />
            ))}
          </div>
        ) : (
          ""
        )}
        <Link
          to={`/product-detail/${product.id}`}
          className="name-product h5 link"
        >
          {product.title}
        </Link>

        <div className="group-action">
          <div className="price-wrap mb-0">
            <h4 className="price-new">${product.price.toFixed(2)}</h4>
            <span className="price-old h6">
              ${product.oldPrice?.toFixed(2)}
            </span>
          </div>

          <ul className="product-action_list style-row">
            <li>
              <CartButton tooltipDirection="top" product={product} />
            </li>
            <li className="wishlist">
              <WishlistButton tooltipDirection="top" product={product} />
            </li>
            <li className="compare">
              <CompareButton tooltipDirection="top" product={product} />
            </li>
            <li>
              <QuickViewButton tooltipDirection="top" product={product} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
