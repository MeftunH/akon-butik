import { Link } from "react-router-dom";

import { sliderItems4 } from "@/data/heroSlides";

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
          el: ".spd108",
        }}
      >
        {sliderItems4.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap style-4 has-nav">
              <div className="sld_image">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="lazyload ani-zoom"
                  width={2880}
                  height={959}
                />
              </div>
              <div className="sld_content">
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-3 col-lg-4 d-xl-block d-none" />
                    <div className="col-xxl-4 col-md-6">
                      <div className="content-sld_wrap">
                        <h1 className="title_sld text-display text-purple fade-item fade-item-2">
                          {item.title}
                        </h1>
                        <p className="sub-text_sld h5 text-black fade-item fade-item-3">
                          {item.description}
                        </p>
                        <div className="fade-item fade-item-4">
                          <Link
                            to={`/shop-default-list`}
                            className="tf-btn btn-purple animate-btn fw-normal"
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
        <div className="sw-dot-default style-white tf-sw-pagination spd108" />
      </Swiper>
      <div className="slideshow-wrap d-xl-flex d-none">
        <div className="container">
          <div className="row">
            <div className="col-xxl-3 col-lg-4">
              <ul className="nav-shop-by sidebar-content-wrap">
                <li className="d-none d-xl-block">
                  <p className="nav-shop_link h6 nav-shop_title">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.5938 11C19.5938 11.2735 19.4851 11.5358 19.2917 11.7292C19.0983 11.9226 18.836 12.0312 18.5625 12.0312H3.4375C3.164 12.0312 2.90169 11.9226 2.7083 11.7292C2.5149 11.5358 2.40625 11.2735 2.40625 11C2.40625 10.7265 2.5149 10.4642 2.7083 10.2708C2.90169 10.0774 3.164 9.96875 3.4375 9.96875H18.5625C18.836 9.96875 19.0983 10.0774 19.2917 10.2708C19.4851 10.4642 19.5938 10.7265 19.5938 11ZM3.4375 6.53125H18.5625C18.836 6.53125 19.0983 6.4226 19.2917 6.2292C19.4851 6.03581 19.5938 5.7735 19.5938 5.5C19.5938 5.2265 19.4851 4.96419 19.2917 4.7708C19.0983 4.5774 18.836 4.46875 18.5625 4.46875H3.4375C3.164 4.46875 2.90169 4.5774 2.7083 4.7708C2.5149 4.96419 2.40625 5.2265 2.40625 5.5C2.40625 5.7735 2.5149 6.03581 2.7083 6.2292C2.90169 6.4226 3.164 6.53125 3.4375 6.53125ZM18.5625 15.4688H3.4375C3.164 15.4688 2.90169 15.5774 2.7083 15.7708C2.5149 15.9642 2.40625 16.2265 2.40625 16.5C2.40625 16.7735 2.5149 17.0358 2.7083 17.2292C2.90169 17.4226 3.164 17.5312 3.4375 17.5312H18.5625C18.836 17.5312 19.0983 17.4226 19.2917 17.2292C19.4851 17.0358 19.5938 16.7735 19.5938 16.5C19.5938 16.2265 19.4851 15.9642 19.2917 15.7708C19.0983 15.5774 18.836 15.4688 18.5625 15.4688Z"
                        fill="white"
                      />
                    </svg>
                    <span className="fw-semibold text">Shop by</span>
                  </p>
                </li>
                <li>
                  <Link
                    to={`/shop-default`}
                    className="nav-shop_link h6 link-purple"
                  >
                    <i className="icon icon-dog" />
                    <span className="text fw-medium">Dogs</span>
                    <i className="icon2 icon-caret-right" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop-default`}
                    className="nav-shop_link h6 link-purple"
                  >
                    <i className="icon icon-cat" />
                    <span className="text fw-medium">Cats</span>
                    <i className="icon2 icon-caret-right" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop-default`}
                    className="nav-shop_link h6 link-purple"
                  >
                    <i className="icon icon-toy" />
                    <span className="text fw-medium">Toys</span>
                    <i className="icon2 icon-caret-right" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop-default`}
                    className="nav-shop_link h6 link-purple"
                  >
                    <i className="icon icon-bird" />
                    <span className="text fw-medium">Birds</span>
                    <i className="icon2 icon-caret-right" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop-default`}
                    className="nav-shop_link h6 link-purple"
                  >
                    <i className="icon icon-fish" />
                    <span className="text fw-medium">Fish</span>
                    <i className="icon2 icon-caret-right" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop-default`}
                    className="nav-shop_link h6 link-purple"
                  >
                    <i className="icon icon-reptitle" />
                    <span className="text fw-medium">Reptiles</span>
                    <i className="icon2 icon-caret-right" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop-default`}
                    className="nav-shop_link h6 link-purple"
                  >
                    <i className="icon icon-spider" />
                    <span className="text fw-medium">Small pets</span>
                    <i className="icon2 icon-caret-right" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/shop-default`}
                    className="nav-shop_link h6 link-purple"
                  >
                    <i className="icon icon-best-choice" />
                    <span className="text fw-medium">Best choice</span>
                    <i className="icon2 icon-caret-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
