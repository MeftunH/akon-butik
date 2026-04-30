import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/header/Header1";
import Topbar1 from "@/components/header/Topbar1";
import BannerCollections from "@/components/homes/home-decor/BannerCollections";
import Blogs from "@/components/homes/home-decor/Blogs";
import Categories from "@/components/homes/home-decor/Categories";
import Hero from "@/components/homes/home-decor/Hero";
import Products1 from "@/components/homes/home-decor/Products1";
import Products2 from "@/components/homes/home-decor/Products2";
import Products3 from "@/components/homes/home-decor/Products3";
import ShopGram from "@/components/homes/home-decor/ShopGram";
import Testimonials from "@/components/homes/home-decor/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Decor || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageDecor() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 />
      <Header1 parentClass="tf-header header-fix header-abs-2" />
      <Hero />
      <Categories />
      <Products1 />
      <BannerCollections />
      <Products2 />
      <Products3 />
      <Testimonials />
      <Features parentClass="themesFlat" lineTop />
      <Blogs />
      <ShopGram />
      <Footer1 hasLineTop={false} />
    </>
  );
}
