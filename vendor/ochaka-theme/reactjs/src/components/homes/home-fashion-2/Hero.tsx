import { Link } from "react-router-dom";

import { sliderItemsStyle2 } from "@/data/heroSlides";

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
          el: ".spd63",
        }}
        navigation={{
          prevEl: ".snbp63",
          nextEl: ".snbn63",
        }}
      >
        {sliderItemsStyle2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-2">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="lazyload scale-item"
                  width={2880}
                  height={1350}
                />
              </div>
              <div className={`sld_content ${item.contentClass}`}>
                <div className="container">
                  <div className="row">
                    <div className={item.columnClass}>
                      <div className={item.wrapClass}>
                        <p
                          className={`sub-title_sld h3 text-primary fade-item fade-item-1`}
                        >
                          {item.subtitle}
                        </p>
                        <h1
                          className={`title_sld text-display fade-item fade-item-2 ${item.btnExtraClass}`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                          className={`sub-text_sld h5 ${item.textColorClass} fade-item fade-item-3`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        <div className="fade-item fade-item-4">
                          <Link
                            to={`/shop-default-list`}
                            className={item.btnClass}
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
        <div className="sw-dot-default tf-sw-pagination spd63" />
      </Swiper>
      <div className="tf-sw-nav nav-prev-swiper snbp63">
        <i className="icon icon-caret-left" />
      </div>
      <div className="tf-sw-nav nav-next-swiper snbn63">
        <i className="icon icon-caret-right" />
      </div>
    </div>
  );
}
