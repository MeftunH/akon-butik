import { Link } from "react-router-dom";

import ProductCard5 from "@/components/productCards/ProductCard5";
import { products9 } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function Products3() {
  return (
    <section className="flat-spacing bg-white-smoke">
      <div className="container">
        <div className="sect-title type-3 type-2 pb-0 border-0 wow fadeInUp">
          <h2 className="s-title type-semibold text-nowrap">Product On-sale</h2>
          <Link
            to={`/shop-default`}
            className="tf-btn-icon h6 fw-medium text-nowrap"
          >
            View All Product
            <i className="icon icon-caret-circle-right" />
          </Link>
        </div>
        <div className="tf-pag-swiper">
          <div className="tf-btn-swiper-main pst-4">
            <Swiper
              dir="ltr"
              className="swiper tf-swiper wow fadeInUp"
              spaceBetween={12}
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 48,
                },
              }}
              modules={[Navigation, Pagination]}
              pagination={{
                clickable: true,
                el: ".spd57",
              }}
              navigation={{
                prevEl: ".snbp57",
                nextEl: ".snbn57",
              }}
            >
              {products9.map((product, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <ProductCard5 product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="tf-sw-nav type-small-2 nav-prev-swiper d-xl-flex snbp57">
              <i className="icon icon-arrow-left" />
            </div>
            <div className="tf-sw-nav type-small-2 nav-next-swiper d-xl-flex snbn57">
              <i className="icon icon-arrow-right" />
            </div>
          </div>
          <div className="sw-dot-default-2 tf-sw-pagination spd57" />
        </div>
      </div>
    </section>
  );
}
