import { Link } from "react-router-dom";

import ProductCard13 from "@/components/productCards/ProductCard13";
import ProductCard15 from "@/components/productCards/ProductCard15";
import { productsMedicalMini, productsMedicalMiniType3 } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Our Best Sellers</h2>
          <Link to={`/shop-default`} className="tf-btn-line">
            {" "}
            View All{" "}
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
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
              spaceBetween: 32,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd97",
          }}
        >
          <SwiperSlide className="swiper-slide">
            <div className="list-ver gap-24">
              {productsMedicalMini.slice(0, 2).map((product) => (
                <ProductCard13 product={product} key={product.id} />
              ))}
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            {productsMedicalMiniType3.map((product) => (
              <ProductCard15 key={product.id} product={product} />
            ))}
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="list-ver gap-24">
              {productsMedicalMini.slice(2, 4).map((product) => (
                <ProductCard13 product={product} key={product.id} />
              ))}
            </div>
          </SwiperSlide>

          <div className="sw-dot-default tf-sw-pagination spd97" />
        </Swiper>
      </div>
    </section>
  );
}
