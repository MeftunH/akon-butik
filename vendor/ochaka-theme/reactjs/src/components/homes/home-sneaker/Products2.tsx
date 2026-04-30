import ProductCard1 from "@/components/productCards/ProductCard1";
import { productsSneakers2 } from "@/data/products";

import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="s-title mb-8">Deal Of The Day</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wrap-sw-over wow fadeInUp"
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
          modules={[Grid, Pagination]}
          grid={{
            rows: 2,
            fill: "row",
          }}
          pagination={{
            clickable: true,
            el: ".spd123",
          }}
        >
          {productsSneakers2.map((product, i) => (
            <SwiperSlide className="swiper-slide" key={i}>
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd123" />
        </Swiper>
      </div>
    </section>
  );
}
