import { Link } from "react-router-dom";

import { products10 } from "@/data/products";
import React, { useMemo, useState } from "react";
import LookbookProductCard from "@/components/productCards/LookbookProductCard";
import { useCart } from "@/context/Cart";

export default function LookbookProducts() {
  const [currentLookbookHover, setCurrentLookbookHover] = useState<
    number | null
  >(null);
  const { addProductToCart, isAddedToCartProducts } = useCart();

  // Live total (sum of product prices)
  const totalPrice = useMemo(
    () =>
      products10.reduce((sum, p) => {
        const priceNum =
          typeof p.price === "number" ? p.price : parseFloat(String(p.price));
        return sum + (isNaN(priceNum) ? 0 : priceNum);
      }, 0),
    []
  );

  // Whether all products are already in the cart
  const allAdded = useMemo(
    () => products10.every((p) => isAddedToCartProducts(p.id)),
    [isAddedToCartProducts]
  );

  // Bulk add handler (skips items already in cart)
  const addSetToCart = () => {
    products10.forEach((p) => {
      if (!isAddedToCartProducts(p.id)) addProductToCart(p.id);
    });
  };
  return (
    <section className="sect-lookbook tf-lookbook-hover">
      <div className="banner-lookbook">
        <img
          className="lazyload img-banner"
          src="/images/banner/banner-lookbook-3.jpg"
          alt="Banners"
          width={1440}
          height={1269}
        />
        <div className="lookbook-item position5">
          <div className="dropdown dropup-center dropdown-custom dropstart">
            <div
              role="dialog"
              className="tf-pin-btn bundle-pin-item swiper-button"
              onMouseOver={() => setCurrentLookbookHover(0)}
              onMouseOut={() => setCurrentLookbookHover(null)}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span />
            </div>
            <div className="dropdown-menu p-0">
              <LookbookProductCard
                product={products10[0]}
                hasTag
                titleClass="link"
              />
            </div>
          </div>
        </div>
        <div className="lookbook-item position6">
          <div className="dropdown dropup-center dropdown-custom dropstart">
            <div
              role="dialog"
              className="tf-pin-btn bundle-pin-item swiper-button"
              onMouseOver={() => setCurrentLookbookHover(1)}
              onMouseOut={() => setCurrentLookbookHover(null)}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span />
            </div>
            <div className="dropdown-menu p-0">
              <LookbookProductCard
                product={products10[1]}
                hasTag
                titleClass="link"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="banner-product-set bg-deep-violet">
        <div className="banner_content">
          <p className="product-badge_item style-2 h6 sale fw-bold">
            Set Dress SALE OFF 15%
          </p>
          <div className="sect-title">
            <h1 className="set_title text-white">Sale Off 50%</h1>
            <p className="s-subtitle h6 text-white_50">
              Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
              elit
            </p>
          </div>
          <ul
            className={`list-ver w-100 bundle-hover-wrap  ${
              currentLookbookHover != null ? "has-hover" : ""
            }`}
          >
            {products10.map((product, index) => (
              <React.Fragment key={product.id}>
                <li>
                  <div
                    className={`card-product product-style_list-mini hover-img bundle-hover-item  ${
                      currentLookbookHover != null &&
                      currentLookbookHover != index
                        ? "no-hover"
                        : ""
                    } ${product.pinClass}`}
                  >
                    <div className="card-product_wrapper radius-16">
                      <Link
                        to={`/product-detail/${product.id}`}
                        className="product-img img-style"
                      >
                        <img
                          className="lazyload img-product"
                          src={product.imgSrc}
                          alt="Product"
                          width={648}
                          height={736}
                        />
                      </Link>
                    </div>
                    <div className="card-product_info">
                      <p className="tag-product text-small text-white_70">
                        {product.tag}
                      </p>
                      <h5>
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="name-product link-secondary text-white"
                        >
                          {product.title}
                        </Link>
                      </h5>
                      <div className="price-wrap fw-semibold h6">
                        <span className="price-new text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-secondary">{product.stock}</span>
                      </div>
                    </div>
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      onClick={() => addProductToCart(product.id)}
                      className="tf-btn btn-white animate-btn animate-dark type-small fw-semibold"
                    >
                      {isAddedToCartProducts(product.id)
                        ? "Already Added"
                        : "Add to cart"}
                      <i className="icon icon-arrow-right d-none d-sm-block" />
                    </a>
                  </div>
                </li>

                {index !== products10.length - 1 && (
                  <li className="br-line bg-line-3" />
                )}
              </React.Fragment>
            ))}
          </ul>
          <div className="w-100 text-center">
            <p className="h4 text-white total-price">
              Total price:{" "}
              <span className="fw-bold">${totalPrice.toFixed(2)}</span>
            </p>
            <a
              href="#shoppingCart"
              data-bs-toggle="offcanvas"
              onClick={addSetToCart}
              className="tf-btn btn-secondary w-100 fw-semibold"
            >
              {allAdded ? "ALL ITEMS ADDED" : "ADD SET TO CART"}
              <i className="icon icon-shopping-cart-simple" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
