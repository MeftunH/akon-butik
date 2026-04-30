import { Link } from "react-router-dom";

import BlogList2 from "@/components/blogs/BlogList2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/header/Header1";
import Topbar1 from "@/components/header/Topbar1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blog List 02 || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function BlogListPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 />
      <Header1 parentClass="tf-header header-fix" />
      <section
        className="s-page-title parallaxie has-bg"
        style={{ backgroundImage: 'url("/images/section/blog.jpg")' }}
      >
        <div className="container position-relative z-5">
          <div className="content">
            <h1 className="title-page text-white">Blog List</h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link to={`/`} className="h6 text-white link">
                  Home
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right text-white" />
              </li>
              <li>
                <h6 className="current-page fw-normal text-white">Blog List</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <BlogList2 />

      <Footer1 />
    </>
  );
}
