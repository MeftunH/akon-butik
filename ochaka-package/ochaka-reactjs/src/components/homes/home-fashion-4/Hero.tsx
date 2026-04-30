import { Link } from "react-router-dom";

import { sliderItemsRightImage } from "@/data/heroSlides";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow tf-btn-swiper-main">
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
          el: ".spd73",
        }}
      >
        {sliderItemsRightImage.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-2">
              <div className="sld_image image__right">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="lazyload scale-item"
                  width={2880}
                  height={975}
                />
              </div>
              <div className="sld_content">
                <div className="container">
                  <div className="row">
                    <div className="col-11">
                      <div className="content-sld_wrap">
                        <p className="sub-title_sld h3 text-primary fade-item fade-item-1">
                          SALE OFF 50%
                        </p>
                        <h1
                          className="title_sld text-display fade-item fade-item-2"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                          className="sub-text_sld h6 text-black fade-item fade-item-3"
                          dangerouslySetInnerHTML={{ __html: item.description }}
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
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd73" />
      </Swiper>
    </div>
  );
}
