import { Link } from "react-router-dom";

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
        pagination={{
          clickable: true,
          el: ".spd26",
        }}
        navigation={{
          prevEl: ".snbp26",
          nextEl: ".snbn26",
        }}
        autoplay={{
          delay: 30000,
        }}
        effect="fade"
      >
        <SwiperSlide className="swiper-slide">
          <div className="slider-wrap style-2">
            <div className="sld_image">
              <img
                src="/images/slider/slider-46.jpg"
                alt="Slider"
                className="lazyload ani-zoom"
                width={1920}
                height={945}
              />
            </div>
            <div className="sld_content only-title text-center">
              <div className="container">
                <div className="content-sld_wrap">
                  <h2 className="title_sld text-display fw-normal text-white fade-item fade-item-2">
                    Exquisite handmade <br />
                    ceramic vase
                  </h2>
                  <div className="fade-item fade-item-4">
                    <Link
                      to={`/shop-default-list`}
                      className="tf-btn btn-white animate-btn animate-dark"
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
        {/* item 2 */}
        <SwiperSlide className="swiper-slide">
          <div className="slider-wrap style-2">
            <div className="sld_image">
              <img
                src="/images/slider/slider-47.jpg"
                alt="Slider"
                className="lazyload ani-zoom"
                width={1920}
                height={945}
              />
            </div>
            <div className="sld_content only-title">
              <div className="container">
                <div className="content-sld_wrap">
                  <h2 className="title_sld text-display fw-normal fade-item fade-item-2">
                    Exquisite handmade <br />
                    ceramic vase
                  </h2>
                  <div className="fade-item fade-item-4">
                    <Link
                      to={`/shop-default-list`}
                      className="tf-btn animate-btn"
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
        {/* item 3 */}
        <SwiperSlide className="swiper-slide">
          <div className="slider-wrap style-2">
            <div className="sld_image">
              <img
                src="/images/slider/slider-48.jpg"
                alt="Slider"
                className="lazyload ani-zoom"
                width={1920}
                height={945}
              />
            </div>
            <div className="sld_content only-title">
              <div className="container">
                <div className="content-sld_wrap">
                  <h2 className="title_sld text-display fw-normal text-white fade-item fade-item-2">
                    Products crafted by <br />
                    leading artisans
                  </h2>
                  <div className="fade-item fade-item-4">
                    <Link
                      to={`/shop-default-list`}
                      className="tf-btn btn-white animate-btn animate-dark"
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
        <div className="sw-dot-default-2 style-white tf-sw-pagination spd26" />
      </Swiper>
      <div className="tf-sw-nav nav-prev-swiper snbp26">
        <i className="icon icon-caret-left" />
      </div>
      <div className="tf-sw-nav nav-next-swiper snbn26">
        <i className="icon icon-caret-right" />
      </div>
    </div>
  );
}
