import { Link } from "react-router-dom";

import { useState } from "react";
import { useCart } from "@/context/Cart";
import { cartSimilerItems } from "@/data/products";

export default function CartModal() {
  const { cartProducts, totalPrice, removeProductFromCart } = useCart();

  const miniCartActions = [
    {
      key: "note",
      label: "Note",
      iconClass: "icon-note-pencil",
    },
    {
      key: "shipping",
      label: "Shipping",
      iconClass: "icon-truck",
    },
    {
      key: "gift",
      label: "Gift",
      iconClass: "icon-gift",
    },
  ];
  const [activeAction, setActiveAction] = useState<string | null>(null);
  return (
    <div
      className="offcanvas offcanvas-end popup-shopping-cart"
      id="shoppingCart"
    >
      <div className="tf-minicart-recommendations">
        <h4 className="title">You may also like</h4>
        <div className="wrap-recommendations">
          <div className="list-cart">
            {cartSimilerItems.map((item) => (
              <div className="list-cart-item" key={item.id}>
                <div className="image">
                  <img
                    className="lazyload"
                    src={item.imgSrc}
                    alt={item.title}
                    width={1044}
                    height={1392}
                  />
                </div>
                <div className="content">
                  <h6 className="name">
                    <Link
                      className="link text-line-clamp-1"
                      to={`/product-detail/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </h6>
                  <div className="cart-item-bot">
                    <div className="price-wrap price">
                      <span className="price-old h6 fw-normal">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                      <span className="price-new h6">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="canvas-wrapper">
        <div className="popup-header">
          <span className="title fw-semibold h4">Shopping cart</span>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="wrap">
          <div className="tf-mini-cart-wrap list-file-delete wrap-empty_text">
            <div className="tf-mini-cart-main">
              <div className="tf-mini-cart-sroll">
                <div className="tf-mini-cart-items list-empty">
                  {!cartProducts.length ? (
                    <div className="box-text_empty type-shop_cart">
                      <div className="shop-empty_top">
                        <span className="icon">
                          <i className="icon-shopping-cart-simple" />
                        </span>
                        <h3 className="text-emp fw-normal">
                          Your cart is empty
                        </h3>
                        <p className="h6 text-main">
                          Your cart is currently empty. Let us assist you in
                          finding the right product
                        </p>
                      </div>
                      <div className="shop-empty_bot">
                        <Link
                          to={`/shop-default`}
                          className="tf-btn animate-btn"
                        >
                          Shopping
                        </Link>
                        <Link to={`/`} className="tf-btn style-line">
                          Back to home
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      {cartProducts.map((product, i) => (
                        <div key={i} className="tf-mini-cart-item file-delete">
                          <div className="tf-mini-cart-image">
                            <img
                              className="lazyload"
                              alt="img-product"
                              src={product.imgSrc}
                              width={1044}
                              height={1392}
                            />
                          </div>
                          <div className="tf-mini-cart-info">
                            <div className="text-small text-main-2 sub">
                              T-shirt
                            </div>
                            <h6 className="title">
                              <Link
                                to={`/product-detail/${product.id}`}
                                className="link text-line-clamp-1"
                              >
                                {product.title}
                              </Link>
                            </h6>
                            <div className="size">
                              <div className="text-small text-main-2 sub">
                                Size: XS
                              </div>
                              <div className="text-small text-main-2 sub">
                                Color:
                              </div>
                              <div className="dot-color bg-caramel" />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h6 fw-semibold">
                                <span className="number">
                                  {product.quantity}x
                                </span>
                                <span className="price text-primary tf-mini-card-price">
                                  ${product.price.toFixed(2)}
                                </span>
                              </div>
                              <i
                                className="icon link icon-close remove"
                                onClick={() =>
                                  removeProductFromCart(product.id)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="tf-mini-cart-bottom box-empty_clear">
              <div className="tf-mini-cart-tool">
                {miniCartActions.map((action) => (
                  <div
                    key={action.key}
                    className={`tf-mini-cart-tool-btn cursor-pointer `}
                    onClick={() =>
                      setActiveAction((prev) =>
                        prev === action.key ? null : action.key
                      )
                    }
                  >
                    <div className="h6">{action.label}</div>
                    <i className={`icon ${action.iconClass}`} />
                  </div>
                ))}
              </div>
              <div className="tf-mini-cart-threshold">
                <div className="text">
                  <h6 className="subtotal">
                    Subtotal (
                    <span className="prd-count">{cartProducts.length}</span>{" "}
                    item)
                  </h6>
                  <h4 className="text-primary total-price tf-totals-total-value">
                    ${totalPrice.toFixed(2)}
                  </h4>
                </div>
                <div className="tf-progress-bar tf-progress-ship">
                  <div
                    className="value"
                    style={{ width: "25%" }}
                    data-progress={25}
                  />
                </div>
                <div className="desc text-main">
                  Add <span className="text-primary fw-bold">$15.40</span> to
                  cart and get free shipping!
                </div>
              </div>
              <div className="tf-mini-cart-bottom-wrap">
                <div className="tf-mini-cart-view-checkout">
                  <Link
                    to={`/view-cart`}
                    className="tf-btn btn-white animate-btn animate-dark line"
                  >
                    View cart
                  </Link>
                  <Link
                    to={`/checkout`}
                    className="tf-btn animate-btn d-inline-flex bg-dark-2 w-100 justify-content-center"
                  >
                    <span>Check out</span>
                  </Link>
                </div>
                <div className="free-shipping">
                  <i className="icon icon-truck" />
                  Free shipping on all orders over $150
                </div>
              </div>
            </div>

            <div
              className={`tf-mini-cart-tool-openable add-note ${
                activeAction == "note" ? "open" : ""
              }`}
            >
              <div className="overlay tf-mini-cart-tool-close" />
              <form
                onSubmit={(e) => e.preventDefault()}
                className="tf-mini-cart-tool-content"
              >
                <label
                  htmlFor="Cart-note"
                  className="tf-mini-cart-tool-text h5 fw-semibold"
                >
                  <i className="icon icon-note-pencil" />
                  Note
                </label>
                <textarea
                  name="note"
                  id="Cart-note"
                  placeholder="Note about your order"
                  defaultValue={""}
                />
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                    type="submit"
                  >
                    Save
                  </button>
                  <div
                    onClick={() => setActiveAction(null)}
                    className="tf-btn btn-white animate-btn animate-dark line tf-mini-cart-tool-close"
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>
            <div
              className={`tf-mini-cart-tool-openable estimate-shipping  ${
                activeAction == "shipping" ? "open" : ""
              }`}
            >
              <div className="overlay tf-mini-cart-tool-close" />
              <form
                id="shipping-form"
                className="tf-mini-cart-tool-content"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="tf-mini-cart-tool-text h5 fw-semibold">
                  <i className="icon icon-truck" />
                  Shipping
                </div>
                <div className="field">
                  <div className="tf-select">
                    <select
                      className="w-100"
                      id="shipping-country-form"
                      name="address[country]"
                      data-default=""
                    >
                      <option
                        value="Australia"
                        data-provinces='[["Australian Capital Territory","Australian Capital Territory"],["New South Wales","New South Wales"],["Northern Territory","Northern Territory"],["Queensland","Queensland"],["South Australia","South Australia"],["Tasmania","Tasmania"],["Victoria","Victoria"],["Western Australia","Western Australia"]]'
                      >
                        Australia
                      </option>
                      <option value="Austria" data-provinces="[]">
                        Austria
                      </option>
                      <option value="Belgium" data-provinces="[]">
                        Belgium
                      </option>
                      <option
                        value="Canada"
                        data-provinces='[["Ontario","Ontario"],["Quebec","Quebec"]]'
                      >
                        Canada
                      </option>
                      <option value="Czech Republic" data-provinces="[]">
                        Czechia
                      </option>
                      <option value="Denmark" data-provinces="[]">
                        Denmark
                      </option>
                      <option value="Finland" data-provinces="[]">
                        Finland
                      </option>
                      <option value="France" data-provinces="[]">
                        France
                      </option>
                      <option value="Germany" data-provinces="[]">
                        Germany
                      </option>
                      <option
                        value="United States"
                        data-provinces='[["Alabama","Alabama"],["California","California"],["Florida","Florida"]]'
                      >
                        United States
                      </option>
                      <option
                        value="United Kingdom"
                        data-provinces='[["England","England"],["Scotland","Scotland"],["Wales","Wales"],["Northern Ireland","Northern Ireland"]]'
                      >
                        United Kingdom
                      </option>
                      <option value="India" data-provinces="[]">
                        India
                      </option>
                      <option value="Japan" data-provinces="[]">
                        Japan
                      </option>
                      <option value="Mexico" data-provinces="[]">
                        Mexico
                      </option>
                      <option value="South Korea" data-provinces="[]">
                        South Korea
                      </option>
                      <option value="Spain" data-provinces="[]">
                        Spain
                      </option>
                      <option value="Italy" data-provinces="[]">
                        Italy
                      </option>
                      <option
                        value="Vietnam"
                        data-provinces='[["Ha Noi","Ha Noi"],["Da Nang","Da Nang"],["Ho Chi Minh","Ho Chi Minh"]]'
                      >
                        Vietnam
                      </option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <div className="tf-select">
                    <select
                      id="shipping-province-form"
                      name="address[province]"
                      data-default=""
                    />
                  </div>
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Postal code"
                    data-opend-focus=""
                    id="zipcode"
                    name="address[zip]"
                    defaultValue=""
                  />
                </div>
                <div
                  id="zipcode-message"
                  className="error"
                  style={{ display: "none" }}
                >
                  We found one shipping rate available for undefined.
                </div>
                <div
                  id="zipcode-success"
                  className="success"
                  style={{ display: "none" }}
                >
                  <p>We found one shipping rate available for your address:</p>
                  <p className="standard">
                    Standard at <span>$0.00</span> USD
                  </p>
                </div>
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                    type="submit"
                  >
                    Save
                  </button>
                  <div
                    onClick={() => setActiveAction(null)}
                    className="tf-btn btn-white animate-btn animate-dark line tf-mini-cart-tool-close"
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>
            <div
              className={`tf-mini-cart-tool-openable add-gift  ${
                activeAction == "gift" ? "open" : ""
              }`}
            >
              <div className="overlay tf-mini-cart-tool-close" />
              <form
                action="#"
                className="tf-mini-cart-tool-content"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="tf-mini-cart-tool-text h5 fw-semibold">
                  <i className="icon icon-gift" />
                  Gift
                </div>
                <div className="wrap">
                  <i className="icon icon-gift-2" />
                  <h3>
                    Only <span className="text-primary">$2</span> for a gift box
                  </h3>
                </div>
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                    type="submit"
                  >
                    Add a gift
                  </button>
                  <div
                    onClick={() => setActiveAction(null)}
                    className="tf-btn btn-white animate-btn animate-dark line tf-mini-cart-tool-close"
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
