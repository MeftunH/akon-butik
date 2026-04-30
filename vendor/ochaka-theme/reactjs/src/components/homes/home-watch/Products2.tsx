import ProductCard17 from "@/components/productCards/ProductCard17";
import { moreWatchProducts } from "@/data/products";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h2 className="s-title h1 fw-medium mb-8">Popular Products</h2>
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
            el: ".spd135",
          }}
        >
          {moreWatchProducts.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard17 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination d-xl-none spd135" />
        </Swiper>
      </div>
    </section>
  );
}
