import { Link } from "react-router-dom";

import { sliderItems3 } from "@/data/heroSlides";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Hero() {
  return (
    <div className="tf-slideshow">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_scale-md slider_effect_fade-md"
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
          el: ".spd67",
        }}
      >
        {sliderItems3.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="wg-cls-2 hover-img d-flex">
              <Link to={`/shop-default`} className="image img-style">
                <img
                  className="lazyload scale-item"
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  width={960}
                  height={1305}
                />
              </Link>
              <div className="cls-content_wrap b-xl-32">
                <div className="cls-content fade-item fade-item-1">
                  <Link to={`/shop-default`} className="tag_cls h3 link">
                    {item.tag}
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
        <div className="sw-dot-default tf-sw-pagination spd67" />
      </Swiper>
    </div>
  );
}
