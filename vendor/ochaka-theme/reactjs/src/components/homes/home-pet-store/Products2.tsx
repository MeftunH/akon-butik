import ProductCard8 from "@/components/productCards/ProductCard8";
import { productSlides } from "@/data/products";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Deal Of The Day</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd111",
          }}
        >
          {productSlides.map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <ProductCard8 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination d-xl-none spd111" />
        </Swiper>
      </div>
    </section>
  );
}
