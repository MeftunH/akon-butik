import Features from "@/components/common/Features";
import Footer2 from "@/components/footers/Footer2";
import Header1 from "@/components/header/Header1";
import Topbar1 from "@/components/header/Topbar1";
import Blogs from "@/components/homes/home-fashion-2/Blogs";
import Categories from "@/components/homes/home-fashion-2/Categories";
import Collections from "@/components/homes/home-fashion-2/Collections";
import Collections2 from "@/components/homes/home-fashion-2/Collections2";
import Hero from "@/components/homes/home-fashion-2/Hero";
import Products1 from "@/components/homes/home-fashion-2/Products1";
import Products2 from "@/components/homes/home-fashion-2/Products2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Fashion 02 || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageFashion2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 />
      <Header1 />
      <Hero />
      <Collections />
      <Categories />
      <Products1 />
      <Collections2 />
      <Products2 />
      <Blogs />
      <Features />
      <Footer2 />
    </>
  );
}
