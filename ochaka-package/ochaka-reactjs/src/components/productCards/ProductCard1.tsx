import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import ThunderIcon from "../common/ThunderIcon";
import CartButton from "../productActionButtons/CartButton";
import WishlistButton from "../productActionButtons/WishlistButton";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CountdownTimer from "../common/Countdown";
import type { ProductCardItem } from "@/types/products";

interface ProductCardProps {
  product: ProductCardItem;
  style?: number;
}

export default function ProductCard1({ product, style = 1 }: ProductCardProps) {
  const [currentImg, setCurrentImg] = useState(product.imgSrc);

  useEffect(() => {
    setCurrentImg(product.imgSrc);
  }, [product]);

  // === Boolean flags for style conditions ===
  const hasSize = product.sizes?.length;
  const showCart = [1, 2, 3, 4, 5, 6, 9].includes(style);
  const showWishlist = [1, 2, 3, 4, 5, 6, 7, 8].includes(style);
  const showCompare = [1, 2, 4, 5, 6, 7, 8, 9].includes(style);
  const showQuickView = [1, 4, 5, 6, 7, 8, 9].includes(style);
  const showBottomButtons = [2, 3].includes(style);
  const showQuickAddStyle8 = style === 8;
  const showQuickAddStyle7 = style === 7;
  const tooltipDir = [4, 5, 6, 9].includes(style) ? "top" : "left";

  // === Class name conditions ===
  const cardClass = [
    "card-product",
    hasSize && "has-size",
    style === 4 && "style-2",
    style === 9 && "style-2",
    style === 5 && "style-3",
    style === 6 && "style-4",
  ]
    .filter(Boolean)
    .join(" ");

  const variantBoxClass = [
    "variant-box",
    [2, 3, 4, 6, 9].includes(style) && "bottom-0 start-0 end-0",
    style === 8 && "bot",
  ]
    .filter(Boolean)
    .join(" ");

  const sizeListClass = [
    [2, 3].includes(style) && "product-size_list-2",
    [1, 4, 5, 6, 7, 8, 9].includes(style) && "product-size_list",
    [4, 6, 9].includes(style) && "type-2",
    style === 8 && "type-3",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClass}>
      <div className="card-product_wrapper">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            src={currentImg}
            alt="Product"
            width={1044}
            height={1392}
          />
          <img
            className="lazyload img-hover"
            src={product.imageHover ?? currentImg}
            alt="Product"
            width={1044}
            height={1392}
          />
        </Link>

        {hasSize && (
          <div className={variantBoxClass}>
            <ul className={sizeListClass}>
              {product.sizes?.map((size, i) => (
                <li className="size-item h6" key={i}>
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showQuickAddStyle8 && (
          <div className="product-btn_quick">
            <Link
              to={`/product-detail/${product.id}`}
              className="tf-btn rounded-0 animate-btn type-very-small"
            >
              Quick Add <i className="icon icon-shopping-cart-simple" />
            </Link>
          </div>
        )}
        {style == 9 ? (
          <>
            <div className="remove remove-wishlist box-icon">
              <WishlistButton tooltipDirection="none" product={product} />
            </div>
          </>
        ) : (
          ""
        )}
        <ul className="product-action_list">
          {showCart && (
            <li>
              <CartButton tooltipDirection={tooltipDir} product={product} />
            </li>
          )}
          {style === 5 && <li className="br-line type-vertical h-24" />}

          {showWishlist && (
            <li className="wishlist">
              <WishlistButton tooltipDirection={tooltipDir} product={product} />
            </li>
          )}
          {style === 5 && <li className="br-line type-vertical h-24" />}

          {showCompare && (
            <li className="compare">
              <CompareButton tooltipDirection={tooltipDir} product={product} />
            </li>
          )}
          {style === 5 && <li className="br-line type-vertical h-24" />}

          {showQuickView && (
            <li>
              <QuickViewButton
                tooltipDirection={tooltipDir}
                product={product}
              />
            </li>
          )}
        </ul>

        {showBottomButtons && (
          <div className="product-action_bot">
            <a
              href="#quickView"
              data-bs-toggle="modal"
              className="tf-btn btn-white animate-btn animate-dark"
            >
              Quick View <i className="icon icon-view" />
            </a>
            {style === 3 && (
              <Link
                to={`/product-detail/${product.id}`}
                className="tf-btn btn-white animate-btn animate-dark"
              >
                Quick Add <i className="icon icon-shopping-cart-simple" />
              </Link>
            )}
          </div>
        )}

        {product.badges?.length && (
          <ul className="product-badge_list">
            {product.badges?.map((badge, i) => (
              <li key={i} className={`product-badge_item h6 ${badge.type}`}>
                {badge.type === "flash-sale" && (
                  <i className="icon icon-thunder" />
                )}{" "}
                {badge.text}
              </li>
            ))}
          </ul>
        )}

        {product.countdown && (
          <div className="product-countdown">
            <div className="js-countdown cd-has-zero">
              <CountdownTimer style={5} />
            </div>
          </div>
        )}

        {product.marqueeSale && (
          <div className="product-marquee_sale">
            <div className="marquee-wrapper">
              <div className="initial-child-container">
                {Array.from({ length: 5 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="marquee-child-item">
                      <span className="icon">
                        <ThunderIcon />
                      </span>
                    </div>
                    <div className="marquee-child-item">
                      <p className="text-small">TOP PRODUCT SALE OFF 50%</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card-product_info">
        <Link
          to={`/product-detail/${product.id}`}
          className="name-product h4 link"
        >
          {product.title}
        </Link>

        <div className="price-wrap">
          {product.oldPrice && (
            <span className="price-old h6 fw-normal">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
          <span className="price-new h6">${product.price.toFixed(2)}</span>
        </div>

        {product.colors?.length ? (
          <ul className="product-color_list">
            {product.colors?.map((color, i) => (
              <li
                key={i}
                className={`product-color-item color-swatch hover-tooltip tooltip-bot ${
                  currentImg === color.image ? "active" : ""
                }`}
                onMouseOver={() => setCurrentImg(color.image)}
              >
                <span className="tooltip color-filter">{color.name}</span>
                <span className={`swatch-value ${color.value}`} />
                <img src={color.image} alt="Image" width={1044} height={1392} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="product-color_list color-part-placeholer">
            <li className="product-color-item" />
          </ul>
        )}
      </div>

      {showQuickAddStyle7 && (
        <Link
          to={`/product-detail/${product.id}`}
          className="tf-btn rounded-0 animate-btn type-very-small card-product_action-bot"
        >
          Quick Add <i className="icon icon-shopping-cart-simple" />
        </Link>
      )}
    </div>
  );
}

/**
 * ----------------------------------------
 * Component: ProductCard1
 * ----------------------------------------
 *
 * ✅ Purpose:
 * Renders a product card with conditional layouts and actions based on a `style` prop.
 * Supports multiple layouts (1–9) with features like:
 * - Hover image switching
 * - Color/size variants
 * - Add to Cart, Wishlist, Compare, Quick View
 * - Badges, Countdown, Marquee Sale Effects
 *
 * ✅ Props:
 * @param {Object} product - The product object containing:
 *   @property {string} id - Unique product ID
 *   @property {string} title - Product title
 *   @property {string} imgSrc - Primary image URL
 *   @property {string} imageHover - Hover image URL
 *   @property {number} price - New price
 *   @property {number} [oldPrice] - Optional old price
 *   @property {Array<string>} [sizes] - List of available sizes
 *   @property {Array<{ name: string, value: string, image: string }>} [colors] - List of color variants
 *   @property {Array<{ type: string, text: string }>} [badges] - List of promotional badges
 *   @property {boolean} [countdown] - Whether to show a countdown
 *   @property {boolean} [marqueeSale] - Whether to show a marquee animation
 *
 * @param {number} [style=1] - Determines the layout and button combinations:
 *   - 1–8: Predefined styles for different display purposes
 *
 * ✅ Class Behavior:
 * - `card-product`: Main wrapper
 * - `has-size`: If sizes are defined
 * - `style-2`, `style-3`, `style-4`: Applied based on style value (4, 5, 6)
 * - `variant-box`, `product-size_list`: For size UI
 *
 * ✅ Features:
 * - Dynamic image preview on color hover
 * - Conditional buttons: Cart, Wishlist, Compare, Quick View
 * - Layout-specific button placement
 * - Countdown with <CountdownTimer />
 * - Marquee sale animation using ThunderIcon
 *
 * ✅ Optimization Tips:
 * - Color swatches preload hover images for seamless transition
 * - Dynamic classNames generated with arrays + `.filter(Boolean).join(" ")`
 * - Ideal for use in Swiper slides, product listing pages, and featured sections
 */
