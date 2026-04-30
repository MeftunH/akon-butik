import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/header/Header3";
import Categories from "@/components/homes/home-fashion-3/Categories";
import Collections from "@/components/homes/home-fashion-3/Collections";
import Collections2 from "@/components/homes/home-fashion-3/Collections2";
import Hero from "@/components/homes/home-fashion-3/Hero";
import Products1 from "@/components/homes/home-fashion-3/Products1";
import ShopGram from "@/components/homes/home-fashion-3/ShopGram";
import Testimonials from "@/components/homes/home-fashion-3/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Fashion 03 || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageFashion3() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header3 />
      <Hero />
      <Categories />
      <Products1 />
      <Collections />
      <Testimonials />
      <Features lineTop parentClass="themesFlat" />
      <Collections2 />
      <ShopGram />
      <Footer1
        hasLineTop={false}
        parentClass="tf-footer style-color-white style-4 bg-black"
      />
    </>
  );
}
