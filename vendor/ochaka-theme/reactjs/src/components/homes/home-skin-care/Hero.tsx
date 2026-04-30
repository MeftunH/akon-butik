import { Link } from "react-router-dom";

import { sliderItemsCenter } from "@/data/heroSlides";

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
          el: ".spd116",
        }}
      >
        {sliderItemsCenter.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="lazyload"
                  width={2880}
                  height={1200}
                />
              </div>
              <div className="sld_content pst-center">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="content-sld_wrap">
                        <h1 className="title_sld text-display fade-item fade-item-1">
                          {item.title}
                        </h1>
                        <p className="sub-title_sld text-black h5 fade-item fade-item-2">
                          {item.subtitle}
                        </p>
                        <div className="fade-item fade-item-3">
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
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd116" />
      </Swiper>
    </div>
  );
}
