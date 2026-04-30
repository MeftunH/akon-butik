import { useCart } from "@/context/Cart";

import { Link } from "react-router-dom";

export default function Checkout() {
  const { cartProducts, totalPrice } = useCart();
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="tf-page-checkout mb-lg-0">
              <div className="wrap-coupon">
                <h5 className="mb-12">
                  Have a coupon?
                  <span className="text-primary">Enter your code</span>
                </h5>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="ip-discount-code mb-0">
                    <input type="text" placeholder="Enter your code" required />
                    <button className="tf-btn animate-btn" type="submit">
                      Apply Code
                    </button>
                  </div>
                </form>
              </div>
              <form
                className="tf-checkout-cart-main"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="box-ip-checkout estimate-shipping">
                  <h2 className="title type-semibold">Infomation</h2>
                  <div className="form_content">
                    <div className="cols tf-grid-layout sm-col-2">
                      <fieldset>
                        <input
                          type="text"
                          name="first-name_infor"
                          placeholder="First name"
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <input
                          type="text"
                          name="last-name_infor"
                          placeholder="Last name"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="cols tf-grid-layout sm-col-2">
                      <fieldset>
                        <input
                          type="email"
                          name="email_infor"
                          placeholder="Email address"
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <input
                          type="number"
                          name="phone_infor"
                          placeholder="Phone number"
                          required
                        />
                      </fieldset>
                    </div>
                    <fieldset>
                      <div className="tf-select">
                        <select
                          className="w-100"
                          id="shipping-country-form"
                          name="address[country]"
                          data-default=""
                        >
                          <option disabled value="">
                            Choose country / Region
                          </option>
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
                    </fieldset>
                    <div className="cols tf-grid-layout sm-col-2">
                      <fieldset>
                        <input
                          type="text"
                          name="city_infor"
                          placeholder="Town/City"
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <input
                          type="text"
                          name="street_infor"
                          placeholder="Street"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="cols tf-grid-layout sm-col-2">
                      <fieldset>
                        <div className="tf-select">
                          <select
                            id="shipping-province-form"
                            name="address[province]"
                            data-default=""
                          >
                            <option disabled value="">
                              Choose State
                            </option>
                          </select>
                        </div>
                      </fieldset>
                      <fieldset>
                        <input
                          type="number"
                          name="number_card"
                          placeholder="Postal code"
                          required
                        />
                      </fieldset>
                    </div>
                    <textarea
                      placeholder="Note about your order"
                      style={{ height: 180 }}
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="box-ip-payment">
                  <h2 className="title type-semibold">Choose Payment Option</h2>
                  <div className="payment-method-box" id="payment-method-box">
                    <div className="payment_accordion">
                      <label
                        htmlFor="direct"
                        className="payment_check checkbox-wrap"
                        data-bs-toggle="collapse"
                        data-bs-target="#direct-bank"
                        aria-controls="direct-bank"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded style-2"
                          id="direct"
                          defaultChecked
                        />
                        <span className="pay-title">Direct bank transfer</span>
                      </label>
                      <div
                        id="direct-bank"
                        className="collapse show"
                        data-bs-parent="#payment-method-box"
                      >
                        <p className="payment_body h6">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </p>
                      </div>
                    </div>
                    <div className="payment_accordion">
                      <label
                        htmlFor="credit-card"
                        className="payment_check checkbox-wrap"
                        data-bs-toggle="collapse"
                        data-bs-target="#credit-card-payment"
                        aria-controls="credit-card-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded style-2"
                          id="credit-card"
                        />
                        <span className="pay-title">Credit card</span>
                      </label>
                      <div
                        id="credit-card-payment"
                        className="collapse"
                        data-bs-parent="#payment-method-box"
                      >
                        <div className="payment_body form_content">
                          <fieldset>
                            <input type="text" placeholder="Name on card" />
                          </fieldset>
                          <fieldset className="ip-card">
                            <input type="number" placeholder="Card numbers" />
                            <div className="card-logo">
                              <img
                                alt="Payment Logo"
                                src="/images/payment/visa-pay.svg"
                                width={50}
                                height={32}
                              />
                              <img
                                alt="Payment Logo"
                                src="/images/payment/master-pay.svg"
                                width={50}
                                height={32}
                              />
                              <img
                                alt="Payment Logo"
                                src="/images/payment/amex-pay.svg"
                                width={40}
                                height={26}
                              />
                            </div>
                          </fieldset>
                          <div className="cols tf-grid-layout sm-col-2">
                            <fieldset>
                              <input type="date" />
                            </fieldset>
                            <fieldset>
                              <input type="number" placeholder="Postal code" />
                            </fieldset>
                          </div>
                          <div className="checkbox-wrap">
                            <input
                              id="save"
                              type="checkbox"
                              className="tf-check style-2"
                            />
                            <label htmlFor="save" className="h6">
                              Save card details
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="payment_accordion">
                      <label
                        htmlFor="cash-on"
                        className="payment_check checkbox-wrap"
                        data-bs-toggle="collapse"
                        data-bs-target="#cash-on-payment"
                        aria-controls="cash-on-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded style-2"
                          id="cash-on"
                        />
                        <span className="pay-title">Cash On Delivery</span>
                      </label>
                      <div
                        id="cash-on-payment"
                        className="collapse"
                        data-bs-parent="#payment-method-box"
                      />
                    </div>
                    <div className="payment_accordion">
                      <label
                        htmlFor="paypal"
                        className="payment_check checkbox-wrap"
                        data-bs-toggle="collapse"
                        data-bs-target="#paypal-payment"
                        aria-controls="paypal-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded style-2"
                          id="paypal"
                        />
                        <span className="pay-title">Paypal</span>
                      </label>
                      <div
                        id="paypal-payment"
                        className="collapse"
                        data-bs-parent="#payment-method-box"
                      />
                    </div>
                  </div>
                  <p className="h6 mb-20">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </p>
                  <div className="checkbox-wrap">
                    <input
                      id="agree"
                      type="checkbox"
                      className="tf-check style-2"
                    />
                    <label htmlFor="agree" className="h6">
                      I have read and agree to the website
                      <span className="text-primary">
                        terms and conditions *
                      </span>
                    </label>
                  </div>
                </div>
                <div className="box-ip-shipping">
                  <h2 className="title type-semibold">Shipping Method</h2>
                  <label htmlFor="freeship" className="check-ship mb-12">
                    <input
                      type="radio"
                      id="freeship"
                      className="tf-check-rounded style-2 line-black"
                      name="checkshipping"
                      defaultChecked
                    />
                    <span className="text h6">
                      <span className="">
                        Free shipping (Estimate in 01/05 - 05/05/2025)
                      </span>
                      <span className="price">$00.00</span>
                    </span>
                  </label>
                  <label htmlFor="express" className="check-ship">
                    <input
                      type="radio"
                      id="express"
                      className="tf-check-rounded style-2 line-black"
                      name="checkshipping"
                    />
                    <span className="text h6">
                      <span className="">
                        Express shipping (Estimate in 01/05 - 05/05/2025)
                      </span>
                      <span className="price fw-medium">$5.00</span>
                    </span>
                  </label>
                </div>
                <div className="button_submit">
                  <button type="submit" className="tf-btn animate-btn w-100">
                    Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="fl-sidebar-cart sticky-top">
              <div className="box-your-order">
                <h2 className="title type-semibold">Your Order</h2>
                {cartProducts.length ? (
                  <ul className="list-order-product">
                    {cartProducts.map((product, i) => (
                      <li key={i} className="order-item">
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
                          <div className="prd_select text-small">Size: XS</div>
                        </div>
                        <p className="price-prd h6">
                          ${(product.quantity * product.price).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="box-text_empty type-shop_cart">
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
                  </div>
                )}
                <ul className="list-total">
                  <li className="total-item h6">
                    <span className="fw-bold text-black">Discounts</span>
                    <span>$00.00</span>
                  </li>
                  <li className="total-item h6">
                    <span className="fw-bold text-black">Shipping</span>
                    <span>Free</span>
                  </li>
                </ul>
                <div className="last-total h5 fw-medium text-black">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
