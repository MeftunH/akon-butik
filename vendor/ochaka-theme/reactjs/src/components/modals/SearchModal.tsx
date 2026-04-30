import { Link } from "react-router-dom";

import { products } from "@/data/products";

export default function SearchModal() {
  return (
    <div className="modal modalCentered fade modal-search" id="search">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="modal"
          />
          <div>
            <form
              className="form-search style-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <fieldset>
                <input
                  type="text"
                  placeholder="Search item"
                  className="style-stroke"
                  name="text"
                  tabIndex={0}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <button type="submit" className="link">
                <i className="icon icon-magnifying-glass" />
              </button>
            </form>
            <ul className="quick-link-list">
              <li>
                <Link
                  to={`/shop-default-list`}
                  className="link-item text-main h6 link"
                >
                  Graphic tees
                </Link>
              </li>
              <li>
                <Link
                  to={`/shop-default-list`}
                  className="link-item text-main h6 link"
                >
                  Plain t-shirts
                </Link>
              </li>
              <li>
                <Link
                  to={`/shop-default-list`}
                  className="link-item text-main h6 link"
                >
                  Vintage t-shirts
                </Link>
              </li>
              <li>
                <Link
                  to={`/shop-default-list`}
                  className="link-item text-main h6 link"
                >
                  Band tees
                </Link>
              </li>
              <li>
                <Link
                  to={`/shop-default-list`}
                  className="link-item text-main h6 link"
                >
                  Custom t-shirts
                </Link>
              </li>
              <li>
                <Link
                  to={`/shop-default-list`}
                  className="link-item text-main h6 link"
                >
                  Oversized t-shirts
                </Link>
              </li>
              <li>
                <Link
                  to={`/shop-default-list`}
                  className="link-item text-main h6 link"
                >
                  Crew neck t-shirts
                </Link>
              </li>
            </ul>
          </div>
          <div className="view-history-wrap">
            <h4 className="title">History</h4>
            <div className="view-history-list">
              <Link
                className="item text-main link h6"
                to={`/shop-default-list`}
              >
                <span>High Visibility T Shirt Short Sleeve Reflective</span>
                <i className="icon icon-arrow-top-right" />
              </Link>
              <Link
                className="item text-main link h6"
                to={`/shop-default-list`}
              >
                <span>Short sleeve round neck t-shirt</span>
                <i className="icon icon-arrow-top-right" />
              </Link>
              <Link
                className="item text-main link h6"
                to={`/shop-default-list`}
              >
                <span>Fashionable oversized hoodie for women</span>
                <i className="icon icon-arrow-top-right" />
              </Link>
              <Link
                className="item text-main link h6"
                to={`/shop-default-list`}
              >
                <span>Queen fashion long sleeve shirt, basic t-shirt</span>
                <i className="icon icon-arrow-top-right" />
              </Link>
              <Link
                className="item text-main link h6"
                to={`/shop-default-list`}
              >
                <span>
                  Lee Women's Wrinkle Free Relaxed Fit Straight Leg Pant
                </span>
                <i className="icon icon-arrow-top-right" />
              </Link>
              <Link
                className="item text-main link h6"
                to={`/shop-default-list`}
              >
                <span>
                  Women's Summer Oversized T-Shirt Casual Office Fashion
                </span>
                <i className="icon icon-arrow-top-right" />
              </Link>
            </div>
          </div>
          <div className="trend-product-wrap">
            <div className="heading">
              <h4 className="title flex-grow-1">Trending product</h4>
              <a
                href="#"
                className="tf-btn-line has-icon none-line fw-medium fs-18 text-normal"
              >
                View All Product
                <i className="icon icon-caret-circle-right" />
              </a>
            </div>
            <div className="trend-product-inner">
              <div className="trend-product-list">
                {products.slice(0, 2).map((product, i) => (
                  <div key={i} className="trend-product-item">
                    <div className="image">
                      <img
                        className="lazyload"
                        src={product.imgSrc}
                        alt="Product"
                        width={1044}
                        height={1392}
                      />
                    </div>
                    <div className="content">
                      <div className="text-small text-main-2 sub">T-shirt</div>
                      <h6 className="title">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="link"
                        >
                          {product.title}
                        </Link>
                      </h6>
                      <div className="price-wrap">
                        {product.oldPrice ? (
                          <span className="price-old h6 fw-normal">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="price-new h6">
                          {" "}
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="trend-product-list">
                {products.slice(2, 4).map((product, i) => (
                  <div key={i} className="trend-product-item">
                    <div className="image">
                      <img
                        className="lazyload"
                        src={product.imgSrc}
                        alt="Product"
                        width={1044}
                        height={1392}
                      />
                    </div>
                    <div className="content">
                      <div className="text-small text-main-2 sub">T-shirt</div>
                      <h6 className="title">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="link"
                        >
                          {product.title}
                        </Link>
                      </h6>
                      <div className="price-wrap">
                        {product.oldPrice ? (
                          <span className="price-old h6 fw-normal">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="price-new h6">
                          {" "}
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
