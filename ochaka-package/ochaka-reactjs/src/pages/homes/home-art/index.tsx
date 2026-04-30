import MarqueeSlider from "@/components/common/MarqueeSlider";
import Footer4 from "@/components/footers/Footer4";
import Header1 from "@/components/header/Header1";
import Topbar1 from "@/components/header/Topbar1";
import Blogs from "@/components/homes/home-art/Blogs";
import Categories from "@/components/homes/home-art/Categories";
import Features from "@/components/homes/home-art/Features";
import Hero from "@/components/homes/home-art/Hero";
import LookbookProducts from "@/components/homes/home-art/LookbookProducts";
import Products1 from "@/components/homes/home-art/Products1";
import Testimonials from "@/components/homes/home-art/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Art || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageArt() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 />
      <Header1 parentClass="tf-header header-fix header-abs-1" />
      <Hero />
      <Categories />
      <Products1 />
      <Testimonials />
      <MarqueeSlider parentClass="themesFlat bg-dusty-rose" />
      <LookbookProducts />
      <Blogs />
      <Features />
      <Footer4 />
    </>
  );
}
