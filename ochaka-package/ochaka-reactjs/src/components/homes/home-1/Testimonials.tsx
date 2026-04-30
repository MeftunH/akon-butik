import { Link } from "react-router-dom";

import { testimonials } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Testimonials() {
  return (
    <section className="flat-spacing pb-0">
      <div className="container">
        <div className="h1 sect-title text-black fw-medium text-center wow fadeInUp">
          Customer Reviews
        </div>
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
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd14",
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="testimonial-V01 wow fadeInLeft"
                {...(item.delay ? { "data-wow-delay": item.delay } : {})}
              >
                <div>
                  <h4 className="tes_title">{item.title}</h4>
                  <p className="tes_text h4">{item.text}</p>
                  <div className="tes_author">
                    <p className="author-name h5">{item.author}</p>
                    <i className="author-verified icon-check-circle" />
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
          <div className="sw-dot-default tf-sw-pagination spd14" />
        </Swiper>
      </div>
    </section>
  );
}
