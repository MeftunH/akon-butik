import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CompareButton from "../productActionButtons/CompareButton";
import QuickViewButton from "../productActionButtons/QuickViewButton";
import CountdownTimer from "../common/Countdown";
import CartButton4 from "../productActionButtons/CartButton4";
import WishlistButton2 from "../productActionButtons/WishlistButton2";
import type { ProductCardItem } from "@/types/products";
interface ProductCardProps {
  product: ProductCardItem;
}
export default function ProductCardList({ product }: ProductCardProps) {
  const [currentImg, setCurrentImg] = useState(product.imgSrc);
  useEffect(() => {
    setCurrentImg(product.imgSrc);
  }, [product]);

  return (
    <div className="card-product product-style_list">
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
            src={product.imageHover}
            alt="Product"
            width={1044}
            height={1392}
          />
        </Link>
        <ul className="product-action_list">
          <li className="">
            <CompareButton product={product} />
          </li>
          <li>
            <QuickViewButton product={product} />
          </li>
        </ul>
        {product.countdown && (
          <div className="product-countdown">
            <div className="js-countdown cd-has-zero">
              <CountdownTimer style={5} />
            </div>
          </div>
        )}
        <ul className="product-badge_list">
          <li className="product-badge_item h6 hot">Hot</li>
        </ul>
      </div>
      <div className="card-product_info">
        <div className="product-info_list">
          <Link
            to={`/product-detail/${product.id}`}
            className="name-product h3 link"
          >
            {product.title}
          </Link>
          <div className="price-wrap">
            {product.oldPrice && (
              <span className="price-old h6 fw-normal">
                ${product.oldPrice.toFixed(2)}{" "}
                {/* Formatted to 2 decimal places */}
              </span>
            )}
            <span className="price-new h6">
              ${product.price.toFixed(2)} {/* Formatted to 2 decimal places */}
            </span>
          </div>
          {product.colors && product.colors.length > 0 && (
            <ul className="product-color_list">
              {product.colors.map((color, index) => (
                <li
                  className={`product-color-item color-swatch hover-tooltip tooltip-bot ${
                    currentImg == color.image ? "active" : ""
                  }`}
                  key={index}
                  onMouseOver={() => setCurrentImg(color.image)}
                >
                  <span className="tooltip color-filter">{color.name}</span>
                  <span className={`swatch-value ${color.value}`} />
                  <img
                    src={color.image}
                    alt="Image"
                    width={1044}
                    height={1392}
                  />
                </li>
              ))}
            </ul>
          )}
          <div className="product-desc_list d-none d-sm-grid">
            <p className="product-desc">
              <span className="headline fw-bold">Contents:</span>
              Super soft and comfy fabric, skin-friendly and breathable. Womens
              tops dressy casual, round neck cute lightweight tops，loose fit
              basic tees
            </p>
            <p className="product-desc d-none d-md-block">
              <span className="headline fw-bold">Details:</span> Warm up or cool
              down with this essential 3/4 sleeve t shirts, featured in an loose
              fit and Pleated sleeve design with sew seaming front for a
              lived-in look.
            </p>
          </div>
        </div>
        <div className="product-action_list">
          <span className="h6">
            To buy, select
            <span className="fw-bold text-black">size</span>
          </span>
          <div className="group-btn">
            <CartButton4 product={product} />
            <WishlistButton2 product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
