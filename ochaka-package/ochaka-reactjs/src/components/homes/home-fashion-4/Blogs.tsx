import { Link } from "react-router-dom";

import { blogItems3 } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <div className="flat-spacing pt-0">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <p className="s-title h1 fw-medium mb-8">Our Blog</p>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
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
              spaceBetween: 32,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd72",
          }}
        >
          {blogItems3.map((item, idx) => (
            <SwiperSlide className="swiper-slide" key={idx}>
              <div
                className="article-blog hover-img4 wow fadeInUp"
                data-wow-delay={item.wowDelay}
              >
                <div className="blog-image">
                  <Link to={`/blog-detail`} className="entry_image img-style4">
                    <img
                      src={item.imgSrc}
                      alt=""
                      className="lazyload"
                      width={896}
                      height={700}
                    />
                  </Link>
                </div>
                <div className="blog-content p-0">
                  <Link to={`/blog-detail`} className="entry_name link h4">
                    {item.title}
                  </Link>
                  <p className="entry_date">{item.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd72" />
        </Swiper>
      </div>
    </div>
  );
}
