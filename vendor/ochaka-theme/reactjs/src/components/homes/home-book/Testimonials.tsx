import { testimonialV02Type3Data } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function Testimonials() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-4 align-items-start">
          <div className="flex-sm-1 wow fadeInUp">
            <h2 className="s-title fw-normal">What Our Customers Says!</h2>
          </div>
          <div className="group-btn-slider wow fadeInUp" data-wow-delay="0.1s">
            <div className="tf-sw-nav style-2 hv-primary primary-6 type-small nav-prev-swiper snbp36">
              <i className="icon icon-caret-left" />
            </div>
            <div className="tf-sw-nav style-2 hv-primary primary-6 type-small nav-next-swiper snbn36">
              <i className="icon icon-caret-right" />
            </div>
          </div>
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
              spaceBetween: 32,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 48,
            },
          }}
          modules={[Navigation]}
          navigation={{
            prevEl: ".snbp36",
            nextEl: ".snbn36",
          }}
        >
          {testimonialV02Type3Data.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="testimonial-V02 type-space-3 hover-img wow fadeInUp">
                <div className="tes_product">
                  <div className="product-image img-style">
                    <img
                      className="lazyload"
                      src={item.imageSrc}
                      alt="BLOG"
                      width={400}
                      height={605}
                    />
                  </div>
                </div>
                <div className="tes_content">
                  <h4 className="tes_title">{item.title}</h4>
                  <h6 className="prd_price fw-semibold">{item.price}</h6>
                  <p className="tes_text h4">{item.text}</p>
                  <div className="tes_author">
                    <p className="author-name h4">{item.author}</p>
                    <span className="d-flex">
                      <i className="author-verified icon-check-circle fs-24" />
                    </span>
                  </div>
                  <div className="rate_wrap">
                    {[...Array(5)].map((_, i) => (
                      <i className="icon-star text-star" key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
