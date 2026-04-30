import { Link } from "react-router-dom";

export default function Faqs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <ul className="faq-list">
              <li className="faq-item" id="myAccount">
                <h2 className="faq_title">My Account</h2>
                <div className="faq_wrap" id="my-account">
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#forgot-pass"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="forgot-pass"
                    >
                      <span className="text h5">
                        1. What can I do if I forgot my password?
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="forgot-pass"
                      className="collapse"
                      data-bs-parent="#my-account"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem2"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem2"
                    >
                      <span className="text h5">
                        2. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem2"
                      className="collapse"
                      data-bs-parent="#my-account"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          In hac habitasse platea dictumst. Integer venenatis
                          elit magna, eget auctor purus vestibulum volutpat.
                          Maecenas hendrerit fringilla arcu, eu euismod tellus
                          euismod quis. Orci varius natoque penatibus et magnis
                          dis parturient montes, nascetur ridiculus mus. Duis
                          purus dolor, sagittis vitae massa eget, vestibulum
                          varius ipsum. Quisque vitae leo congue nisl pharetra
                          ornare tempus quis diam. Fusce a orci fringilla arcu
                          blandit commodo id venenatis ante. Quisque quis
                          pretium ante.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem3"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem3"
                    >
                      <span className="text h5">
                        3. Maecenas rhoncus neque eu neque maximus auctor congue
                        sed erat.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem3"
                      className="collapse"
                      data-bs-parent="#my-account"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          In hac habitasse platea dictumst. Integer venenatis
                          elit magna, eget auctor purus vestibulum volutpat.
                          Maecenas hendrerit fringilla arcu, eu euismod tellus
                          euismod quis. Orci varius natoque penatibus et magnis
                          dis parturient montes, nascetur ridiculus mus. Duis
                          purus dolor, sagittis vitae massa eget, vestibulum
                          varius ipsum. Quisque vitae leo congue nisl pharetra
                          ornare tempus quis diam. Fusce a orci fringilla arcu
                          blandit commodo id venenatis ante. Quisque quis
                          pretium ante.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title"
                      data-bs-target="#lorem4"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="lorem4"
                    >
                      <span className="text h5">
                        4. Nam vel neque ut eros mollis bibendum vel ac nisl.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem4"
                      className="collapse show"
                      data-bs-parent="#my-account"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          In hac habitasse platea dictumst. Integer venenatis
                          elit magna, eget auctor purus vestibulum volutpat.
                          Maecenas hendrerit fringilla arcu, eu euismod tellus
                          euismod quis. Orci varius natoque penatibus et magnis
                          dis parturient montes, nascetur ridiculus mus. Duis
                          purus dolor, sagittis vitae massa eget, vestibulum
                          varius ipsum. Quisque vitae leo congue nisl pharetra
                          ornare tempus quis diam. Fusce a orci fringilla arcu
                          blandit commodo id venenatis ante. Quisque quis
                          pretium ante.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem5"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem5"
                    >
                      <span className="text h5">
                        5. Duis porttitor eros at quam tincidunt tempus.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem5"
                      className="collapse"
                      data-bs-parent="#my-account"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          In hac habitasse platea dictumst. Integer venenatis
                          elit magna, eget auctor purus vestibulum volutpat.
                          Maecenas hendrerit fringilla arcu, eu euismod tellus
                          euismod quis. Orci varius natoque penatibus et magnis
                          dis parturient montes, nascetur ridiculus mus. Duis
                          purus dolor, sagittis vitae massa eget, vestibulum
                          varius ipsum. Quisque vitae leo congue nisl pharetra
                          ornare tempus quis diam. Fusce a orci fringilla arcu
                          blandit commodo id venenatis ante. Quisque quis
                          pretium ante.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="faq-item" id="ordersPurchases">
                <h2 className="faq_title">Orders &amp; Purchases</h2>
                <div className="faq_wrap" id="order-and-purchase">
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem2-1"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem2-1"
                    >
                      <span className="text h5">
                        1. Donec tempor nisl commodo erat ullamcorper fringilla.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem2-1"
                      className="collapse"
                      data-bs-parent="#order-and-purchase"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem2-2"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem2-2"
                    >
                      <span className="text h5">
                        2. Suspendisse et sem in quam maximus imperdiet ac nec
                        nunc.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem2-2"
                      className="collapse"
                      data-bs-parent="#order-and-purchase"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem2-3"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem2-3"
                    >
                      <span className="text h5">
                        3. Cras fringilla ante sit amet ullamcorper placerat.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem2-3"
                      className="collapse"
                      data-bs-parent="#order-and-purchase"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem2-4"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem2-4"
                    >
                      <span className="text h5">
                        4. Donec vestibulum leo nec erat congue laoreet.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem2-4"
                      className="collapse"
                      data-bs-parent="#order-and-purchase"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem2-5"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem2-5"
                    >
                      <span className="text h5">
                        5. Vestibulum ac elit et ligula tincidunt suscipit
                        finibus vel est.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem2-5"
                      className="collapse"
                      data-bs-parent="#order-and-purchase"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="faq-item" id="returnsRefunds">
                <h2 className="faq_title">Returns &amp; Refunds</h2>
                <div className="faq_wrap" id="return-and-refund">
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem3-1"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem3-1"
                    >
                      <span className="text h5">
                        1. Nullam elementum diam vitae posuere dignissim.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem3-1"
                      className="collapse"
                      data-bs-parent="#return-and-refund"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem3-2"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem3-2"
                    >
                      <span className="text h5">
                        2. Morbi eget justo sit amet lacus scelerisque feugiat.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem3-2"
                      className="collapse"
                      data-bs-parent="#return-and-refund"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem3-3"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem3-3"
                    >
                      <span className="text h5">
                        3. Mauris vel diam a dui consectetur vehicula.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem3-3"
                      className="collapse"
                      data-bs-parent="#return-and-refund"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem3-4"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem3-4"
                    >
                      <span className="text h5">
                        4. Pellentesque aliquam leo in justo blandit, quis
                        efficitur nulla facilisis.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem3-4"
                      className="collapse"
                      data-bs-parent="#return-and-refund"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem3-5"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem3-5"
                    >
                      <span className="text h5">
                        5. Ut volutpat justo sed lorem luctus semper.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem3-5"
                      className="collapse"
                      data-bs-parent="#return-and-refund"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="faq-item" id="shippingTracking">
                <h2 className="faq_title">Shipping &amp; Tracking</h2>
                <div className="faq_wrap" id="shipping-and-tracking">
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem6-1"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem6-1"
                    >
                      <span className="text h5">
                        1. Nullam elementum diam vitae posuere dignissim.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem6-1"
                      className="collapse"
                      data-bs-parent="#shipping-and-tracking"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem6-2"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem6-2"
                    >
                      <span className="text h5">
                        2. Morbi eget justo sit amet lacus scelerisque feugiat.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem6-2"
                      className="collapse"
                      data-bs-parent="#shipping-and-tracking"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem6-3"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem6-3"
                    >
                      <span className="text h5">
                        3. Mauris vel diam a dui consectetur vehicula.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem6-3"
                      className="collapse"
                      data-bs-parent="#shipping-and-tracking"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem6-4"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem6-4"
                    >
                      <span className="text h5">
                        4. Pellentesque aliquam leo in justo blandit, quis
                        efficitur nulla facilisis.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem6-4"
                      className="collapse"
                      data-bs-parent="#shipping-and-tracking"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem6-5"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem6-5"
                    >
                      <span className="text h5">
                        5. Ut volutpat justo sed lorem luctus semper.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem6-5"
                      className="collapse"
                      data-bs-parent="#shipping-and-tracking"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="faq-item" id="feesBilling">
                <h2 className="faq_title">Fees &amp; Billing</h2>
                <div className="faq_wrap" id="fee-and-bill">
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem4-1"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem4-1"
                    >
                      <span className="text h5">
                        1. Nullam elementum diam vitae posuere dignissim.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem4-1"
                      className="collapse"
                      data-bs-parent="#fee-and-bill"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem4-2"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem4-2"
                    >
                      <span className="text h5">
                        2. Morbi eget justo sit amet lacus scelerisque feugiat.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem4-2"
                      className="collapse"
                      data-bs-parent="#fee-and-bill"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem4-3"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem4-3"
                    >
                      <span className="text h5">
                        3. Mauris vel diam a dui consectetur vehicula.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem4-3"
                      className="collapse"
                      data-bs-parent="#fee-and-bill"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem4-4"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem4-4"
                    >
                      <span className="text h5">
                        4. Pellentesque aliquam leo in justo blandit, quis
                        efficitur nulla facilisis.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem4-4"
                      className="collapse"
                      data-bs-parent="#fee-and-bill"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem4-5"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem4-5"
                    >
                      <span className="text h5">
                        5. Ut volutpat justo sed lorem luctus semper.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem4-5"
                      className="collapse"
                      data-bs-parent="#fee-and-bill"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="faq-item" id="otherTopic">
                <h2 className="faq_title">Other Topic</h2>
                <div className="faq_wrap" id="orther-topic">
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem5-1"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem5-1"
                    >
                      <span className="text h5">
                        1. Nullam elementum diam vitae posuere dignissim.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem5-1"
                      className="collapse"
                      data-bs-parent="#orther-topic"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem5-2"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem5-2"
                    >
                      <span className="text h5">
                        2. Morbi eget justo sit amet lacus scelerisque feugiat.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem5-2"
                      className="collapse"
                      data-bs-parent="#orther-topic"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem5-3"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem5-3"
                    >
                      <span className="text h5">
                        3. Mauris vel diam a dui consectetur vehicula.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem5-3"
                      className="collapse"
                      data-bs-parent="#orther-topic"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem5-4"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem5-4"
                    >
                      <span className="text h5">
                        4. Pellentesque aliquam leo in justo blandit, quis
                        efficitur nulla facilisis.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem5-4"
                      className="collapse"
                      data-bs-parent="#orther-topic"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-faq accor-mn-pl">
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#lorem5-5"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="lorem5-5"
                    >
                      <span className="text h5">
                        5. Ut volutpat justo sed lorem luctus semper.
                      </span>
                      <span className="icon">
                        <span className="ic-accordion-custom" />
                      </span>
                    </div>
                    <div
                      id="lorem5-5"
                      className="collapse"
                      data-bs-parent="#orther-topic"
                    >
                      <div className="accordion-body">
                        <p className="h6">
                          Simply add your favorite items to the shopping cart,
                          then proceed to checkout where you fill in your
                          shipping and payment details before confirming the
                          purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 d-none d-lg-block">
            <div className="blog-sidebar sidebar-content-wrap sticky-top">
              <div className="sidebar-item">
                <h4 className="sb-title">Frequently asked questions</h4>
                <form
                  className="form-search_faq style-btn-abs-end"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="style-stroke"
                    type="text"
                    placeholder="Enter your question or keyword"
                    required
                  />
                  <button className="btn-submit link" type="submit">
                    <i className="icon icon-magnifying-glass" />
                  </button>
                </form>
              </div>
              <div className="sidebar-item">
                <h4 className="sb-title">Category</h4>
                <ul className="sb-category">
                  <li>
                    <a href="#myAccount" className="h6 link">
                      My account
                    </a>
                  </li>
                  <li>
                    <a href="#ordersPurchases" className="h6 link">
                      Orders &amp; purchases
                    </a>
                  </li>
                  <li>
                    <a href="#returnsRefunds" className="h6 link">
                      Returns &amp; Refunds
                    </a>
                  </li>
                  <li>
                    <a href="#shippingTracking" className="h6 link">
                      Shipping &amp; Tracking
                    </a>
                  </li>
                  <li>
                    <a href="#feesBilling" className="h6 link">
                      Fees &amp; billing
                    </a>
                  </li>
                  <li>
                    <a href="#otherTopic" className="h6 link">
                      Other topic
                    </a>
                  </li>
                </ul>
              </div>
              <div className="sidebar-item">
                <div className="sb-banner hover-img">
                  <Link to={`/shop-default`} className="image img-style">
                    <img
                      src="/images/blog/side-banner.jpg"
                      alt="Banner"
                      width={648}
                      height={950}
                    />
                  </Link>
                  <div className="content">
                    <h5 className="sub-title text-primary">Sale Upto 45%</h5>
                    <h2 className="fw-semibold title">
                      <a href="#" className="text-white link">
                        Fall winter collection
                      </a>
                    </h2>
                    <Link
                      to={`/shop-default`}
                      className="tf-btn btn-white animate-btn animate-dark"
                    >
                      Shop now
                      <i className="icon icon-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
