import { Link } from "react-router-dom";

import { sliders3 } from "@/data/heroSlides";

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
          el: ".spd79",
        }}
        navigation={{
          prevEl: ".snbp79",
          nextEl: ".snbn79",
        }}
      >
        {sliders3.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-7">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="lazyload ani-zoom"
                  width={1920}
                  height={800}
                />
              </div>
              <div className="sld_content text-center">
                <div className="container">
                  <div className={`content-sld_wrap ${item.textAlign}`}>
                    <h2
                      className="title_sld text-display text-white fade-item fade-item-2"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="sub-text_sld h5 text-white fade-item fade-item-3">
                      {item.subText}
                    </p>
                    <div className="fade-item fade-item-4">
                      <Link
                        to={`/shop-default-list`}
                        className="tf-btn btn-primary rounded-0"
                      >
                        SHOP NOW
                        <i className="icon icon-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default style-white tf-sw-pagination spd79" />
      </Swiper>
      <div className="tf-sw-nav d-none nav-prev-swiper snbp79">
        <i className="icon icon-caret-left" />
      </div>
      <div className="tf-sw-nav d-none nav-next-swiper snbn79">
        <i className="icon icon-caret-right" />
      </div>
    </div>
  );
}
