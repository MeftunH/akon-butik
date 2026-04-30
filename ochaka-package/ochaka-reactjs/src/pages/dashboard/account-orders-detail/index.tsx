import { Link } from "react-router-dom";

import OrderDetails from "@/components/dashboard/OrderDetails";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Account Order Details || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function AccountOrderDetailsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">My Account</h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link to={`/`} className="h6 link">
                  Home
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <h6 className="current-page fw-normal">My account</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <OrderDetails />
    </>
  );
}
