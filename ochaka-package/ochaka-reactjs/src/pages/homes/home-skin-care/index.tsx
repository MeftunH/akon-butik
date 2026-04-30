import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import FixedHeader from "@/components/header/FixedHeader";
import Header5 from "@/components/header/Header5";
import Topbar1 from "@/components/header/Topbar1";
import Banner from "@/components/homes/home-skin-care/Banner";
import BeforeAfterSlider from "@/components/homes/home-skin-care/BeforeAfterSlider";
import Blogs from "@/components/homes/home-skin-care/Blogs";
import Collections from "@/components/homes/home-skin-care/Collections";
import Hero from "@/components/homes/home-skin-care/Hero";
import MarqueeSlider from "@/components/homes/home-skin-care/MarqueeSlider";
import Products1 from "@/components/homes/home-skin-care/Products1";
import Testimonials from "@/components/homes/home-skin-care/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Skin Care || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePageSkinCare() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1
        parentClass="tf-topbar type-space-2 line-bt"
        light
        containerFull
      />
      <FixedHeader />
      <Header5 />
      <Hero />
      <MarqueeSlider />
      <Banner />
      <Collections />
      <Products1 />
      <BeforeAfterSlider />
      <Testimonials />
      <Blogs />
      <Features parentClass="flat-spacing" />
      <Footer1 />
    </>
  );
}
