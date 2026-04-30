import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header9 from "@/components/header/Header9";
import Topbar3 from "@/components/header/Topbar3";
import BannerCountdown from "@/components/homes/home-book/BannerCountdown";
import Categories from "@/components/homes/home-book/Categories";
import Collections from "@/components/homes/home-book/Collections";
import CouponSection from "@/components/homes/home-book/CouponSection";
import Hero from "@/components/homes/home-book/Hero";
import Products1 from "@/components/homes/home-book/Products1";
import Products2 from "@/components/homes/home-book/Products2";
import Products3 from "@/components/homes/home-book/Products3";
import Products4 from "@/components/homes/home-book/Products4";
import Testimonials from "@/components/homes/home-book/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Book || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageBook() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar3 />
      <Header9 />
      <Hero />
      <Features parentClass="flat-spacing" />
      <Categories />
      <BannerCountdown />
      <Products1 />
      <Collections />
      <Products2 />
      <Products3 />
      <Products4 />
      <CouponSection />
      <Testimonials />
      <Footer1 />
    </>
  );
}
