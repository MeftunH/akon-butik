import CountdownTimer from "../common/Countdown";
import { useCart } from "@/context/Cart";
import { Link } from "react-router-dom";
import QuantitySelect from "../common/QuantitySelect";

export default function ShopCart() {
  const { cartProducts, totalPrice, removeProductFromCart, updateQuantity } =
    useCart();
  return (
    <div className="flat-spacing each-list-prd">
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-xl-8">
            <div className="tf-cart-sold">
              <div className="notification-sold bg-surface">
                <img
                  className="icon"
                  alt="Icon"
                  src="/icon/fire.svg"
                  width={24}
                  height={24}
                />
                <div className="count-text h6">
                  Your cart will expire in
                  <div className="js-countdown time-count cd-has-zero cd-no">
                    <CountdownTimer style={4} />
                  </div>
                  minutes! Please checkout now before your items sell out!
                </div>
              </div>
              <div className="notification-progress">
                <div className="text">
                  <i className="icon icon-truck" />
                  <p className="h6">
                    Free Shipping for orders over
                    <span className="text-primary fw-bold">$150</span>
                  </p>
                </div>
                <div className="progress-cart">
                  <div className="value" style={{ width: "50%" }}>
                    <span className="round" />
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              {cartProducts.length ? (
                <table className="tf-table-page-cart">
                  <thead>
                    <tr>
                      <th className="h6">Product</th>
                      <th className="h6">Price</th>
                      <th className="h6">Quality</th>
                      <th className="h6">Total price</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((product, i) => (
                      <tr key={i} className="tf-cart_item each-prd file-delete">
                        <td>
                          <div className="cart_product">
                            <Link
                              to={`/product-detail/${product.id}`}
                              className="img-prd"
                            >
                              <img
                                className="lazyload"
                                src={product.imgSrc}
                                alt="T Shirt"
                                width={1044}
                                height={1392}
                              />
                            </Link>
                            <div className="infor-prd">
                              <h6 className="prd_name">
                                <Link
                                  to={`/product-detail/${product.id}`}
                                  className="link"
                                >
                                  {product.title}
                                </Link>
                              </h6>
                              <div className="prd_select text-small">
                                Size:
                                <div className="size-select">
                                  <select className="bg-white">
                                    <option>XS</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                    <option>2XL</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="cart_price h6 each-price">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="cart_quantity">
                          <QuantitySelect
                            quantity={product.quantity}
                            setQuantity={(value) =>
                              updateQuantity(product.id, value)
                            }
                          />
                        </td>
                        <td className="cart_total h6 each-subtotal-price">
                          {(product.quantity * product.price).toFixed(2)}
                        </td>
                        <td
                          className="cart_remove remove link"
                          data-cart-title="Remove"
                        >
                          <i
                            className="icon icon-close  "
                            onClick={() => removeProductFromCart(product.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="row justify-content-center">
                  <div className="box-text_empty type-shop_cart col-12 col-md-6 col-lg-4">
                    <div className="shop-empty_top">
                      <span className="icon">
                        <i className="icon-shopping-cart-simple" />
                      </span>
                      <h3 className="text-emp fw-normal">Your cart is empty</h3>
                      <p className="h6 text-main">
                        Your cart is currently empty. Let us assist you in
                        finding the right product
                      </p>
                    </div>
                    <div className="shop-empty_bot">
                      <Link to={`/shop-default`} className="tf-btn animate-btn">
                        Shopping
                      </Link>
                      <Link to={`/`} className="tf-btn style-line">
                        Back to home
                      </Link>
                    </div>
                  </div>{" "}
                </div>
              )}
              <div className="ip-discount-code">
                <input type="text" placeholder="Add voucher discount" />
                <button className="tf-btn animate-btn" type="submit">
                  Apply Code
                </button>
              </div>
              <div className="group-discount mb-xl-0">
                <div className="box-discount">
                  <div className="discount-top">
                    <div className="discount-off">
                      <p className="h6">Discount</p>
                      <h6 className="sale-off h6 fw-bold">30% OFF</h6>
                    </div>
                    <div className="discount-from">
                      <p className="h6">
                        For all orders <br />
                        form $150
                      </p>
                    </div>
                  </div>
                  <div className="discount-bot">
                    <h6>
                      Code: <span className="coupon-code">Themesflat</span>
                    </h6>
                    <button
                      className="tf-btn coupon-copy-wrap h6"
                      type="button"
                    >
                      Apply Code
                    </button>
                  </div>
                </div>
                <div className="box-discount">
                  <div className="discount-top">
                    <div className="discount-off">
                      <p className="h6">Discount</p>
                      <h6 className="sale-off h6 fw-bold">15% OFF</h6>
                    </div>
                    <div className="discount-from">
                      <p className="h6">
                        For all orders <br />
                        form $100
                      </p>
                    </div>
                  </div>
                  <div className="discount-bot">
                    <h6>
                      Code: <span className="coupon-code">SliVox</span>
                    </h6>
                    <button
                      className="tf-btn coupon-copy-wrap h6"
                      type="button"
                    >
                      Apply Code
                    </button>
                  </div>
                </div>
                <div className="box-discount">
                  <div className="discount-top">
                    <div className="discount-off">
                      <p className="h6">Discount</p>
                      <h6 className="sale-off h6 fw-bold">20% OFF</h6>
                    </div>
                    <div className="discount-from">
                      <p className="h6">
                        For all orders <br />
                        form $200
                      </p>
                    </div>
                  </div>
                  <div className="discount-bot">
                    <h6>
                      Code: <span className="coupon-code">MasShin</span>
                    </h6>
                    <button
                      className="tf-btn coupon-copy-wrap h6"
                      type="button"
                    >
                      Apply Code
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xxl-3 col-xl-4">
            <div className="fl-sidebar-cart bg-white-smoke sticky-top">
              <div className="box-order-summary">
                <h4 className="title fw-semibold">Order Summary</h4>
                <div className="subtotal h6 text-button d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold">Subtotal</h6>
                  <span className="total">-${totalPrice.toFixed(2)}</span>
                </div>
                <div className="discount text-button d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold">Discounts</h6>
                  <span className="total h6">-$80.00</span>
                </div>
                <div className="ship">
                  <h6 className="fw-bold">Shipping</h6>
                  <div className="flex-grow-1">
                    <fieldset className="ship-item">
                      <input
                        type="radio"
                        name="ship-check"
                        className="tf-check-rounded"
                        id="free"
                        defaultChecked
                      />
                      <label className="h6" htmlFor="free">
                        <span>Free Shipping</span>
                        <span className="price">$0.00</span>
                      </label>
                    </fieldset>
                    <fieldset className="ship-item">
                      <input
                        type="radio"
                        name="ship-check"
                        className="tf-check-rounded"
                        id="local"
                      />
                      <label className="h6" htmlFor="local">
                        <span>Local:</span>
                        <span className="price">$35.00</span>
                      </label>
                    </fieldset>
                    <fieldset className="ship-item">
                      <input
                        type="radio"
                        name="ship-check"
                        className="tf-check-rounded"
                        id="rate"
                      />
                      <label className="h6" htmlFor="rate">
                        <span>Flat Rate:</span>
                        <span className="price">$35.00</span>
                      </label>
                    </fieldset>
                  </div>
                </div>
                <h5 className="total-order d-flex justify-content-between align-items-center">
                  <span>Total</span>
                  <span className="total each-total-price">
                    ${totalPrice.toFixed(2)}
                  </span>
                </h5>
                <div className="list-ver">
                  <Link to={`/checkout`} className="tf-btn w-100 animate-btn">
                    Process to checkout
                    <i className="icon icon-arrow-right" />
                  </Link>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn btn-white animate-btn animate-dark w-100"
                  >
                    Continue shopping
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
