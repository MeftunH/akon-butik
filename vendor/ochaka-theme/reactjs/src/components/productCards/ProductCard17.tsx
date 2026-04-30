import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
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
export default function ProductCard17({ product }: ProductCardProps) {
  const [currentImg, setCurrentImg] = useState(product.imgSrc);
  useEffect(() => {
    setCurrentImg(product.imgSrc);
  }, [product]);
  return (
    <div className="card-product">
      <div className="card-product_wrapper aspect-ratio-0 d-flex">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt="Product"
            width={972}
            height={1296}
          />
          <img
            className="lazyload img-hover"
            src={product.imageHover}
            alt="Product Hover"
            width={972}
            height={1296}
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

        {product.countdown && (
          <div className="product-countdown">
            <div className="js-countdown cd-has-zero">
              <CountdownTimer style={5} />
            </div>
          </div>
        )}

        {product.badges?.length && (
          <ul className="product-badge_list">
            {product.badges.map((badge, index) => (
              <li className={`product-badge_item h6 ${badge.type}`} key={index}>
                {badge.text}
              </li>
            ))}
          </ul>
        )}

        {product.marqueeSale && <ProductSaleMarquee />}
      </div>

      <div className="card-product_info">
        <Link
          to={`/product-detail/${product.id}`}
          className="name-product h4 link"
        >
          {product.title}
        </Link>
        <div className="price-wrap mb-0">
          <span className="price-old h6 fw-normal">
            ${product.oldPrice?.toFixed(2)}
          </span>
          <span className="price-new h6">${product.price.toFixed(2)}</span>
        </div>

        {product.colors?.length && (
          <ul className="product-color_list">
            {product.colors.map((color, index) => (
              <li
                className={`product-color-item color-swatch hover-tooltip tooltip-bot  ${
                  currentImg == color.image ? "active" : ""
                }`}
                key={index}
                onMouseOver={() => setCurrentImg(color.image)}
              >
                <span className="tooltip color-filter">{color.name}</span>
                <span className={`swatch-value ${color.value}`} />
                <img
                  src={color.image}
                  alt="Color Variant"
                  width={972}
                  height={1296}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
