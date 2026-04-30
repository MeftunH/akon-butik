import { testimonialV01Data } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <section className="flat-spacing bg-baby-blue-3">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Customer Reviews</h2>
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
              el: ".spd99",
            }}
            navigation={{
              prevEl: ".snbp99",
              nextEl: ".snbn99",
            }}
          >
            {testimonialV01Data.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div
                  className="testimonial-V01 border-0 radius-16 wow fadeInLeft"
                  {...(item.delay && { "data-wow-delay": item.delay })}
                >
                  <div>
                    <h4 className="tes_title">{item.title}</h4>
                    <p className="tes_text mb-md-32 h4">{item.text}</p>
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
                        src={item.imageSrc}
                        alt="Medical"
                        width={501}
                        height={500}
                      />
                    </div>
                    <div className="product-infor">
                      <h5 className="prd_name">
                        <Link to={`/product-detail/1`} className="link">
                          {item.productName}
                        </Link>
                      </h5>
                      <h6 className="prd_price">{item.price}</h6>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default style-primary type-space-2 tf-sw-pagination primary-3 spd99" />
          </Swiper>
          <div className="tf-sw-nav nav-prev-swiper snbp99">
            <i className="icon icon-caret-left" />
          </div>
          <div className="tf-sw-nav nav-next-swiper snbn99">
            <i className="icon icon-caret-right" />
          </div>
        </div>
      </div>
    </section>
  );
}
