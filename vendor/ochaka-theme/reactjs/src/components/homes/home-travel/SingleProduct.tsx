import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { singleStyleProducts } from "@/data/products";
import { useCart } from "@/context/Cart";
import QuantitySelect from "@/components/common/QuantitySelect";

export default function SingleProduct() {
  const product = singleStyleProducts[4];
  const [currentImg, setCurrentImg] = useState(product.imgSrc);
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart, isAddedToCartProducts } = useCart();
  useEffect(() => {
    setCurrentImg(product.imgSrc);
  }, [product]);
  return (
    <section
      className="banner-parallax flat-spacing parallaxie"
      style={{ backgroundImage: 'url("/images/banner/bg-parallax-2.jpg")' }}
    >
      <div className="container">
        <div className="card-product style-padding-3 style-2 tf-cart-item bg-white wow fadeInUp">
          <div className="card-product_info d-grid gap-24">
            <div className="infor-head_wrap">
              <div className="card-product_wrapper d-flex">
                <Link
                  to={`/product-detail/${product.id}`}
                  className="product-img"
                >
                  <img
                    className="img-product ls-is-cached lazyloaded"
                    src={product.imgSrc}
                    alt="Product"
                    width={339}
                    height={453}
                  />
                  <img
                    className="img-hover ls-is-cached lazyloaded"
                    src={product.imgSrc}
                    alt="Product"
                    width={339}
                    height={453}
                  />
                </Link>
              </div>
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
            </div>
            <div className="count-customer">
              <i className="icon icon-shopping-cart-simple" />
              <p className="h6">
                9 people just added this product to their cart
              </p>
            </div>
            <div>
              <h6 className="mb-16">Color</h6>
              <ul className="product-color_list style-large">
                {product.colors?.map((color, i) => (
                  <li
                    key={i}
                    className={`product-color-item color-swatch hover-tooltip tooltip-bot  ${
                      currentImg == color.image ? "active" : ""
                    }`}
                    onMouseOver={() => setCurrentImg(color.image)}
                  >
                    <span className="tooltip color-filter">{color.name}</span>
                    <span className={`swatch-value ${color.value}`} />
                    <img
                      src={color.image}
                      alt="Image"
                      width={339}
                      height={453}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="price-wrap mb-0">
              <span className="price-new h4">${product.price.toFixed(2)}</span>
              <span className="price-old h6 fw-normal">
                ${product.oldPrice.toFixed(2)}
              </span>
            </div>
            <div className="product-progress_sold">
              <div
                className="progress-sold progress rounded-0"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="progress-bar rounded-0 bg-deep-green"
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
                className="tf-btn bg-deep-green animate-btn w-100 rounded-0"
              >
                {isAddedToCartProducts(product.id)
                  ? "ALREADY ADDED"
                  : "ADD TO CART"}
                <i className="icon icon-shopping-cart-simple" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
