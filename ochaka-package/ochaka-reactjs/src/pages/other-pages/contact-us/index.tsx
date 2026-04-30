import { Link } from "react-router-dom";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/header/Header1";
import Topbar1 from "@/components/header/Topbar1";
import Contact1 from "@/components/other-pages/contact/Contact1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Contact Us || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function ContactUsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 />
      <Header1 parentClass="tf-header header-fix" />
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">Contact Us</h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link to={`/index`} className="h6 link">
                  Home
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <h6 className="current-page fw-normal">Contact Us</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Contact1 />
      <Footer1 />
    </>
  );
}
