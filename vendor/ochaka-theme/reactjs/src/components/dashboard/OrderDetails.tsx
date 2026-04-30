import { Link } from "react-router-dom";

import Sidebar from "./Sidebar";

export default function OrderDetails() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 d-none d-xl-block">
            <Sidebar />
          </div>
          <div className="col-xl-9">
            <div className="my-account-content flat-animate-tab">
              <div className="account-order_detail">
                <div className="order-detail_image">
                  <img
                    className="lazyload"
                    src="/images/products/product-21.jpg"
                    alt=""
                    width={1044}
                    height={1392}
                  />
                </div>
                <div className="order-detail_content tf-grid-layout">
                  <div className="detail-content_info">
                    <div className="detail-info_status bg-primary h6">
                      In Progress
                    </div>
                    <div className="detail-info_prd">
                      <p className="prd_name h4 text-black">
                        Fashionable workout tops
                      </p>
                      <div className="price-wrap">
                        <span className="price-old h6 fw-normal">$99,99</span>
                        <span className="price-new h6 text-main fw-semibold">
                          $69,99
                        </span>
                      </div>
                    </div>
                    <div className="detail-info_item">
                      <p className="info-item_label">Item</p>
                      <p className="info-item_value">Fashion</p>
                    </div>
                    <div className="detail-info_item">
                      <p className="info-item_label">Order date</p>
                      <p className="info-item_value">April 1, 2025 - 09:40</p>
                    </div>
                    <div className="detail-info_item">
                      <p className="info-item_label">Shipping carrier</p>
                      <p className="info-item_value">Themesflat</p>
                    </div>
                    <div className="detail-info_item">
                      <p className="info-item_label">Address</p>
                      <p className="info-item_value">
                        1901 Thornridge Cir. Shiloh, Hawaii 81063
                      </p>
                    </div>
                  </div>
                  <span className="br-line d-flex" />
                  <div>
                    <Link to={`/shop-default`} className="tf-btn style-line">
                      View Store
                      <i className="icon icon-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="account-order_tab">
                <ul className="tab-order_detail" role="tablist">
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#order-history"
                      data-bs-toggle="tab"
                      className="tf-btn-line tf-btn-tab active"
                    >
                      <span className="h4"> Order history </span>
                    </a>
                  </li>
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#item-detail"
                      data-bs-toggle="tab"
                      className="tf-btn-line tf-btn-tab"
                    >
                      <span className="h4"> Item details </span>
                    </a>
                  </li>
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#courier"
                      data-bs-toggle="tab"
                      className="tf-btn-line tf-btn-tab"
                    >
                      <span className="h4"> Courier </span>
                    </a>
                  </li>
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#receiver"
                      data-bs-toggle="tab"
                      className="tf-btn-line tf-btn-tab"
                    >
                      <span className="h4"> Receiver </span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content overflow-hidden">
                  <div
                    className="tab-pane active show"
                    id="order-history"
                    role="tabpanel"
                  >
                    <div className="order-timeline">
                      <div className="timeline-step completed">
                        <div className="timeline_icon">
                          <span className="icon">
                            <i className="icon-check-1" />
                          </span>
                        </div>
                        <div className="timeline_content">
                          <h5 className="step-title fw-semibold">
                            Product shipped
                          </h5>
                          <h6 className="step-date fw-normal">
                            April 3, 2025 - 10:52
                          </h6>
                          <p className="step-detail h6">
                            <span className="fw-semibold text-black">
                              Shipping carrier:
                            </span>
                            DHL Home - Logistics
                          </p>
                          <p className="step-detail h6">
                            <span className="fw-semibold text-black">
                              Estimated delivery date:
                            </span>
                            April 6, 2025 - 06:42
                          </p>
                        </div>
                      </div>
                      <div className="timeline-step completed">
                        <div className="timeline_icon">
                          <span className="icon">
                            <i className="icon-truck" />
                          </span>
                        </div>
                        <div className="timeline_content">
                          <h5 className="step-title fw-semibold">
                            Product returned
                          </h5>
                          <h6 className="step-date fw-normal">
                            April 4, 2025 - 14:30
                          </h6>
                          <p className="step-detail h6">
                            Return method: UPS Pickup
                          </p>
                          <p className="step-detail h6">
                            Return authorization: RA987654
                          </p>
                        </div>
                      </div>
                      <div className="timeline-step">
                        <div className="timeline_icon">
                          <span className="icon">
                            <i className="icon-check-1" />
                          </span>
                        </div>
                        <div className="timeline_content">
                          <h5 className="step-title fw-semibold">
                            Product delivered
                          </h5>
                          <h6 className="step-date fw-normal mb-0">
                            April 6, 2025 - 07:15
                          </h6>
                        </div>
                      </div>
                      <div className="timeline-step">
                        <div className="timeline_icon">
                          <span className="icon">
                            <i className="icon-check-1" />
                          </span>
                        </div>
                        <div className="timeline_content">
                          <h5 className="step-title fw-semibold">
                            Order placed
                          </h5>
                          <h6 className="step-date fw-normal mb-0">
                            April 6, 2025 - 07:15
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="item-detail" role="tabpanel">
                    <div className="order-item_detail">
                      <div className="prd-info">
                        <div className="info_image">
                          <img
                            className="lazyload"
                            src="/images/products/product-21.jpg"
                            alt="Product"
                            width={1044}
                            height={1392}
                          />
                        </div>
                        <div className="info_detail">
                          <Link
                            to={`/shop-default`}
                            className="link info-name h4"
                          >
                            Summer Linen Pants
                          </Link>
                          <p className="info-price">
                            Price:
                            <span className="fw-semibold h6 text-black">
                              $32,00
                            </span>
                          </p>
                          <p className="info-variant">
                            Size:
                            <span className="fw-semibold h6 text-black">
                              XL
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="prd-price">
                        <div className="price_total">
                          <span>Total price:</span>
                          <span className="fw-semibold h6 text-black">
                            $32,00
                          </span>
                        </div>
                        <p className="price_dis">
                          <span>Total discounts:</span>
                          <span className="fw-semibold h6 text-black">
                            $32,00
                          </span>
                        </p>
                      </div>
                      <div className="prd-order_total">
                        <span>Order total</span>
                        <span className="fw-semibold h6 text-black">
                          $32,00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="courier" role="tabpanel">
                    <p className="h6 text-courier h6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer convallis velit erat, at bibendum leo lacinia
                      faucibus. Donec quis eleifend enim. Phasellus hendrerit
                      pellentesque augue ac scelerisque. Nunc tristique maximus
                      dignissim. Sed porta facilisis augue, iaculis ullamcorper
                      magna fringilla nec. In hac habitasse platea dictumst.
                      Aenean quam lectus, vulputate non ultrices nec, ornare a
                      velit. Vestibulum lobortis felis non fringilla cursus.
                      Suspendisse odio est, fermentum quis sodales ut, hendrerit
                      ut velit. Pellentesque pellentesque ligula et elit
                      placerat, quis finibus quam consequat.
                    </p>
                  </div>
                  <div className="tab-pane" id="receiver" role="tabpanel">
                    <div className="order-receiver">
                      <div className="recerver_text h6">
                        <span className="text">Order Number:</span>
                        <span className="text_info">#19204</span>
                      </div>
                      <div className="recerver_text h6">
                        <span className="text">Date:</span>
                        <span className="text_info">April 1, 2025 - 09:40</span>
                      </div>
                      <div className="recerver_text h6">
                        <span className="text">Total:</span>
                        <span className="text_info">$32,00</span>
                      </div>
                      <div className="recerver_text h6">
                        <span className="text">Payment Methods:</span>
                        <span className="text_info">Cash on Delivery</span>
                      </div>
                    </div>
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
