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
const ProductCard18 = ({ product }: ProductCardProps) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i key={i} className="icon-star text-star" />);
    }
    return stars;
  };

  const renderMarqueeSale = () => {
    if (!product.marqueeSale) return null;
    return <ProductSaleMarquee />;
  };

  const renderCountdown = () => {
    if (product.countdown) {
      return (
        <div className="product-countdown">
          <div className="js-countdown cd-has-zero">
            <CountdownTimer style={5} />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderBadges = () => {
    if (product.badges && product.badges.length > 0) {
      return (
        <ul className="product-badge_list">
          {product.badges.map((badge, index) => (
            <li
              key={index} // It's generally better to use a unique ID if available, otherwise index can be used for static lists.
              className={`product-badge_item type-radius h6 ${badge.type} ${
                badge.type === "flash-sale" ? "d-none d-sm-flex" : ""
              }`}
            >
              {badge.type === "flash-sale" && (
                <i className="icon icon-thunder" />
              )}
              {badge.text}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="card-product style-5">
      <div className="card-product_wrapper aspect-ratio-0 d-flex style-line-radius">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt="Product"
            width={810}
            height={1080}
          />
          <img
            className="lazyload img-hover"
            src={product.imageHover}
            alt="Product"
            width={810}
            height={1080}
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
        {renderCountdown()}
        {renderMarqueeSale()}
        {renderBadges()}
      </div>
      <div className="card-product_info d-grid">
        <div className="rate_wrap w-100 mb-12 fs-12">{renderStars()}</div>
        <Link
          to={`/product-detail/${product.id}`}
          className="link name-product h4"
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
};

export default ProductCard18;
