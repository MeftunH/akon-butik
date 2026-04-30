import Features from "@/components/common/Features";
import Footer3 from "@/components/footers/Footer3";
import Header8 from "@/components/header/Header8";
import Banner from "@/components/homes/home-pet-store/Banner";
import Blogs from "@/components/homes/home-pet-store/Blogs";
import Categories from "@/components/homes/home-pet-store/Categories";
import Hero from "@/components/homes/home-pet-store/Hero";
import LookbookProducts from "@/components/homes/home-pet-store/LookbookProducts";
import Products1 from "@/components/homes/home-pet-store/Products1";
import Products2 from "@/components/homes/home-pet-store/Products2";
import Products3 from "@/components/homes/home-pet-store/Products3";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Pet Store || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePagePetStore() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header8 />
      <Hero />
      <Categories />
      <Products1 />
      <LookbookProducts />
      <Products2 />
      <Banner />
      <Products3 />
      <Features parentClass="themesFlat" />
      <Blogs />
      <Footer3 />
    </>
  );
}
