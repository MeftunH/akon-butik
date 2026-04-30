import { Link } from "react-router-dom";

import { useState } from "react";
import { singleStyleProducts } from "@/data/products";
import { useCart } from "@/context/Cart";
import QuantitySelect from "@/components/common/QuantitySelect";

export default function SingleProduct() {
  const product = singleStyleProducts[0];
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(product.colors?.[0]);

  const { addProductToCart, isAddedToCartProducts } = useCart();
  return (
    <div className="banner-card_product wow fadeInUp">
      <Link to={`/product-detail/${product.id}`} className="product-image">
        <img
          className="lazyload img-product"
          src={product.imgSrc}
          alt=""
          width={864}
          height={1052}
        />
      </Link>
      <div className="product-content tf-product-info-list product-detail_info_mini">
        <div className="product_info">
          <span className="info-cate text-small">Smart phone</span>
          <h3 className="info-name">
            <Link to={`/product-detail/${product.id}`} className="link">
              {product.title}
            </Link>
          </h3>
          <div className="infor-rate rate_wrap">
            <i className="icon-star text-star" />
            <i className="icon-star text-star" />
            <i className="icon-star text-star" />
            <i className="icon-star text-star" />
            <i className="icon-star text-star" />
          </div>
        </div>
        <div className="product_count_buy">
          <i className="icon icon-shopping-cart-simple" />
          <p className="h6">9 people just added this product to their cart</p>
        </div>
        <div className="product_color">
          <h6 className="prd-title">Color</h6>
          <ul className="product-color_list style-large">
            {product.colors?.map((color, i) => (
              <li
                key={i}
                className={`product-color-item color-swatch hover-tooltip tooltip-bot ${
                  color == activeColor ? "active" : ""
                } `}
                onClick={() => setActiveColor(color)}
              >
                <span className="tooltip color-filter">{color.name}</span>
                <span className={`swatch-value ${color.value}`} />
                <img src={color.image} alt="Image" width={864} height={1052} />
              </li>
            ))}
          </ul>
        </div>
        <div className="product_price price-wrap style-end">
          <span className="price-new h4">${product.price.toFixed(2)}</span>
          <span className="price-old h6 fw-normal">
            ${product.oldPrice.toFixed(2)}
          </span>
        </div>
        <div className="product-progress_sold">
          <div
            className="progress-sold progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar bg-cosmic-purple"
              style={{ width: "80%" }}
            />
          </div>
          <div className="box-quantity">
            <p className="text-avaiable">
              Available: <span className="fw-bold text-black">57</span>
            </p>
            <p className="text-avaiable">
              Sold: <span className="fw-bold text-black">72</span>
            </p>
          </div>
        </div>
        <div className="product_action">
          <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
          <a
            href="#shoppingCart"
            data-bs-toggle="offcanvas"
            className="tf-btn animate-btn w-100"
            onClick={() => addProductToCart(product.id, quantity)}
          >
            {isAddedToCartProducts(product.id)
              ? "ALREADY ADDED"
              : "ADD TO CART"}
            <i className="icon icon-shopping-cart-simple" />
          </a>
        </div>
      </div>
    </div>
  );
}
