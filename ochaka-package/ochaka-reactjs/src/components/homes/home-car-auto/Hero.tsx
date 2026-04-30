import { Link } from "react-router-dom";

import { sliderWithOverlayItems } from "@/data/heroSlides";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow-2 tf-btn-swiper-main pst-5">
      <div className="container">
        <div className="slideshow-container width-3">
          {/*  data-delay="3000" data-auto="true" */}
          <Swiper
            dir="ltr"
            className="swiper tf-swiper sw-slide-show slider_effect_fade rounded-0"
            loop
            modules={[Autoplay, EffectFade, Pagination, Navigation]}
            autoplay={{
              delay: 30000,
            }}
            effect="fade"
            pagination={{
              clickable: true,
              el: ".spd41",
            }}
            navigation={{
              prevEl: ".snbp41",
              nextEl: ".snbn41",
            }}
          >
            {sliderWithOverlayItems.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="slider-wrap has-overlay style-5">
                  <div className="sld_image">
                    <img
                      src={item.imgSrc}
                      alt="Slider"
                      className="lazyload scale-item sale-item-1"
                      width={1168}
                      height={544}
                    />
                  </div>
                  <div className="sld_content type-4 type-space-x x2">
                    <h2 className="title_sld h1 fw-normal mb-24 fade-item fade-item-1">
                      <a
                        href="#"
                        className="link text-white"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </h2>
                    <div className="price-wrap price_sld mb-24 fade-item fade-item-2">
                      <span className="h1 type-semibold price-new text-price">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="price-old h3 text-main-2 lh-xl-38">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="fade-item fade-item-3">
                      <Link
                        to={`/shop-default`}
                        className="tf-btn btn-white animate-btn animate-dark"
                      >
                        Shop now
                        <i className="icon icon-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="sw-dot-default-2 style-white tf-sw-pagination d-sm-none spd41" />
            <div className="group-btn band-swiper">
              <div className="tf-sw-nav type-small-3 nav-prev-swiper snbp41">
                <i className="icon icon-caret-left" />
              </div>
              <div className="tf-sw-nav type-small-3 nav-next-swiper snbn41">
                <i className="icon icon-caret-right" />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
