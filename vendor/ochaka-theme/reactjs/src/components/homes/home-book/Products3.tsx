import { Link } from "react-router-dom";

import React, { useCallback, useMemo } from "react";
import { productsBookTogether } from "@/data/products";
import { useCart } from "@/context/Cart";

export default function Products3() {
  const { addProductToCart, isAddedToCartProducts } = useCart();

  // Sum up the whole bundle price (adjust if you have discounts)
  const totalPrice = useMemo(
    () => productsBookTogether.reduce((sum, p) => sum + (p.price ?? 0), 0),
    []
  );

  // Track which items are already in the cart
  const allAdded = useMemo(
    () => productsBookTogether.every((p) => isAddedToCartProducts(p.id)),
    [isAddedToCartProducts]
  );
  const notAddedCount = useMemo(
    () =>
      productsBookTogether.filter((p) => !isAddedToCartProducts(p.id)).length,
    [isAddedToCartProducts]
  );

  // Handler: add all items that aren't in the cart yet
  const handleAddSet = useCallback(() => {
    productsBookTogether.forEach((p) => {
      if (!isAddedToCartProducts(p.id)) addProductToCart(p.id);
    });
  }, [addProductToCart, isAddedToCartProducts]);

  return (
    <section className="themesFlat">
      <div className="container-full-4">
        <div className="tf-grid-layout lg-col-2 gap-16">
          {/* Left banner */}
          <div className="box-image_v07 d-flex">
            <div className="box-image_image">
              <img
                className="lazyload ani-zoom"
                src="/images/banner/banner-3.jpg"
                alt="Image"
                width={2088}
                height={1932}
              />
            </div>
            <div className="box-image_content wow fadeInUp">
              <h6 className="promo fw-normal text-primary">
                SALE OFF 50% on 1 when you buy 2
              </h6>
              <h2 className="title fw-normal">
                <Link to={`/shop-default`} className="link">
                  I Love You to the Moon and Back
                </Link>
              </h2>
              <p className="desc h6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <Link
                to={`/shop-default`}
                className="tf-btn animate-btn bg-primary primary-6"
              >
                Shop now
                <i className="icon icon-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Bundle */}
          <div className="banner-product-set style-2 bg-soft-peach">
            <div className="banner_content wow fadeInUp">
              <p className="product-badge_item h6 sale bg-primary primary-6">
                Set Dress SALE OFF 15%
              </p>

              <div className="sect-title">
                <h1 className="set_title text-xxl-nowrap">
                  Frequently Bought Together
                </h1>
                <p className="s-subtitle">
                  Up to 50% off Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit
                </p>
              </div>

              <ul className="list-ver w-100 bundle-hover-wrap">
                {productsBookTogether.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <li className="w-100">
                      <div className="card-product product-style_list-mini bundle-hover-item pin1">
                        <div className="card-product_wrapper aspect-ratio-0 d-flex justify-content-center">
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

                        <div className="card-product_info align-self-auto">
                          <h5>
                            <Link
                              to={`/product-detail/${product.id}`}
                              className="name-product link fw-semibold"
                            >
                              {product.title}
                            </Link>
                          </h5>
                          <div className="price-wrap">
                            <span className="price-new h6 fw-semibold text-primary">
                              ${Number(product.price).toFixed(2)}
                            </span>
                            <span className="h6 fw-semibold text-primary primary-6 ms-2">
                              {product.status}
                            </span>
                          </div>
                        </div>

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

                    {index < productsBookTogether.length - 1 && (
                      <li className="br-line" />
                    )}
                  </React.Fragment>
                ))}
              </ul>

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
                  className={[
                    "tf-btn btn-primary primary-6 w-100",
                    allAdded ? "opacity-60 pointer-events-none" : "",
                  ].join(" ")}
                >
                  {allAdded
                    ? "All items already in cart"
                    : `ADD SET TO CART${
                        notAddedCount > 0 ? ` (${notAddedCount})` : ""
                      }`}
                  <i className="icon icon-shopping-cart-simple" />
                </a>

                {/* (Optional) small helper text */}
                {!allAdded && notAddedCount < productsBookTogether.length && (
                  <p className="mt-2 small text-muted">
                    {productsBookTogether.length - notAddedCount} item(s)
                    already in your cart
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* /Bundle */}
        </div>
      </div>
    </section>
  );
}
