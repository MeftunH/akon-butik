import { Link } from "react-router-dom";

import { testimonialsV01 } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function Testimonials() {
  return (
    <section className="flat-spacing bg-white-smoke">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="s-title mb-8">Customer Reviews</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <div className="tf-btn-swiper-main pst-2">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            spaceBetween={12}
            breakpoints={{
              0: { slidesPerView: 1 },
              575: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 48,
              },
            }}
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: ".spd52",
            }}
            navigation={{
              prevEl: ".snbp52",
              nextEl: ".snbn52",
            }}
          >
            {testimonialsV01.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div
                  className="testimonial-V01 border-0 wow fadeInLeft"
                  {...(item.delay ? { "data-wow-delay": item.delay } : {})}
                >
                  <div>
                    <h4 className="tes_title">{item.title}</h4>
                    <p className="tes_text h4">{item.text}</p>
                    <div className="tes_author">
                      <p className="author-name h4">{item.author}</p>
                      <i className="author-verified icon-check-circle fs-24" />
                    </div>
                    <div className="rate_wrap">
                      {[...Array(5)].map((_, i) => (
                        <i className="icon-star text-star" key={i} />
                      ))}
                    </div>
                  </div>
                  <span className="br-line" />
                  <div className="tes_product">
                    <div className="product-image">
                      <img
                        className="lazyload"
                        src={item.imgSrc}
                        alt={item.imgAlt}
                        width={1044}
                        height={1392}
                      />
                    </div>
                    <div className="product-infor">
                      <h5 className="prd_name">
                        <Link to={`/product-detail/1`} className="link">
                          {item.productName}
                        </Link>
                      </h5>
                      <h6 className="prd_price">{item.productPrice}</h6>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default tf-sw-pagination spd52" />
          </Swiper>
          <div className="tf-sw-nav nav-prev-swiper snbp52">
            <i className="icon icon-caret-left" />
          </div>
          <div className="tf-sw-nav nav-next-swiper snbn52">
            <i className="icon icon-caret-right" />
          </div>
        </div>
      </div>
    </section>
  );
}
