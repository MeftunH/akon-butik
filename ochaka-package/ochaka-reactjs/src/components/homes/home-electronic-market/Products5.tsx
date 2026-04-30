import { Link } from "react-router-dom";

import ProductCard4 from "@/components/productCards/ProductCard4";
import { style5Products } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products5() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="sect-title type-3 type-2 wow fadeInUp">
          <h2 className="s-title type-semibold text-nowrap">
            Voucher &amp; Promotional
          </h2>
          <Link
            to={`/shop-default`}
            className="tf-btn-icon h6 fw-medium text-nowrap"
          >
            View All Product
            <i className="icon icon-caret-circle-right" />
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
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd59",
          }}
        >
          {style5Products.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard4 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination d-xl-none spd59" />
        </Swiper>
      </div>
    </section>
  );
}
