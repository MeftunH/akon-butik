import Features from "@/components/common/Features";
import MarqueeSlider from "@/components/common/MarqueeSlider";

import Footer6 from "@/components/footers/Footer6";
import Header1 from "@/components/header/Header1";
import Topbar5 from "@/components/header/Topbar5";
import Blogs from "@/components/homes/home-travel/Blogs";
import Collections from "@/components/homes/home-travel/Collections";
import Collections2 from "@/components/homes/home-travel/Collections2";
import Hero from "@/components/homes/home-travel/Hero";
import ParallaxBanner from "@/components/homes/home-travel/ParallaxBanner";
import Products1 from "@/components/homes/home-travel/Products1";
import Products2 from "@/components/homes/home-travel/Products2";
import ShopGram from "@/components/homes/home-travel/ShopGram";
import SingleProduct from "@/components/homes/home-travel/SingleProduct";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Travel || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageTravel() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar5 parentClass="themesFlat bg-deep-green" />
      <Header1 parentClass="tf-header header-fix" />
      <Hero />
      <Collections />
      <Products1 />
      <ParallaxBanner />
      <MarqueeSlider parentClass="themesFlat bg-deep-green" />
      <Collections2 />
      <Products2 />
      <SingleProduct />
      <Blogs />
      <Features parentClass="flat-spacing pt-0" />
      <ShopGram />
      <Footer6 parentClass="tf-footer style-color-white style-4  bg-deep-green" />
    </>
  );
}
