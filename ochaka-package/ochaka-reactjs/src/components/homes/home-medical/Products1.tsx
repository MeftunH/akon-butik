import { Link } from "react-router-dom";

import ProductCard14 from "@/components/productCards/ProductCard14";
import { productsMedical } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products1() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Our Best Sellers</h2>
          <Link to={`/shop-default`} className="tf-btn-line">
            {" "}
            View All{" "}
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper swiper-medical wow fadeInUp"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd96",
          }}
        >
          {productsMedical.map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <ProductCard14 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd96" />
        </Swiper>
      </div>
    </section>
  );
}
