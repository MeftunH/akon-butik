import { Link } from "react-router-dom";

import { imageBoxes } from "@/data/collections";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Collections() {
  return (
    <div className="s-collection px-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd40",
          }}
        >
          {imageBoxes.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`box-image_V06 type-space-2 has-overlay ${item.overlay} hover-img rounded-0`}
              >
                <ul className="product-badge_list">
                  <li
                    className={`product-badge_item fw-normal h6 ${item.badge.className} rounded-0`}
                  >
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
                    width={928}
                    height={524}
                  />
                </Link>
                <div className="box-image_content">
                  <h4 className="title">
                    <Link
                      to={`/shop-default`}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                      className="link text-white"
                    ></Link>
                  </h4>
                  <Link
                    to={`/shop-default`}
                    className="tf-btn-line style-white letter-space-0"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd40" />
        </Swiper>
      </div>
    </div>
  );
}
