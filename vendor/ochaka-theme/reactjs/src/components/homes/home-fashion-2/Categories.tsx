import { Link } from "react-router-dom";

import { categories } from "@/data/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Categories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="title mb-8">Popular Categories</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 48,
            },
          }}
          spaceBetween={12}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd61",
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link
                to={`/shop-default`}
                className="widget-collection style-circle hover-img"
              >
                <div className="collection_image img-style">
                  <img
                    className="lazyload"
                    src={item.imgSrc}
                    alt=""
                    width={400}
                    height={400}
                  />
                </div>
                <p className="collection_name h5 link">
                  {item.title}{" "}
                  <span className="count text-main-2">({item.count})</span>
                </p>
              </Link>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd61" />
        </Swiper>
      </div>
    </section>
  );
}
