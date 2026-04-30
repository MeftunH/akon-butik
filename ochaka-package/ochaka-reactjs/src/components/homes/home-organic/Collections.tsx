import { Link } from "react-router-dom";

import { boxImages2 } from "@/data/collections";

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
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd101",
          }}
        >
          {boxImages2.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="box-image_V06 type-space-2 hover-img wow fadeInLeft"
                {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
              >
                <ul className="product-badge_list">
                  <li
                    className={`product-badge_item fw-normal h6 ${item.badge.className}`}
                  >
                    {item.icon && <i className="icon icon-thunder" />}{" "}
                    {item.badge.text}
                  </li>
                </ul>
                <Link
                  to={`/shop-default`}
                  className="box-image_image img-style"
                >
                  <img
                    src={item.imgSrc}
                    alt="IMG"
                    className="lazyload"
                    width={896}
                    height={524}
                  />
                </Link>
                <div className="box-image_content">
                  <p className="sub-title h6 fw-semibold text-primary">
                    {item.subtitle}
                  </p>
                  <h4 className="title">
                    <Link
                      to={`/shop-default`}
                      className="link"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></Link>
                  </h4>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn-line letter-space-0"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd101" />
        </Swiper>
      </div>
    </section>
  );
}
