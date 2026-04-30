import { Link } from "react-router-dom";

import { sliderData } from "@/data/heroSlides";

import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

export default function Hero() {
  return (
    <div className="tf-slideshow tf-btn-swiper-main">
      <div className="container-full-4">
        {/* data-auto="true"  */}
        <Swiper
          dir="ltr"
          className="swiper tf-swiper slider-book sw-slide-show slider_effect_fade"
          loop
          modules={[Autoplay, EffectFade]}
          autoplay={{
            delay: 30000,
          }}
          effect="fade"
        >
          {sliderData.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="slider-wrap_2">
                <div className="sld_image type-radius">
                  <img
                    src={item.imgSrc}
                    alt="Slider"
                    className="lazyload scale-item sale-item-1"
                    width={1392}
                    height={990}
                  />
                </div>
                <div
                  className={`sld_content type-normal ${item.bgClass} type-radius`}
                >
                  <div className="container">
                    <div className="content-sld_wrap text-center">
                      <h3 className="sub-title_sld fade-item fade-item-1">
                        New From The Author
                      </h3>
                      <h2 className="title_sld text-display fw-semibold fade-item fade-item-2">
                        {item.title.map((text, i) =>
                          text === "br" ? (
                            <br
                              key={i}
                              className={
                                index === 2 && i === 3
                                  ? "d-none d-xl-block"
                                  : undefined
                              }
                            />
                          ) : (
                            <React.Fragment key={i}>{text} </React.Fragment>
                          )
                        )}
                      </h2>
                      <p className="sub-text_sld h5 text-black fade-item fade-item-3">
                        Limited Edition Complete Journeys of the Strongest
                        Family in History
                      </p>
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
        </Swiper>
      </div>
    </div>
  );
}
