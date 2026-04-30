import { Link } from "react-router-dom";

import { sliderProducts2 } from "@/data/products";
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
          el: ".spd54",
        }}
      >
        {sliderProducts2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-2">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="lazyload scale-item"
                  width={2880}
                  height={1005}
                />
              </div>
              <div className="sld_content">
                <div className="container">
                  <div className="row">
                    <div className="col-11">
                      <div className="content-sld_wrap">
                        <h4 className="sub-title_sld has-icon text-primary fade-item fade-item-1">
                          <span className="icon d-flex">
                            {/* Optional SVG or icon can go here */}
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.001 11.949C9 6 11 2 15 0C15.5 6 21 8 21 15C21 17.3869 20.0518 19.6761 18.364 21.364C16.6761 23.0518 14.3869 24 12 24C9.61305 24 7.32387 23.0518 5.63604 21.364C3.94821 19.6761 3 17.3869 3 15C3 11.5 4 10 6 8C6 11 9.001 11.949 9.001 11.949Z"
                                fill="#EB423F"
                              />
                            </svg>
                          </span>
                          {item.subTitle}
                        </h4>
                        <h1 className="title_sld text-display fade-item fade-item-2">
                          <Link
                            to={`/product-detail/${item.id}`}
                            className="link fw-normal"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />
                        </h1>
                        <div className="price-wrap price_sld fade-item fade-item-3">
                          <span className="h1 fw-medium price-new text-primary">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="price-old h3">
                            ${item.oldPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="fade-item fade-item-4">
                          <Link
                            to={`/shop-default`}
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
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default tf-sw-pagination spd54" />
      </Swiper>
    </div>
  );
}
