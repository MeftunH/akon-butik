import ProductCard2 from "@/components/productCards/ProductCard2";
import { decorProducts } from "@/data/products";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
  return (
    <section className="flat-spacing pt-0 tf-pag-swiper">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="s-title mb-8">New Product</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <div className="tf-btn-swiper-main pst-3">
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
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: ".spd56",
            }}
            navigation={{
              prevEl: ".snbp56",
              nextEl: ".snbn56",
            }}
          >
            {decorProducts.map((product, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <ProductCard2 product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="tf-sw-nav style-2 nav-prev-swiper d-xl-flex snbp56">
            <i className="icon icon-caret-left" />
          </div>
          <div className="tf-sw-nav style-2 nav-next-swiper d-xl-flex snbn56">
            <i className="icon icon-caret-right" />
          </div>
        </div>
        <div className="sw-dot-default tf-sw-pagination d-xl-none spd56" />
      </div>
    </section>
  );
}
