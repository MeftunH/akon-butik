import { Link } from "react-router-dom";

import { blogItems } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <div className="flat-spacing">
      <div className="container">
        <div className="h1 sect-title text-black fw-medium text-center wow fadeInUp">
          Read Our Blog
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
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd7",
          }}
        >
          {blogItems.map((item, idx) => (
            <SwiperSlide className="swiper-slide" key={idx}>
              <div
                className="article-blog type-space-2 hover-img4 wow fadeInLeft"
                data-wow-delay={item.wowDelay}
              >
                <Link to={`/blog-detail`} className="entry_image img-style4">
                  <img
                    src={item.imgSrc}
                    alt="Image"
                    className="lazyload aspect-ratio-0"
                    width={648}
                    height={700}
                  />
                </Link>
                <div className="entry_tag">
                  <Link to={`/blog-grid`} className="name-tag h6 link">
                    {item.date}
                  </Link>
                </div>
                <div className="blog-content">
                  <Link to={`/blog-detail`} className="entry_name link h4">
                    {item.title}
                  </Link>
                  <p className="text h6">{item.description}</p>
                  <Link to={`/blog-detail`} className="tf-btn-line">
                    Read more
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd7" />
        </Swiper>
      </div>
    </div>
  );
}
