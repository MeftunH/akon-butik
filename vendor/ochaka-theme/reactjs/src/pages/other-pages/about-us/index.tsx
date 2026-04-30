import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/header/Header1";
import Topbar1 from "@/components/header/Topbar1";
import About from "@/components/other-pages/about/About";
import BrandStory from "@/components/other-pages/about/BrandStory";
import Hero from "@/components/other-pages/about/Hero";
import PageTitle from "@/components/other-pages/about/PageTitle";
import ShopGram from "@/components/other-pages/about/ShopGram";
import Testimonials from "@/components/other-pages/about/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "About || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function AboutusPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 />
      <Header1 parentClass="tf-header header-fix header-abs-1" />
      <PageTitle />
      <Hero />
      <About />
      <BrandStory />
      <Testimonials />
      <ShopGram />
      <Footer1 />
    </>
  );
}
