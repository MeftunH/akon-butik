import { Link } from "react-router-dom";

import ProductSaleMarquee from "../common/ProductSaleMarquee";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CartButton2 from "../productActionButtons/CartButton2";
import CountdownTimer from "../common/Countdown";
import { type ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCard10({ product }: ProductCardProps) {
  return (
    <div className="card-product style-5">
      <div className="card-product_wrapper aspect-ratio-0 d-flex">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            src={product.imgSrc}
            alt={product.title}
            width={800}
            height={1168}
          />
          <img
            className="img-hover lazyload"
            src={product.imageHover}
            alt={product.title}
            width={800}
            height={1168}
          />
        </Link>
        <>
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
          {product.saleMarquee ? <ProductSaleMarquee /> : ""}
          {product.countdown ? (
            <div className="product-countdown type-2">
              <div className="js-countdown cd-has-zero">
                <CountdownTimer style={5} />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="product-action_bot">
            <CartButton2
              product={product}
              parentClass="tf-btn animate-btn type-small-4"
            />
          </div>
        </>
      </div>
      <div className="card-product_info d-grid">
        {product.rating ? (
          <div className="rate_wrap w-100 mb-12 fs-12">
            {/* Logic to render stars based on product.rating */}
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`icon-star ${
                  i < (product.rating || 0) ? "text-star" : ""
                }`}
              />
            ))}
          </div>
        ) : (
          ""
        )}
        <Link
          to={`/product-detail/${product.id}`}
          className="link name-product h5 fw-medium mb-4"
        >
          {product.title}
        </Link>
        <div className="price-wrap mb-0">
          {product.oldPrice && (
            <span className="price-old h6">${product.oldPrice.toFixed(2)}</span>
          )}
          <span className="price-new h6">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
