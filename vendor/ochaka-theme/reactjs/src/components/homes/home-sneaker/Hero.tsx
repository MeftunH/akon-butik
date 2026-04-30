import { Link } from "react-router-dom";

import { sliders } from "@/data/heroSlides";
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
          el: ".spd121",
        }}
      >
        {sliders.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-4">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt=""
                  className="lazyload"
                  width={2880}
                  height={1215}
                />
              </div>
              <div className="sld_content">
                <div className="container">
                  <div className="content-sld_wrap">
                    <h1
                      className="title_sld text-display fade-item fade-item-1"
                      dangerouslySetInnerHTML={{
                        __html: item.title.join(" "),
                      }}
                    />
                    <p
                      className="sub-text_sld h5 text-black fade-item fade-item-2"
                      dangerouslySetInnerHTML={{
                        __html: item.text.join(" "),
                      }}
                    />
                    <div className="fade-item fade-item-3">
                      <Link
                        to={`/shop-default-list`}
                        className="tf-btn animate-btn fw-semibold"
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
        <div className="sw-dot-default tf-sw-pagination spd121" />
      </Swiper>
    </div>
  );
}
