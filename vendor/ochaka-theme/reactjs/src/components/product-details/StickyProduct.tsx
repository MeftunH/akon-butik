import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { stickyProducts } from "@/data/products";
import { useCart } from "@/context/Cart";
import QuantitySelect from "../common/QuantitySelect";

export default function StickyProduct() {
  const [isVisible, setIsVisible] = useState(false);
  const { addProductToCart, isAddedToCartProducts } = useCart();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const distanceFromBottom = documentHeight - (scrollY + windowHeight);

      if (scrollY >= 500 && distanceFromBottom > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const product = stickyProducts[0];
  return (
    <div className={`tf-sticky-btn-atc ${isVisible ? "show" : ""}`}>
      <div className="container">
        <div className="tf-height-observer w-100 d-flex align-items-center">
          <div className="tf-sticky-atc-product d-flex align-items-center">
            <div className="tf-mini-cart-item align-items-start">
              <div className="tf-mini-cart-image">
                <img
                  className="lazyload"
                  alt="img-product"
                  src={product.imgSrc}
                  width={244}
                  height={244}
                />
              </div>
              <div className="tf-mini-cart-info">
                <h6 className="title">
                  <Link
                    to={`/product-detail/${product.id}`}
                    className="link text-line-clamp-1"
                  >
                    {product.title}
                  </Link>
                </h6>
                <div className="size">
                  <div className="text-small text-main-2 sub">Size: XS</div>
                  <div className="text-small text-main-2 sub">Color:</div>
                  <div className="dot-color bg-caramel" />
                </div>
                <div className="h6 fw-semibold">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className="tf-sticky-atc-infos">
            <form className="" onSubmit={(e) => e.preventDefault()}>
              <div className="tf-sticky-atc-variant-price">
                <h6 className="title">Size:</h6>
                <div className="tf-select style-1">
                  <select className="font-sora">
                    <option>M</option>
                    <option>S</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>
              </div>
              <div className="tf-product-info-quantity">
                <h6 className="title">Quantity:</h6>
                <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
              </div>
              <div className="tf-sticky-atc-btns">
                <a
                  href="#shoppingCart"
                  data-bs-toggle="offcanvas"
                  onClick={() => addProductToCart(product.id, quantity)}
                  className="tf-btn animate-btn btn-add-to-cart"
                >
                  {isAddedToCartProducts(product.id)
                    ? "Already added"
                    : "Add to cart"}
                  <i className="icon icon-shopping-cart-simple" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
