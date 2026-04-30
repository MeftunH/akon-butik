import { Link } from "react-router-dom";

import ProductCard10 from "@/components/productCards/ProductCard10";
import { newBookProducts } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Our Best Fiction Books</h2>
          <Link to={`/shop-default`} className="tf-btn-line">
            {" "}
            View All Books{" "}
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 48,
            },
            1400: {
              slidesPerView: 6,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd32",
          }}
        >
          {newBookProducts.map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <ProductCard10 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd32" />
        </Swiper>
      </div>
    </section>
  );
}
