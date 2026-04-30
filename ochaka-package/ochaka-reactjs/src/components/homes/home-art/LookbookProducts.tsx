import { Link } from "react-router-dom";

import React, { useState, useMemo, useCallback } from "react";
import { artProducts2 } from "@/data/products";
import LookbookProductCard from "@/components/productCards/LookbookProductCard";
import { useCart } from "@/context/Cart";

export default function LookbookProducts() {
  const [currentLookbookHover, setCurrentLookbookHover] = useState<
    null | number
  >(null);
  const { addProductToCart, isAddedToCartProducts } = useCart();

  // Bundle totals and state (no TS)
  const totalPrice = useMemo(
    () => artProducts2.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    []
  );
  const allAdded = useMemo(
    () => artProducts2.every((p) => isAddedToCartProducts(p.id)),
    [isAddedToCartProducts]
  );
  const notAddedCount = useMemo(
    () => artProducts2.filter((p) => !isAddedToCartProducts(p.id)).length,
    [isAddedToCartProducts]
  );

  const handleAddSet = useCallback(() => {
    artProducts2.forEach((p) => {
      if (!isAddedToCartProducts(p.id)) addProductToCart(p.id);
    });
  }, [addProductToCart, isAddedToCartProducts]);

  return (
    <section className="sect-lookbook tf-lookbook-hover">
      <div className="banner-lookbook">
        <img
          className="lazyload img-banner"
          src="/images/banner/banner-lookbook-4.jpg"
          alt="Banners"
          width={1440}
          height={1200}
        />

        {/* Pin 1 */}
        <div className="lookbook-item position1">
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
              <LookbookProductCard product={artProducts2[0]} />
            </div>
          </div>
        </div>

        {/* Pin 2 */}
        <div className="lookbook-item position9">
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
              <LookbookProductCard product={artProducts2[1]} />
            </div>
          </div>
        </div>
      </div>

      {/* Bundle list */}
      <div className="banner-product-set bg-sand-white">
        <div className="banner_content wow fadeInUp">
          <div className="sect-title">
            <h2 className="set_title h1">Sale OFF 50%</h2>
            <p className="s-subtitle h6">
              Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
              elit
            </p>
          </div>

          <ul
            className={
              "list-ver w-100 bundle-hover-wrap " +
              (currentLookbookHover !== null ? "has-hover" : "")
            }
          >
            {artProducts2.map((product, index) => (
              <React.Fragment key={product.id}>
                <li>
                  <div
                    className={
                      "card-product product-style_list-mini bundle-hover-item " +
                      product.pin +
                      " " +
                      (currentLookbookHover !== null &&
                      currentLookbookHover !== index
                        ? "no-hover"
                        : "")
                    }
                  >
                    <div className="card-product_wrapper">
                      <Link
                        to={`/product-detail/${product.id}`}
                        className="product-img"
                      >
                        <img
                          className="lazyload img-product"
                          src={product.imgSrc}
                          alt={product.title}
                          width={product.width}
                          height={product.height}
                        />
                      </Link>
                    </div>

                    <div className="card-product_info">
                      <h5>
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="name-product link"
                        >
                          {product.title}
                        </Link>
                      </h5>
                      <div className="price-wrap">
                        <span className="price-new h6 fw-semibold text-main">
                          ${Number(product.price).toFixed(2)}
                        </span>
                        <span className="h6 text-main-7">{product.stock}</span>
                      </div>
                    </div>

                    {/* Per-item Add */}
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      onClick={() => addProductToCart(product.id)}
                      className="tf-btn btn-white animate-btn animate-dark type-small fw-semibold"
                    >
                      {isAddedToCartProducts(product.id)
                        ? "Already added"
                        : "Add to cart"}
                      <i className="icon icon-arrow-right d-none d-sm-block" />
                    </a>
                  </div>
                </li>

                {index < artProducts2.length - 1 && (
                  <li className="br-line bg-line-3" />
                )}
              </React.Fragment>
            ))}
          </ul>

          {/* Bundle footer */}
          <div className="w-100 text-center">
            <p className="h4 text-black total-price">
              Total price:{" "}
              <span className="fw-bold">${totalPrice.toFixed(2)}</span>
            </p>

            {/* Add entire set */}
            <a
              href={allAdded ? undefined : "#shoppingCart"}
              data-bs-toggle={allAdded ? undefined : "offcanvas"}
              onClick={(e) => {
                if (allAdded) {
                  e.preventDefault();
                  return;
                }
                handleAddSet();
              }}
              aria-disabled={allAdded}
              className={"tf-btn animate-btn w-100"}
            >
              {allAdded
                ? "All items already in cart"
                : `ADD SET TO CART${
                    notAddedCount > 0 ? ` (${notAddedCount})` : ""
                  }`}
              <i className="icon icon-shopping-cart-simple" />
            </a>

            {!allAdded && notAddedCount < artProducts2.length && (
              <p className="mt-2 small text-muted">
                {artProducts2.length - notAddedCount} item(s) already in your
                cart
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
