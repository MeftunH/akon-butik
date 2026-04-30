import { Link } from "react-router-dom";

import { testimonialV04Data } from "@/data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Testimonials() {
  return (
    <section className="themesFlat">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="s-title mb-8">Customer Reviews</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
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
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd124",
          }}
        >
          {testimonialV04Data.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="testimonial-V04">
                <div className="tes_content">
                  <div className="author-image">
                    <img
                      className="lazyload"
                      src={item.authorImg}
                      alt={item.author}
                      width={150}
                      height={150}
                    />
                  </div>
                  <h4 className="tes_title fw-semibold">{item.title}</h4>
                  <p className="tes_text h6">{item.text}</p>
                  <p className="tes_author h4">{item.author}</p>
                  <div className="rate_wrap">
                    {[...Array(5)].map((_, i) => (
                      <i className="icon-star text-star" key={i} />
                    ))}
                  </div>
                </div>
                <div className="tes_product">
                  <Link to={`/product-detail/1`} className="product-image">
                    <img
                      className="lazyload"
                      src={item.productImg}
                      alt={item.productName}
                      width={648}
                      height={864}
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
          <div className="sw-dot-default tf-sw-pagination spd124" />
        </Swiper>
      </div>
    </section>
  );
}
