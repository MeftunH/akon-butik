import { Link } from "react-router-dom";

import { useState } from "react";
import { singleStyleProducts } from "@/data/products";
import { useCart } from "@/context/Cart";
import QuantitySelect from "@/components/common/QuantitySelect";
import CompareButton from "@/components/productActionButtons/CompareButton";
import WishlistButton from "@/components/productActionButtons/WishlistButton";
import QuickViewButton from "@/components/productActionButtons/QuickViewButton";

export default function SingleProduct() {
  const product = singleStyleProducts[2];
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart, isAddedToCartProducts } = useCart();
  return (
    <div className="card-product style-pading-4 style-2 tf-cart-item wow fadeInUp">
      <div className="card-product_wrapper aspect-ratio-0 d-flex">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product ls-is-cached lazyloaded"
            src={product.imgSrc}
            alt="Product"
            width={1236}
            height={1335}
          />
          <img
            className="img-hover ls-is-cached lazyloaded"
            src={product.imgHoverSrc}
            alt="Product"
            width={1236}
            height={1335}
          />
        </Link>
        <ul className="product-action_list">
          <li className="wishlist d-block">
            <WishlistButton product={product} tooltipDirection="top" />
          </li>
          <li className="compare d-block">
            <CompareButton product={product} tooltipDirection="top" />
          </li>
          <li>
            <QuickViewButton product={product} tooltipDirection="top" />
          </li>
        </ul>
      </div>
      <div className="card-product_info d-grid gap-24">
        <div>
          <h3>
            <Link
              to={`/product-detail/${product.id}`}
              className="name-product link mb-8"
            >
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
        <div className="count-customer">
          <i className="icon icon-shopping-cart-simple" />
          <p className="h6">9 people just added this product to their cart</p>
        </div>
        <div className="price-wrap mb-0">
          <span className="price-old h4 fw-normal">
            ${product.oldPrice.toFixed(2)}
          </span>
          <span className="price-new h4">${product.oldPrice.toFixed(2)}</span>
        </div>
        <div className="product-progress_sold primary-5">
          <div
            className="progress-sold progress rounded-0"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-bar rounded-0" style={{ width: "80%" }} />
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
        <div className="action_quantity-product">
          <QuantitySelect
            styleClass="rounded-0"
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <a
            href="#shoppingCart"
            data-bs-toggle="offcanvas"
            onClick={() => addProductToCart(product.id, quantity)}
            className="tf-btn bg-primary primary-5 animate-btn w-100 rounded-0"
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
