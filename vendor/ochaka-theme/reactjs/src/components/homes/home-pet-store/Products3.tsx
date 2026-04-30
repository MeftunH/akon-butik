import { Link } from "react-router-dom";

import ProductCard9 from "@/components/productCards/ProductCard9";
import {
  miniType2Products,
  miniType2Products2,
  miniType2Products3,
} from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products3() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wrap-sw-over wow fadeInUp"
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
          spaceBetween={12}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd112",
          }}
        >
          <SwiperSlide className="swiper-slide">
            <div>
              <div className="sect-title type-3 type-2">
                <h2 className="s-title text-nowrap type-semibold">For Dog</h2>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-icon h6 fw-medium text-nowrap"
                >
                  View All Product
                  <i className="icon icon-caret-circle-right" />
                </Link>
              </div>
              <div className="list-ver gap-xl-40">
                {miniType2Products.map((product, i) => (
                  <ProductCard9 key={i} product={product} />
                ))}
              </div>
            </div>
          </SwiperSlide>
          {/* item 2 */}
          <SwiperSlide className="swiper-slide">
            <div>
              <div className="sect-title type-3 type-2">
                <h2 className="s-title text-nowrap type-semibold">For Cat</h2>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-icon h6 fw-medium text-nowrap"
                >
                  View All Product
                  <i className="icon icon-caret-circle-right" />
                </Link>
              </div>
              <div className="list-ver gap-xl-40">
                {miniType2Products2.map((product, i) => (
                  <ProductCard9 key={i} product={product} />
                ))}
              </div>
            </div>
          </SwiperSlide>
          {/* item 3 */}
          <SwiperSlide className="swiper-slide">
            <div>
              <div className="sect-title type-3 type-2">
                <h2 className="s-title text-nowrap type-semibold">For Bird</h2>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-icon h6 fw-medium text-nowrap"
                >
                  View All Product
                  <i className="icon icon-caret-circle-right" />
                </Link>
              </div>
              <div className="list-ver gap-xl-40">
                {miniType2Products3.map((product, i) => (
                  <ProductCard9 key={i} product={product} />
                ))}
              </div>
            </div>
          </SwiperSlide>

          <div className="sw-dot-default tf-sw-pagination spd112" />
        </Swiper>
      </div>
    </section>
  );
}
