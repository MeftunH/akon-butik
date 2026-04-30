import { Link } from "react-router-dom";

import { sliderStyle5Items } from "@/data/heroSlides";

import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="tf-slideshow-2 tf-btn-swiper-main">
      <div className="container">
        <div className="slideshow-container width-2">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper sw-slide-show slider_effect_fade rounded-0"
            loop
            modules={[Autoplay, EffectFade]}
            autoplay={{
              delay: 30000,
            }}
            effect="fade"
          >
            {sliderStyle5Items.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="slider-wrap style-5">
                  <div className="sld_image">
                    <img
                      src={item.imgSrc}
                      alt="Slider"
                      className="lazyload scale-item sale-item-1"
                      width={1140}
                      height={791}
                    />
                  </div>
                  <div className="sld_content type-space-x">
                    <h5 className="sub-title_sld has-icon mb-8 text-primary fade-item fade-item-1">
                      <span className="icon d-flex">
                        <img
                          alt="Icon"
                          src="/icon/fire-2.svg"
                          width={20}
                          height={20}
                        />
                      </span>
                      Don't miss the opportunity
                    </h5>
                    <h2 className="title_sld h2 fw-normal mb-16 fade-item fade-item-2">
                      <Link
                        to={`/shop-default`}
                        className="link"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </h2>
                    <div className="price-wrap align-items-end fade-item fade-item-4">
                      <span className="price-new h2 fw-semibold text-primary primary-4">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="price-old h4">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default-2 style-primary primary-4 tf-sw-pagination" />
          </Swiper>
          <div className="col-right d-sm-flex d-md-grid">
            <div className="box-image_V06 type-space-3 pst-center-y hover-img rounded-0">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src="/images/section/box-image-29.jpg"
                  alt="IMG"
                  className="lazyload"
                  width={760}
                  height={515}
                />
              </Link>
              <div className="box-image_content wow fadeInUp">
                <p className="sub-title h5 fw-semibold text-primary">
                  SALE upto 50%
                </p>
                <h4 className="title fw-normal">
                  <Link to={`/shop-default`} className="link">
                    Headphone Case <br />
                    for JBL Tune
                  </Link>
                </h4>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line primary-4 letter-space-0"
                >
                  Shop now
                </Link>
              </div>
            </div>
            <div className="box-image_V06 type-space-3 pst-center-y hover-img rounded-0">
              <Link to={`/shop-default`} className="box-image_image img-style">
                <img
                  src="/images/section/box-image-30.jpg"
                  alt="IMG"
                  className="lazyload"
                  width={760}
                  height={515}
                />
              </Link>
              <div className="box-image_content wow fadeInUp">
                <p className="sub-title h5 fw-semibold text-primary">
                  SALE upto 50%
                </p>
                <h4 className="title fw-normal">
                  <Link to={`/shop-default`} className="link">
                    Genuine Leather <br />
                    AirPod Case
                  </Link>
                </h4>
                <Link
                  to={`/shop-default`}
                  className="tf-btn-line primary-4 letter-space-0"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
