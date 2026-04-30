import { Link } from "react-router-dom";

import { categories5 } from "@/data/categories";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Categories() {
  return (
    <section className="themesFlat">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Shop by category</h2>
          <Link to={`/shop-default`} className="tf-btn-line">
            {" "}
            View All Books{" "}
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              spaceBetween: 32,
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd29",
          }}
        >
          {categories5.map((item, index) => (
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
                <p className="collection_name h4 link">
                  {item.title}{" "}
                  <span className="count text-main-2">({item.count})</span>
                </p>
              </Link>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd29" />
        </Swiper>
      </div>
    </section>
  );
}
