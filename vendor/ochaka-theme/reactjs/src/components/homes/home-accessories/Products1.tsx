import { Link } from "react-router-dom";

import ProductCard18 from "@/components/productCards/ProductCard18";
import { accessoriesProducts } from "@/data/products";

import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CountdownTimer from "@/components/common/Countdown";

export default function Products1() {
  return (
    <section className="themesFlat">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal flex-1">Deal Of The Day</h2>
          <div className="count-down_v02 style-3">
            <div className="js-countdown cd-has-zero">
              <CountdownTimer style={2} />
            </div>
          </div>
          <div className="flex-1 d-flex justify-content-end">
            <Link
              to={`/shop-default`}
              className="tf-btn-icon h6 fw-medium text-nowrap"
            >
              View All Product
              <i className="icon icon-caret-circle-right" />
            </Link>
          </div>
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
          modules={[Grid, Pagination]}
          grid={{
            rows: 2,
            fill: "row",
          }}
          pagination={{
            clickable: true,
            el: ".spd18",
          }}
        >
          {accessoriesProducts.map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <ProductCard18 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination d-xl-none spd18" />
        </Swiper>
      </div>
    </section>
  );
}
