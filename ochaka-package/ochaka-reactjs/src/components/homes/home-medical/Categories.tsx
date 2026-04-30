import { Link } from "react-router-dom";

import { categories7 } from "@/data/categories";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Categories() {
  return (
    <section className="flat-spacing pb-0">
      <div className="container">
        <div className="sect-title type-4 justify-content-center wow fadeInUp">
          <h2 className="s-title fw-normal">Shop by category</h2>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp primary-3"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd93",
          }}
        >
          {categories7.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link
                to={`/shop-default`}
                className="widget-collection style-circle hover-img"
              >
                <div className="collection_image img-style">
                  <img
                    className="lazyload"
                    src={item.imgSrc}
                    alt={item.title}
                    width={400}
                    height={400}
                  />
                </div>
                <div className="collection_content">
                  <p className="collection_name h5 link">{item.title}</p>
                  <span className="collection_count h6 text-main-2">
                    {item.count}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd93" />
        </Swiper>
      </div>
    </section>
  );
}
