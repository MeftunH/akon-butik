import Footer1 from "@/components/footers/Footer1";
import FixedHeader2 from "@/components/header/FixedHeader2";
import Header14 from "@/components/header/Header14";
import Topbar4 from "@/components/header/Topbar4";
import Blogs from "@/components/homes/home-car-auto/Blogs";
import Brands from "@/components/homes/home-car-auto/Brands";
import Categories from "@/components/homes/home-car-auto/Categories";
import Collections from "@/components/homes/home-car-auto/Collections";
import CountdownBanner from "@/components/homes/home-car-auto/CountdownBanner";
import CouponBanner from "@/components/homes/home-car-auto/CouponBanner";
import Hero from "@/components/homes/home-car-auto/Hero";
import Products1 from "@/components/homes/home-car-auto/Products1";
import Products2 from "@/components/homes/home-car-auto/Products2";
import Testimonials from "@/components/homes/home-car-auto/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Car Auto || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageCarAuto() {
  return (
    <>
      <MetaComponent meta={metadata} /> <Topbar4 isFullWidth={false} />
      <FixedHeader2
        haContainer
        parentClass="tf-header header-fixed style-5 bg-white primary-5 mb-16"
      />
      <Header14 />
      <Hero />
      <Collections />
      <Categories />
      <Products1 />
      <CountdownBanner />
      <Products2 />
      <Brands />
      <CouponBanner />
      <Testimonials />
      <Blogs />
      <Footer1 parentClass="tf-footer style-color-white style-4 bg-black" />
    </>
  );
}
