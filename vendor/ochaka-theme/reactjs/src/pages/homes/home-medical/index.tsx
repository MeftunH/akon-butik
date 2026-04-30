import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import FixedHeader2 from "@/components/header/FixedHeader2";
import Header11 from "@/components/header/Header11";
import Topbar4 from "@/components/header/Topbar4";
import Blogs from "@/components/homes/home-medical/Blogs";
import Categories from "@/components/homes/home-medical/Categories";
import Collections from "@/components/homes/home-medical/Collections";
import Hero from "@/components/homes/home-medical/Hero";
import Products1 from "@/components/homes/home-medical/Products1";
import Products2 from "@/components/homes/home-medical/Products2";
import Products3 from "@/components/homes/home-medical/Products3";
import Testimonials from "@/components/homes/home-medical/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Medical || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageMedical() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 isFullWidth={false} />
      <FixedHeader2
        haContainer
        parentClass="tf-header header-fixed style-5 bg-white primary-3 mb-16"
      />
      <Header11 />
      <Hero />
      <Categories />
      <Products1 />
      <Collections />
      <Products2 />
      <Products3 />
      <Testimonials />
      <Blogs />
      <Features parentClass="flat-spacing pt-0" />
      <Footer1 />
    </>
  );
}
