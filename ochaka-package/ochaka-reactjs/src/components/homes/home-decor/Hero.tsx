import { Link } from "react-router-dom";

import { sliderContent } from "@/data/heroSlides";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow type-abs tf-btn-swiper-main hover-sw-nav">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_fade"
        loop
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        pagination={{
          clickable: true,
          el: ".spd55",
        }}
        navigation={{
          prevEl: ".snbp55",
          nextEl: ".snbn55",
        }}
        autoplay={{
          delay: 30000,
        }}
        effect="fade"
      >
        {sliderContent.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-2">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="lazyload ani-zoom"
                  width={2880}
                  height={1245}
                />
              </div>
              <div className="sld_content text-center">
                <div className="container">
                  <div className="content-sld_wrap">
                    <p className="sub-title_sld h6 text-primary fade-item fade-item-1">
                      {item.saleText}
                    </p>
                    <h1 className="title_sld text-display fade-item fade-item-2">
                      {item.title}
                    </h1>
                    <p
                      className="sub-text_sld h5 text-black fade-item fade-item-3"
                      dangerouslySetInnerHTML={{ __html: item.subtitle }}
                    />
                    <div className="fade-item fade-item-4">
                      <Link
                        to={`/shop-default-list`}
                        className="tf-btn animate-btn fw-normal"
                      >
                        Shop now
                        <i className="icon icon-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd55" />
      </Swiper>
      <div className="tf-sw-nav nav-prev-swiper snbp55">
        <i className="icon icon-caret-left" />
      </div>
      <div className="tf-sw-nav nav-next-swiper snbn55">
        <i className="icon icon-caret-right" />
      </div>
    </div>
  );
}
