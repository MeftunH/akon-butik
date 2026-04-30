import { Link } from "react-router-dom";

import { slides2 } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections() {
  return (
    <div className="s-collection">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper"
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1 },
          575: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd62",
        }}
      >
        {slides2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="wg-cls-2 type-space-2 d-flex hover-img">
              <Link to={`/shop-default`} className="image img-style">
                <img
                  className="lazyload"
                  src={item.imgSrc}
                  alt="Slider"
                  width={1386}
                  height={945}
                />
              </Link>
              <div className="cls-content_wrap">
                <div className="cls-content">
                  <Link
                    to={`/shop-default`}
                    className="tag_cls h2 type-semibold link"
                  >
                    {item.title}
                  </Link>
                  <span className="br-line type-vertical" />
                  <Link
                    to={`/shop-default`}
                    className="tf-btn-line text-nowrap"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd62" />
      </Swiper>
    </div>
  );
}
