import { Link } from "react-router-dom";

// MiniProductCard.jsx

import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
  parentClass?: string;
}
const ProductCard19 = ({
  product,
  parentClass = "card-product product-style_list-mini type-2 style-border hover-img bg-white",
}: ProductCardProps) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i key={i} className="icon-star text-star" />);
    }
    return stars;
  };

  return (
    <div className={parentClass}>
      <div className="card-product_wrapper aspect-ratio-0 d-flex">
        <Link
          to={`/product-detail/${product.id}`}
          className="product-img img-style"
        >
          <img
            className="img-product lazyload"
            src={product.imgSrc}
            alt="Product"
            width={244}
            height={276}
          />
          {/* Note: This layout doesn't have an img-hover */}
        </Link>
      </div>
      <div className="card-product_info">
        <div className="rate_wrap mb-12 fs-12">{renderStars()}</div>
        <Link
          to={`/product-detail/${product.id}`}
          className="name-product h5 link"
        >
          {product.title}
        </Link>
        <div className="group-action">
          <div className="price-wrap mb-0">
            <span className="price-new h6">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="price-old h6">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          <ul className="product-action_list style-row">
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
      </div>
    </div>
  );
};

export default ProductCard19;
