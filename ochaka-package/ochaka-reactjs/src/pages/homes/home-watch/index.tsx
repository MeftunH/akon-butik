import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header12 from "@/components/header/Header12";
import Topbar6 from "@/components/header/Topbar6";
import Blogs from "@/components/homes/home-watch/Blogs";
import Categories from "@/components/homes/home-watch/Categories";
import Collections from "@/components/homes/home-watch/Collections";
import Hero from "@/components/homes/home-watch/Hero";
import Products1 from "@/components/homes/home-watch/Products1";
import Products2 from "@/components/homes/home-watch/Products2";
import ShopGram from "@/components/homes/home-watch/ShopGram";
import Testimonials from "@/components/homes/home-watch/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Watch || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageWatch() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 />
      <Header12 />
      <Hero />
      <Categories />
      <Products1 />
      <Collections />
      <Products2 />
      <Testimonials />
      <Blogs />
      <Features parentClass="flat-spacing pt-0" />
      <ShopGram />
      <Footer1 parentClass="tf-footer footer-2" />
    </>
  );
}
