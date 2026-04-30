import Features from "@/components/common/Features";

import Footer2 from "@/components/footers/Footer2";
import FixedHeader2 from "@/components/header/FixedHeader2";
import Header10 from "@/components/header/Header10";
import Topbar4 from "@/components/header/Topbar4";
import BannerCountdown from "@/components/homes/home-organic/BannerCountdown";
import Categories from "@/components/homes/home-organic/Categories";
import Collections from "@/components/homes/home-organic/Collections";
import CouponSection from "@/components/homes/home-organic/CouponSection";
import Hero from "@/components/homes/home-organic/Hero";
import Products1 from "@/components/homes/home-organic/Products1";
import Products2 from "@/components/homes/home-organic/Products2";
import Products3 from "@/components/homes/home-organic/Products3";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Organic || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageOrganic() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 />
      <FixedHeader2 parentClass="tf-header header-fixed style-5 bg-white primary-2" />
      <Header10 />
      <Hero />
      <Categories />
      <Collections />
      <Products1 />
      <BannerCountdown />
      <Products2 />
      <CouponSection />
      <Products3 />
      <Features parentClass="flat-spacing pt-0" />
      <Footer2 />
    </>
  );
}
