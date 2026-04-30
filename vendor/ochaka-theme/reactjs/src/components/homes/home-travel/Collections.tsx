import { Link } from "react-router-dom";

import { collections3 } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections() {
  return (
    <div className="s-collection px-0">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper"
        spaceBetween={12}
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
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd127",
        }}
      >
        {collections3.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="wg-cls style-2 hover-img wow fadeInUp">
              <Link to={`/shop-default`} className="image img-style">
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="lazyload"
                  width={1248}
                  height={740}
                />
              </Link>
              <div className="cls-content">
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line style-white line-bot-0"
                >
                  <span className="h3 fw-bold">{item.title}</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd127" />
      </Swiper>
    </div>
  );
}
