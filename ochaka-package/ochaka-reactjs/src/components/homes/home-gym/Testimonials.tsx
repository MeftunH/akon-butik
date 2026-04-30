import { gymTestimonials } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <section
      className="flat-spacing has-overlay-50 parallaxie"
      style={{ backgroundImage: 'url("/images/banner/banner-gym-4.jpg")' }}
    >
      <div className="position-relative z-5">
        <div className="container">
          <div className="sect-title text-center wow fadeInUp">
            <h1 className="s-title mb-8 text-white">CUSTOMER REVIEWS</h1>
            <p className="s-subtitle h6 text-white">
              Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
              elit
            </p>
          </div>
          <div className="tf-btn-swiper-main pst-3 wow fadeInUp">
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
                el: ".spd83",
              }}
              navigation={{
                prevEl: ".snbp83",
                nextEl: ".snbn83",
              }}
            >
              {gymTestimonials.map((item, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="testimonial-V01 border-0">
                    <div>
                      <h4 className="tes_title">{item.title}</h4>
                      <p className="tes_text h4 mb-32">{item.text}</p>
                      <div className="tes_author">
                        <p className="author-name h4">{item.author}</p>
                        <i className="author-verified icon-check-circle fs-24" />
                      </div>
                      <div className="rate_wrap">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="icon-star text-star" />
                        ))}
                      </div>
                    </div>
                    <span className="br-line" />
                    <div className="tes_product">
                      <div className="product-image">
                        <img
                          className="lazyload"
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          width={972}
                          height={1296}
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
              <div className="sw-dot-default style-white tf-sw-pagination spd83" />
            </Swiper>
            <div className="tf-sw-nav hover-primary nav-prev-swiper snbp83">
              <i className="icon icon-caret-left" />
            </div>
            <div className="tf-sw-nav hover-primary nav-next-swiper snbn83">
              <i className="icon icon-caret-right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
