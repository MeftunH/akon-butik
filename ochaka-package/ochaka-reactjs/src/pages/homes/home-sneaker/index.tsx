import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/header/Header1";
import BannerCountdown from "@/components/homes/home-sneaker/BannerCountdown";
import Categories from "@/components/homes/home-sneaker/Categories";
import Collections from "@/components/homes/home-sneaker/Collections";
import Hero from "@/components/homes/home-sneaker/Hero";
import MarqueeSlider from "@/components/common/MarqueeSlider";
import Products1 from "@/components/homes/home-sneaker/Products1";
import Products2 from "@/components/homes/home-sneaker/Products2";
import Testimonials from "@/components/homes/home-sneaker/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Sneaker || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageSneaker() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 parentClass="tf-header header-fix" />
      <Hero />
      <MarqueeSlider />
      <Categories />
      <Collections />
      <Products1 />
      <Testimonials />
      <Products2 />
      <BannerCountdown />
      <Features parentClass="flat-spacing" />
      <Footer1 />
    </>
  );
}
