import { Link } from "react-router-dom";

import { sliderItems2 } from "@/data/heroSlides";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow type-abs tf-btn-swiper-main">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_fade"
        loop
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{
          delay: 30000,
        }}
        effect="fade"
        pagination={{
          clickable: true,
          el: ".spd86",
        }}
      >
        {sliderItems2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className={item.wrapperClass}>
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="lazyload ani-zoom"
                  width={2880}
                  height={1440}
                />
              </div>
              <div className={item.contentClass}>
                <div className="container">
                  <div className="row">
                    <div className={item.colClass}>
                      <div className="content-sld_wrap">
                        <p className="sub-title_sld-2 font-2 h3 text-white fade-item fade-item-1">
                          {item.subTitle}
                        </p>
                        <h1 className="title_sld text-white text-display fade-item fade-item-2">
                          {item.title}
                        </h1>
                        <p className="sub-text_sld h5 text-white fade-item fade-item-3">
                          {item.subText}
                        </p>
                        <div className="fade-item fade-item-4">
                          <Link
                            to={`/shop-default-list`}
                            className="tf-btn btn-white animate-btn animate-dark fw-semibold"
                          >
                            Shop now
                            <i className="icon icon-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default-2 style-white tf-sw-pagination spd86" />
      </Swiper>
    </div>
  );
}
