import { Link } from "react-router-dom";

import { collections2 } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections() {
  return (
    <div className="s-collection type-2">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper mb-14 wow fadeInUp"
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1 },
          575: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd78",
        }}
      >
        {collections2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="wg-cls-2 d-flex hover-img">
              <Link to={`/shop-default`} className="image img-style">
                <img
                  className="lazyload"
                  src={item.imgSrc}
                  alt={item.alt}
                  width={690}
                  height={690}
                />
              </Link>
              <div className="cls-content_wrap b-16">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-white animate-btn animate-dark rounded-0 type-small-2"
                >
                  {item.title}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd78" />
      </Swiper>
    </div>
  );
}
