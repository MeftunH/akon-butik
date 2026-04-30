import { Link } from "react-router-dom";

import ProductCard6 from "@/components/productCards/ProductCard6";
import { miniProducts } from "@/data/products";
import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products4() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-3 type-2 wow fadeInUp">
          <h2 className="s-title type-semibold">Featured Products</h2>
          <Link to={`/shop-default`} className="tf-btn-icon h6 fw-medium">
            View All Product
            <i className="icon icon-caret-circle-right" />
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wrap-sw-over wow fadeInUp"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 3,
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
            el: ".spd58",
          }}
        >
          {miniProducts.map((product, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <ProductCard6 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd58" />
        </Swiper>
      </div>
    </section>
  );
}
