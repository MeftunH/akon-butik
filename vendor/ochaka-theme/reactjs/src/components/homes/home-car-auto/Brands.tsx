import { Link } from "react-router-dom";

import { brands } from "@/data/brands";

import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Brands() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Shop by brand</h2>
          <Link
            to={`/shop-default`}
            className="tf-btn-icon h6 fw-medium text-nowrap"
          >
            View All Brand
            <i className="icon icon-caret-circle-right" />
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper grid-colum-3 wow fadeInUp"
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
          modules={[Grid, Pagination]}
          grid={{
            rows: 2,
            fill: "row",
          }}
          pagination={{
            clickable: true,
            el: ".spd38",
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <a href="#" className="wg-brand">
                <img
                  className="lazyload"
                  src={brand.src}
                  alt={brand.alt}
                  width={200}
                  height={brand.height}
                />
                <div className="tf-overlay" />
              </a>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd38" />
        </Swiper>
      </div>
    </section>
  );
}
