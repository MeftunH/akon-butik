import { Link } from "react-router-dom";

import { sliderItems5 } from "@/data/heroSlides";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow tf-btn-swiper-main">
      <div className="container-full-2">
        <div className="slideshow-container">
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
              el: ".spd102",
            }}
          >
            {sliderItems5.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="slider-wrap style-5">
                  <div className="sld_image type-radius">
                    <img
                      src={item.imgSrc}
                      alt={item.alt}
                      className="lazyload scale-item sale-item-1"
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                  <div className={item.contentClass}>
                    {item.withContainer ? (
                      <div className="container">
                        <h3 className="sub-title_sld text-white fade-item fade-item-1">
                          {item.subTitle}
                        </h3>
                        <h2
                          className="title_sld h1 text-white fade-item fade-item-2"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
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
                    ) : (
                      <>
                        <h3 className="sub-title_sld text-white fade-item fade-item-1">
                          {item.subTitle}
                        </h3>
                        <h2
                          className="title_sld h1 text-white fade-item fade-item-2"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <div className="fade-item fade-item-4">
                          <Link
                            to={`/shop-default-list`}
                            className="tf-btn btn-white animate-btn animate-dark"
                          >
                            Shop now
                            <i className="icon icon-arrow-right" />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default style-white tf-sw-pagination spd102" />
          </Swiper>
          <div className="col-right d-md-none d-xl-block">
            <div className="box-image_V01 type-4 hover-img h-md-100">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src="/images/banner/banner-4.jpg"
                  alt="Image"
                  className="h-100 lazyload"
                  width={804}
                  height={881}
                />
              </Link>
              <div className="box-image_content align-items-center text-center">
                <h4
                  href="shop-default.html"
                  className="sub-title text-primary mb-16"
                >
                  SALE OFF 50%
                </h4>
                <Link
                  to={`/shop-default`}
                  className="title link primary-2 h2 fw-semibold mb-32"
                >
                  Fresh fruit for <br />a healthy body
                </Link>
                <Link
                  to={`/shop-default`}
                  className="tf-btn bg-primary primary-2 animate-btn"
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
  );
}
