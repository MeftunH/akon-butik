import { Link, useNavigate, useParams } from "react-router-dom";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/header/Header1";
import Topbar1 from "@/components/header/Topbar1";
import CustomerPhotos from "@/components/product-details/CustomerPhotos";
import ProductSpecifications1 from "@/components/product-details/ProductSpecifications1";
import Details1 from "@/components/product-details/Details1";
import Features from "@/components/product-details/Features";
import RelatedProducts from "@/components/product-details/RelatedProducts";
import SimilerProducts from "@/components/product-details/SimilerProducts";
import StickyProduct from "@/components/product-details/StickyProduct";

import { allProducts } from "@/data/products";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Product Details || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};

export default function ProductDetailsPageGrid2() {
  const navigate = useNavigate();
  let params = useParams();
  const id = params.id;

  const product = allProducts.find((p) => p.id == Number(id));

  if (!product) {
    navigate("/404");
    return null;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 />
      <Header1 parentClass="tf-header header-fix bg-off-white" />
      <section className="s-page-title style-2">
        <div className="container">
          <div className="content">
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
                <Link to={`/shop-default`} className="h6 link">
                  Shop
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <h6 className="current-page fw-normal">{product.title}</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Details1
        product={product}
        features={["varientPicker"]}
        mediaLayout="grid-2"
      />
      <CustomerPhotos />
      <ProductSpecifications1 />
      <Features />
      <SimilerProducts />
      <RelatedProducts />
      <StickyProduct />
      <Footer1 />
    </>
  );
}
