import { Link } from "react-router-dom";

import ProductCard19 from "@/components/productCards/ProductCard19";
import {
  miniProductsAccreeories2,
  miniProductsAccreeories3,
} from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import SingleProduct2 from "./SingleProduct2";
import { Pagination } from "swiper/modules";

export default function Products2() {
  return (
    <section className="themesFlat">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Deal Of The Day</h2>
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
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd19",
          }}
        >
          <SwiperSlide className="swiper-slide d-none d-sm-block">
            <SingleProduct2 />
          </SwiperSlide>
          {/* item 2 */}
          <SwiperSlide className="swiper-slide">
            <div className="list-ver gap-24">
              {miniProductsAccreeories2.map((prodduct, i) => (
                <ProductCard19 product={prodduct} key={i} />
              ))}
            </div>
          </SwiperSlide>
          {/* item 3 */}
          <SwiperSlide className="swiper-slide">
            <div className="list-ver gap-24">
              {miniProductsAccreeories3.map((prodduct, i) => (
                <ProductCard19 product={prodduct} key={i} />
              ))}
            </div>
          </SwiperSlide>

          <div className="sw-dot-default tf-sw-pagination spd19" />
        </Swiper>
      </div>
    </section>
  );
}
