import { Link } from "react-router-dom";

import { products3 } from "@/data/products";
import React, { useMemo, useState } from "react";
import LookbookProductCard from "@/components/productCards/LookbookProductCard";
import { useCart } from "@/context/Cart";

export default function Products2() {
  const [currentLookbookHover, setCurrentLookbookHover] = useState<
    null | number
  >(null);
  const { addProductToCart, isAddedToCartProducts } = useCart();

  // Precompute ids, total, and all-added state
  const productIds = useMemo(() => products3.map((p) => p.id), []);
  const totalPrice = useMemo(
    () => products3.reduce((sum, p) => sum + (p.price || 0), 0),
    []
  );
  const allAdded = useMemo(
    () => productIds.every((id) => isAddedToCartProducts(id)),
    [productIds, isAddedToCartProducts]
  );

  const handleAddSetToCart = () => {
    // Add only those not already in the cart
    for (const p of products3) {
      if (!isAddedToCartProducts(p.id)) addProductToCart(p.id);
    }
  };

  return (
    <section className="sect-lookbook tf-lookbook-hover">
      <div className="banner-lookbook">
        <img
          className="lazyload img-banner"
          src="/images/banner/banner-lookbook.jpg"
          alt="Banners"
          width={1440}
          height={1440}
        />
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
              <LookbookProductCard
                product={products3[0]}
                hasTag
                titleClass="link"
              />
            </div>
          </div>
        </div>
        <div className="lookbook-item position2">
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
                product={products3[1]}
                hasTag
                titleClass="link"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="banner-product-set">
        <div className="banner_content">
          <p className="product-badge_item h6 sale">
            Set Dress <span className="fw-bold"> SALE OFF 15%</span>
          </p>
          <div className="sect-title">
            <h1 className="set_title text-xxl-nowrap">
              Long Fitted Halter Neck Dress
            </h1>
            <p className="s-subtitle h6">
              Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
              elit
            </p>
          </div>
          <ul
            className={`list-ver w-100 bundle-hover-wrap  ${
              currentLookbookHover != null ? "has-hover" : ""
            }`}
          >
            {products3.map((product, index) => (
              <React.Fragment key={product.id}>
                <li>
                  <div
                    className={`card-product product-style_list-mini bundle-hover-item  ${
                      currentLookbookHover != null &&
                      currentLookbookHover != index
                        ? "no-hover"
                        : ""
                    } ${product.pinClass}`}
                  >
                    <div className="card-product_wrapper">
                      <Link
                        to={`/product-detail/${product.id}`}
                        className="product-img"
                      >
                        <img
                          className="lazyload img-product"
                          src={product.imgSrc}
                          alt={product.alt}
                          width={1044}
                          height={1392}
                        />
                      </Link>
                    </div>
                    <div className="card-product_info">
                      <p className="tag-product text-small">{product.tag}</p>
                      <h6>
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="name-product link"
                        >
                          {product.title}
                        </Link>
                      </h6>
                      <div className="price-wrap">
                        <span className="price-new h6 fw-semibold">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="h6 text-instock">
                          {product.inStockText}
                        </span>
                      </div>
                    </div>
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      onClick={() => addProductToCart(product.id)}
                      className="tf-btn animate-btn type-small fw-semibold"
                    >
                      {isAddedToCartProducts(product.id)
                        ? "Already Added"
                        : "Add to cart"}

                      <i className="icon icon-arrow-right d-none d-sm-block" />
                    </a>
                  </div>
                </li>
                {index < products3.length - 1 && <li className="br-line" />}
              </React.Fragment>
            ))}
          </ul>
          <div className="w-100 text-center">
            <p className="h4 text-black total-price">
              Total price:{" "}
              <span className="fw-bold">${totalPrice.toFixed(2)}</span>
            </p>
            <a
              href="#shoppingCart"
              data-bs-toggle="offcanvas"
              className="tf-btn btn-primary w-100"
              onClick={handleAddSetToCart}
            >
              {allAdded ? "All items already in cart" : "ADD SET TO CART"}
              <i className="icon icon-shopping-cart-simple" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
