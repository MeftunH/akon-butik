import { similerProducts } from "@/data/products";

import ProductCard1 from "../productCards/ProductCard1";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function SimilerProducts() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <h1 className="sect-title text-center">You May Also Like</h1>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wrap-sw-over"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd146",
          }}
        >
          {similerProducts.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd146" />
        </Swiper>
      </div>
    </section>
  );
}
