import { Link } from "react-router-dom";

import { boxImageItems } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections() {
  return (
    <section className="themesFlat">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd94",
          }}
        >
          {boxImageItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`box-image_V06 type-space-3 wow fadeInLeft hover-img${
                  index === 0 ? " has-overlay" : ""
                }`}
                {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
              >
                <Link
                  to={`/shop-default`}
                  className="box-image_image img-style"
                >
                  <img
                    src={item.imgSrc}
                    alt="IMG"
                    className="lazyload"
                    width={928}
                    height={524}
                  />
                </Link>
                <div className="box-image_content">
                  <p className="sub-title h5 fw-semibold text-primary">
                    SALE OFF 50%
                  </p>
                  <h4 className="title">
                    <Link
                      to={`/shop-default`}
                      className="link"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                  </h4>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn type-small-5 animate-btn bg-primary primary-3"
                  >
                    Shop now
                    <i className="icon icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd94" />
        </Swiper>
      </div>
    </section>
  );
}
