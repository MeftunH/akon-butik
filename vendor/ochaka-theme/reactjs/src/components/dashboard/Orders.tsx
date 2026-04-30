import { Link } from "react-router-dom";

import Sidebar from "./Sidebar";
import { orders } from "@/data/products";

export default function Orders() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 d-none d-xl-block">
            <Sidebar />
          </div>
          <div className="col-xl-9">
            <div className="my-account-content">
              <h2 className="account-title type-semibold">My Order</h2>
              <div className="overflow-auto">
                <table className="table-my_order">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Products</th>
                      <th>Pricing</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index} className="tb-order-item">
                        <td className="tb-order_code">{order.code}</td>
                        <td>
                          <div className="tb-order_product">
                            <Link
                              to={`/product-detail/${order.id}`}
                              className="img-prd"
                            >
                              <img
                                className="lazyload"
                                src={order.imgSrc}
                                alt={order.alt}
                                width={1044}
                                height={1392}
                              />
                            </Link>
                            <div className="infor-prd">
                              <h6>
                                <Link
                                  to={`/product-detail/${order.id}`}
                                  className="prd_name link"
                                >
                                  {order.title}
                                </Link>
                              </h6>
                              <p className="prd_select text-small">
                                {order.category} <span>Size: {order.size}</span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="tb-order_price">
                          ${order.price.toFixed(2)}
                        </td>
                        <td>
                          <div
                            className={`tb-order_status ${order.statusClass}`}
                          >
                            {order.status}
                          </div>
                        </td>
                        <td className="tb-order_action">
                          <Link
                            to={`/account-orders-detail`}
                            className="link fw-semibold"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="wd-full wg-pagination mt-4">
                <a href="#" className="pagination-item h6 direct">
                  <i className="icon icon-caret-left" />
                </a>
                <a href="#" className="pagination-item h6">
                  1
                </a>
                <span className="pagination-item h6 active">2</span>
                <a href="#" className="pagination-item h6">
                  3
                </a>
                <a href="#" className="pagination-item h6">
                  4
                </a>
                <a href="#" className="pagination-item h6">
                  5
                </a>
                <a href="#" className="pagination-item h6 direct">
                  <i className="icon icon-caret-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
