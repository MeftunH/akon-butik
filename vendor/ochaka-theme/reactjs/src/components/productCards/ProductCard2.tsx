import { Link } from "react-router-dom";

import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
  addedClass?: string;
}
export default function ProductCard2({
  product,
  addedClass = "",
}: ProductCardProps) {
  return (
    <div className="wow fadeInUp">
      <div className={`card-product bundle-hover-item ${addedClass}`}>
        <div className="card-product_wrapper d-flex">
          <Link to={`/product-detail/${product.id}`} className="product-img">
            <img
              className="lazyload img-product"
              src={product.imgSrc}
              alt={""}
              width={648}
              height={865}
            />
            {product.imgHoverSrc ? (
              <img
                className="lazyload img-hover"
                src={product.imgHoverSrc}
                alt={""}
                width={648}
                height={865}
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
        </div>
        <div className="card-product_info">
          <Link
            to={`/product-detail/${product.id}`}
            className="name-product h4 link"
          >
            {product.title}
          </Link>
          <div className="price-wrap mb-0">
            {product.oldPrice ? (
              <span className="price-old h6 fw-normal">
                ${product.oldPrice.toFixed(2)}
              </span>
            ) : (
              ""
            )}
            <span className="price-new h6">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
