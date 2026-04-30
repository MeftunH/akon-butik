import { Link } from "react-router-dom";

import ProductCard18 from "@/components/productCards/ProductCard18";
import { accessoriesProducts2 } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products3() {
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
          className="swiper tf-swiper mb-40 wow fadeInUp"
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
            el: ".spd20",
          }}
        >
          {accessoriesProducts2.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard18 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd20" />
        </Swiper>
        <div className="wg-copy primary-4 wow fadeInUp">
          <div className="content wrap-code">
            <h3 className="text-white">
              Buy 2 Get 1 Free and Get 35% Off Voucher
            </h3>
            <div className="tf-btn btn-white btn-coppy-text animate-btn animate-dark">
              <h6 className="coppyText fw-semibold">35%OFFVOUCHER</h6>
              <span className="br-line type-vertical" />
              <h6 className="text-primary">COPY</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
