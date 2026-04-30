import { Link } from "react-router-dom";

import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard6({ product }: ProductCardProps) {
  return (
    <div className="card-product product-style_list-mini type-2 hover-img">
      <div className="card-product_wrapper">
        <Link
          to={`/product-detail/${product.id}`}
          className="product-img img-style"
        >
          <img
            className="img-product lazyload"
            src={product.imgSrc}
            alt="Product"
            width={244}
            height={244}
          />
        </Link>
      </div>
      <div className="card-product_info">
        <p className="tag-product text-small">{product.tag}</p>
        <h6 className="name-product">
          <Link
            to={`/product-detail/${product.id}`}
            className="text-line-clamp-2 link"
          >
            {product.title}
          </Link>
        </h6>
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
