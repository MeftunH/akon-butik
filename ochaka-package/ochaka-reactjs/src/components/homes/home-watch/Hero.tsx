import { Link } from "react-router-dom";

import { sliders5 } from "@/data/heroSlides";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow type-abs tf-btn-swiper-main hover-sw-nav">
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
          el: ".spd133",
        }}
      >
        {sliders5.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="lazyload scale-item scale-item-1"
                  width={1920}
                  height={880}
                />
              </div>
              <div className={`sld_content only-title ${item.textAlign}`}>
                <div className="container">
                  <div className="content-sld_wrap">
                    <h2
                      className="title_sld text-display fw-normal fade-item fade-item-2"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <div className="fade-item fade-item-4">
                      <Link
                        to={`/shop-default-list`}
                        className="tf-btn animate-btn rounded-0"
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
        <div className="sw-dot-default-2 tf-sw-pagination spd133" />
      </Swiper>
    </div>
  );
}
