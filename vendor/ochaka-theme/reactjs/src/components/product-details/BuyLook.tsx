import { Link } from "react-router-dom";

import { useState } from "react";
import { useCart } from "@/context/Cart";
import { buyTheLooksProducts } from "@/data/products";

export default function BuyLook() {
  const { addProductToCart, isAddedToCartProducts } = useCart();

  // track selected size per item (default = first size)
  const [selectedSizes, setSelectedSizes] = useState(
    buyTheLooksProducts.map((it) => it.sizes[0])
  );

  const changeSize = (idx: number, val: string) =>
    setSelectedSizes((prev) => prev.map((s, i) => (i === idx ? val : s)));

  const handleAddToCart = (item: any) => {
    addProductToCart(item.id);
  };

  return (
    <section className="themesFlat">
      <div className="container">
        <h2 className="sect-title fw-normal">Buy the look</h2>

        <div className="tab-buy-wrap flat-animate-tab">
          {/* Tabs */}
          <ul className="tab-buy_list" role="tablist">
            {buyTheLooksProducts.map((item, idx) => {
              const isActive = idx === 0;
              return (
                <li className="nav-tab-item" role="presentation" key={item.id}>
                  <a
                    href={`#${item.id}`}
                    data-bs-toggle="tab"
                    className={`tf-btn-tab ${isActive ? "active" : ""}`}
                    aria-selected={isActive ? "true" : "false"}
                    tabIndex={isActive ? 0 : -1}
                    role="tab"
                  >
                    <img
                      className="ls-is-cached lazyloaded"
                      src={item.imgSrc}
                      alt={item.title}
                      width={1044}
                      height={1392}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Panels */}
          <div className="tab-content">
            {buyTheLooksProducts.map((item, idx) => {
              const isActive = idx === 0;
              return (
                <div
                  key={item.id}
                  className={`tab-pane ${isActive ? "active show" : ""}`}
                  role="tabpanel"
                >
                  <div className="wg-buy-look">
                    <div className="buy_image">
                      <img
                        className="ls-is-cached lazyloaded"
                        src={item.imgSrc}
                        alt={item.title}
                        width={1044}
                        height={1392}
                      />
                    </div>

                    <div className="buy_content">
                      <div className="prd-head">
                        <a href="#" className="link name h4">
                          {item.title}
                        </a>
                        <p className="price h5 text-black">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <h4 className="prd-color fw-semibold">
                        Color: {item.color}
                      </h4>

                      <div className="prd-size">
                        <h4 className="title fw-semibold">Size</h4>
                        <div className="tf-select style-border">
                          <select
                            className="h6"
                            value={selectedSizes[idx]}
                            onChange={(e) => changeSize(idx, e.target.value)}
                          >
                            {item.sizes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="prd-action">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          data-bs-target="#shoppingCart"
                          data-bs-toggle="offcanvas"
                          className="tf-btn style-line w-100"
                        >
                          {isAddedToCartProducts(item.id)
                            ? "Already added"
                            : "Add to cart"}

                          <i className="icon icon-shopping-cart-simple" />
                        </button>

                        <Link to="/shop-default" className="tf-btn-line">
                          <span className="h6 text-normal"> See similar </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* /Panels */}
        </div>
      </div>
    </section>
  );
}
