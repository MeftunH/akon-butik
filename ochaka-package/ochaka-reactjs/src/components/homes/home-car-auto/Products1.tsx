import { Link } from "react-router-dom";

import ProductCard17 from "@/components/productCards/ProductCard17";
import { carAutoProducts } from "@/data/products";

import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Our best seller</h2>
          <Link to={`/shop-default`} className="tf-btn-line">
            View All Product
          </Link>
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
          modules={[Grid, Pagination]}
          grid={{
            rows: 2,
            fill: "row",
          }}
          pagination={{
            clickable: true,
            el: ".spd42",
          }}
        >
          {carAutoProducts.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard17 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination d-xl-none spd42" />
        </Swiper>
      </div>
    </section>
  );
}
