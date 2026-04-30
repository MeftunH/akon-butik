import { Link } from "react-router-dom";

import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CartButton2 from "../productActionButtons/CartButton2";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard20({ product }: ProductCardProps) {
  return (
    <div
      className="card-product style-5 style-padding-3 bg-min-white"
      key={product.id}
    >
      <div className="card-product_wrapper aspect-ratio-0 d-flex">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt="Product"
            width={840}
            height={822}
          />
          <img
            className="lazyload img-hover"
            src={product.imageHover}
            alt="Product"
            width={840}
            height={822}
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
          <CartButton2 product={product} />
        </div>
      </div>
      <div className="card-product_info d-grid">
        <div className="rate_wrap w-100 mb-16 fs-12">
          {[...Array(product.rating)].map((_, i) => (
            <i className="icon-star text-star" key={i} />
          ))}
        </div>
        <Link
          to={`/product-detail/${product.id}`}
          className="link name-product h4 mb-2"
        >
          {product.title}
        </Link>
        <div className="price-wrap mb-0">
          <span className="price-new h6">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
