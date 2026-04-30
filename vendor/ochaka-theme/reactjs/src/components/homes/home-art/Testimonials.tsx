import { Link } from "react-router-dom";

import { testimonialV02Data } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function Testimonials() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="sect-title type-2">
          <div className="flex-sm-1 wow fadeInUp">
            <h2 className="s-title fw-normal mb-8">Customer reviews</h2>
            <p className="s-subtitle h6">
              Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
              elit
            </p>
          </div>
          <div className="group-btn-slider wow fadeInUp" data-wow-delay="0.1s">
            <div className="tf-sw-nav style-2 type-small nav-prev-swiper snbp28">
              <i className="icon icon-caret-left" />
            </div>
            <div className="tf-sw-nav style-2 type-small nav-next-swiper snbn28">
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
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd28",
          }}
          navigation={{
            prevEl: ".snbp28",
            nextEl: ".snbn28",
          }}
        >
          {testimonialV02Data.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="testimonial-V02 hover-img wow fadeInLeft"
                data-wow-delay={item.delay}
              >
                <div className="tes_product">
                  <div className="product-image img-style">
                    <img
                      className="lazyload"
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      width={648}
                      height={832}
                    />
                  </div>
                  <div className="product-infor">
                    <h5 className="prd_name fw-normal">
                      <Link to={`/product-detail/1`} className="link h5">
                        {item.productName}
                      </Link>
                    </h5>
                    <h6 className="prd_price">{item.price}</h6>
                  </div>
                </div>
                <div className="tes_content">
                  <div className="tes_icon">
                    <i className="icon icon-block-quote" />
                  </div>
                  <h4 className="tes_title">{item.title}</h4>
                  <p className="tes_text h4">{item.text}</p>
                  <p className="tes_author h4">{item.author}</p>
                  <div className="rate_wrap">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="icon-star text-star" />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination d-xl-none spd28" />
        </Swiper>
      </div>
    </section>
  );
}
