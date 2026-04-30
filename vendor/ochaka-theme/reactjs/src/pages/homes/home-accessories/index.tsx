import Footer5 from "@/components/footers/Footer5";
import FixedHeader2 from "@/components/header/FixedHeader2";
import Header13 from "@/components/header/Header13";
import Topbar4 from "@/components/header/Topbar4";
import Blogs from "@/components/homes/home-accessories/Blogs";
import Categories from "@/components/homes/home-accessories/Categories";
import Hero from "@/components/homes/home-accessories/Hero";
import Products1 from "@/components/homes/home-accessories/Products1";
import Products2 from "@/components/homes/home-accessories/Products2";
import Products3 from "@/components/homes/home-accessories/Products3";
import Products4 from "@/components/homes/home-accessories/Products4";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Accessories || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageAccessories() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 isFullWidth={false} />
      <Header13 />
      <FixedHeader2
        haContainer
        parentClass=" tf-header header-fixed style-5 bg-white primary-4 mb-16"
      />
      <Hero />
      <Categories />
      <div className="body-lv-2 bg-ghost-white flat-spacing">
        <Products1 />
        <Products4 />
        <Products2 />
        <Products3 />
        <Blogs />
        <Footer5 />
      </div>
    </>
  );
}
