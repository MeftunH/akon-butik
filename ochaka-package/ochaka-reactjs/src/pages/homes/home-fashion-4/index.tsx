import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import FixedHeader from "@/components/header/FixedHeader";
import Header4 from "@/components/header/Header4";
import Banner from "@/components/homes/home-fashion-4/Banner";
import Banner2 from "@/components/homes/home-fashion-4/Banner2";
import Blogs from "@/components/homes/home-fashion-4/Blogs";
import Collections from "@/components/homes/home-fashion-4/Collections";
import Hero from "@/components/homes/home-fashion-4/Hero";
import MarqueeSection from "@/components/homes/home-fashion-4/MarqueeSection";
import Products1 from "@/components/homes/home-fashion-4/Products1";
import Products2 from "@/components/homes/home-fashion-4/Products2";
import ShopGram from "@/components/homes/home-fashion-4/ShopGram";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Fashion 04 || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageFashion4() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <FixedHeader />
      <Header4 />
      <Banner />
      <Hero />
      <MarqueeSection />
      <Products1 />
      <Collections />
      <Products2 />
      <Banner2 />
      <Features parentClass="flat-spacing" />
      <Blogs />
      <ShopGram />
      <Footer1 />
    </>
  );
}
