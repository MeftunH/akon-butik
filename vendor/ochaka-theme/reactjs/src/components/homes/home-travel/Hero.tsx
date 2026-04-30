import { Link } from "react-router-dom";

import { sliderItems6 } from "@/data/heroSlides";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow type-abs tf-btn-swiper-main hover-sw-nav">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_fade"
        loop
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{
          delay: 30000,
        }}
        effect="fade"
        pagination={{
          clickable: true,
          el: ".spd128",
        }}
        navigation={{
          prevEl: ".snbp128",
          nextEl: ".snbn128",
        }}
      >
        {sliderItems6.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-6">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="lazyload ani-zoom"
                  width={1920}
                  height={880}
                />
              </div>
              <div className="sld_content">
                <div className="container">
                  <div className="content-sld_wrap">
                    <h2
                      className="title_sld text-display fw-semibold text-white fade-item fade-item-1"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="sub-text_sld h5 text-white fade-item fade-item-2">
                      {item.description}
                    </p>
                    <div className="fade-item fade-item-3">
                      <Link
                        to={`/shop-default-list`}
                        className="tf-btn btn-white animate-btn animate-dark rounded-0 px-xxl-32"
                      >
                        SHOP NOW <i className="icon icon-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default-2 style-white tf-sw-pagination spd128" />
      </Swiper>
      <div className="tf-sw-nav nav-prev-swiper snbp128">
        <i className="icon icon-caret-left" />
      </div>
      <div className="tf-sw-nav nav-next-swiper snbn128">
        <i className="icon icon-caret-right" />
      </div>
    </div>
  );
}
