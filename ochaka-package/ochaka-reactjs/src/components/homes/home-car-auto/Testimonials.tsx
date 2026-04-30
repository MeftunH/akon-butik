import { Link } from "react-router-dom";

import { testimonialV04Data3 } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function Testimonials() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-4">
          <div className="flex-sm-1 wow fadeInUp">
            <h2 className="s-title fw-normal">Customer reviews</h2>
          </div>
          <div className="group-btn-slider wow fadeInUp" data-wow-delay="0.1s">
            <div className="tf-sw-nav style-2 type-small nav-prev-swiper snbp44">
              <i className="icon icon-caret-left" />
            </div>
            <div className="tf-sw-nav style-2 type-small nav-next-swiper snbn44">
              <i className="icon icon-caret-right" />
            </div>
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd44",
          }}
          navigation={{
            prevEl: ".snbp44",
            nextEl: ".snbn44",
          }}
        >
          {testimonialV04Data3.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="testimonial-V04">
                <div className="tes_content">
                  <div className="author-image">
                    <img
                      className="lazyload"
                      src={item.avatar}
                      alt=""
                      width={150}
                      height={150}
                    />
                  </div>
                  <h4 className="tes_title fw-semibold">{item.title}</h4>
                  <p className="tes_text h6">{item.text}</p>
                  <p className="tes_author h4">{item.author}</p>
                  <div className="rate_wrap">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="icon-star text-star" />
                    ))}
                  </div>
                </div>
                <div className="tes_product">
                  <Link to={`/product-detail/1`} className="product-image">
                    <img
                      className="lazyload"
                      src={item.productImage}
                      alt={item.productAlt}
                      width={972}
                      height={1296}
                    />
                  </Link>
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
          <div className="sw-dot-default d-xl-none tf-sw-pagination spd44" />
        </Swiper>
      </div>
    </section>
  );
}
