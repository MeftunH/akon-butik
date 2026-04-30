import { testimonialsV02TypeSpace } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-2">
          <div className="flex-sm-1 wow fadeInUp">
            <h1 className="s-title mb-8">Customer Reviews</h1>
            <p className="s-subtitle h6">
              Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
              elit
            </p>
          </div>
          <div className="group-btn-slider wow fadeInUp" data-wow-delay="0.1s">
            <div className="tf-sw-nav style-2 type-small nav-prev-swiper snbp118">
              <i className="icon icon-caret-left" />
            </div>
            <div className="tf-sw-nav style-2 type-small nav-next-swiper snbn118">
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
            prevEl: ".snbp118",
            nextEl: ".snbn118",
          }}
        >
          {testimonialsV02TypeSpace.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`testimonial-V02 type-space-2 hover-img wow fadeInUp`}
                {...(item.delay ? { "data-wow-delay": item.delay } : {})}
              >
                <div className="tes_product">
                  <div className="product-image img-style">
                    <img
                      className="lazyload"
                      src={item.productImg}
                      alt={item.productAlt}
                      width={648}
                      height={832}
                    />
                  </div>
                  <div className="product-infor">
                    <h5 className="prd_name fw-normal">
                      <Link to={`/product-detail/1`} className="link">
                        {item.productName}
                      </Link>
                    </h5>
                    <h6 className="prd_price">{item.productPrice}</h6>
                  </div>
                </div>
                <div className="tes_content">
                  <div className="tes_icon">
                    <i className="icon icon-block-quote" />
                  </div>
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
