import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Invoice || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function InvoicePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="wrapper-invoice p-0">
        <div className="s-invoice">
          <div className="container">
            <p className="heading h1 text-black fw-medium text-center">
              Ochaka. Invoice
            </p>
            <div className="wg-invoice">
              <div className="invoice-head">
                <h2 className="invoice_number">Number #0079347644</h2>
                <a href="#" className="invoice_download-btn tf-btn style-line">
                  Download
                  <i className="icon icon-download" />
                </a>
              </div>
              <div className="invoice-info">
                <div className="invoice-info_item invoice-info_date">
                  <h5 className="invoice_label fw-semibold">Invoice date:</h5>
                  <p className="invoice_value h6 ">April 8, 2025</p>
                </div>
                <div className="invoice-info_item invoice-info_date">
                  <h5 className="invoice_label fw-semibold">Due date:</h5>
                  <p className="invoice_value h6 ">April 8, 2025</p>
                </div>
                <div className="invoice-info_item">
                  <h5 className="invoice_label fw-semibold">Supplier:</h5>
                  <p className="invoice_value h6">
                    <span className="fw-medium text-black">Themesflat LLC</span>
                    8500 Lorem Street Chicago, IL 55030 Dolor sit amet
                  </p>
                </div>
                <div className="invoice-info_item">
                  <h5 className="invoice_label fw-semibold">Invoice date:</h5>
                  <p className="invoice_value h6">
                    <span className="fw-medium text-black">
                      Brooklyn Simmons
                    </span>
                    2972 Westheimer Rd. Santa Ana, Illinois 85486
                  </p>
                </div>
              </div>
              <div className="overflow-auto">
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Price</th>
                      <th>VAT (20%)</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="h6 invoice__desc">Standard Plan</td>
                      <td className="h6 invoice__price">$20.00</td>
                      <td className="h6 invoice__vat">$10.00</td>
                      <td className="h6 invoice__total">$60.00</td>
                    </tr>
                    <tr>
                      <td className="h6 invoice__desc">Extra Plan</td>
                      <td className="h6 invoice__price">$20.00</td>
                      <td className="h6 invoice__vat">$10.00</td>
                      <td className="h6 invoice__total">$60.00</td>
                    </tr>
                    <tr>
                      <td className="h6 invoice__desc fw-semibold">
                        Total Due
                      </td>
                      <td />
                      <td />
                      <td className="h6 invoice__amount fw-semibold text-primary">
                        $60.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="invoice-social">
                <li>
                  <Link to={`/`} className="invoice_link link h6">
                    <i className="icon icon-global" />
                    www.ochaka.com
                  </Link>
                </li>
                <li>
                  <a href="tel:+88001234567" className="invoice_link link h6">
                    <i className="icon icon-phone" />
                    +8(800) 123 4567
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:themesflat@support.com"
                    className="invoice_link link h6"
                  >
                    <i className="icon icon-envelope-simple" />
                    themesflat@support.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
