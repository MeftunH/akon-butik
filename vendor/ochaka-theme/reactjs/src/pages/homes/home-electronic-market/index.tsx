import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import FixedHeader2 from "@/components/header/FixedHeader2";
import Header7 from "@/components/header/Header7";

import Topbar2 from "@/components/header/Topbar2";
import Blogs from "@/components/homes/home-electronic-market/Blogs";
import Categories from "@/components/homes/home-electronic-market/Categories";
import Collections from "@/components/homes/home-electronic-market/Collections";
import CountdownBanner from "@/components/homes/home-electronic-market/CountdownBanner";
import Hero from "@/components/homes/home-electronic-market/Hero";
import Products1 from "@/components/homes/home-electronic-market/Products1";
import Products2 from "@/components/homes/home-electronic-market/Products2";
import Products3 from "@/components/homes/home-electronic-market/Products3";
import Products4 from "@/components/homes/home-electronic-market/Products4";
import Products5 from "@/components/homes/home-electronic-market/Products5";
import VoucerBanner from "@/components/homes/home-electronic-market/VoucerBanner";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Electronic Market || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageElectronicMarket() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar2 />
      <Header7 />
      <FixedHeader2 />
      <Hero />
      <Categories />
      <Collections />
      <CountdownBanner />
      <Products1 />
      <Products3 />
      <Products2 />
      <VoucerBanner />
      <Products4 />
      <Products5 />
      <Blogs />
      <Features parentClass="flat-spacing" />
      <Footer1 />
    </>
  );
}
