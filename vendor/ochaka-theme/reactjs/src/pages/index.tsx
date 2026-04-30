import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/header/Header1";
import Topbar1 from "@/components/header/Topbar1";
import Blogs from "@/components/homes/home-1/Blogs";
import Collections from "@/components/homes/home-1/Collections";
import Hero from "@/components/homes/home-1/Hero";
import InstagramPosts from "@/components/homes/home-1/InstagramPosts";
import Products1 from "@/components/homes/home-1/Products1";
import Products2 from "@/components/homes/home-1/Products2";
import Testimonials from "@/components/homes/home-1/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home Fashion 01 || Ochaka - Multipurpose eCommerce Reactjs Template",
  description: "Ochaka - Multipurpose eCommerce Reactjs Template",
};
export default function HomePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar1 containerFull containerFullClass="container-full" />
      <Header1 containerFull />
      <Hero />
      <Collections />
      <Products1 />
      <Products2 />
      <Testimonials />
      <Blogs />
      <InstagramPosts />
      <Footer1 />
    </>
  );
}
