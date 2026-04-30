import { Link } from "react-router-dom";

import { blogItems8 } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section>
      <div className="container">
        <div className="sect-title type-3 type-2 wow fadeInUp">
          <h2 className="s-title type-semibold text-nowrap">Our Blog</h2>
          <Link
            to={`/blog-grid`}
            className="tf-btn-icon h6 fw-medium text-nowrap"
          >
            View All Blog
            <i className="icon icon-caret-circle-right" />
          </Link>
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
            el: ".spd51",
          }}
        >
          {blogItems8.map((item, idx) => (
            <SwiperSlide className="swiper-slide" key={idx}>
              <div
                className="article-blog type-space-2 hover-img4 wow fadeInLeft"
                data-wow-delay={item.wowDelay}
              >
                <Link to={`/blog-detail`} className="entry_image img-style4">
                  <img
                    src={item.imgSrc}
                    alt={item.alt}
                    className="lazyload aspect-ratio-0"
                    width={896}
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
          <div className="sw-dot-default tf-sw-pagination spd51" />
        </Swiper>
      </div>
    </section>
  );
}
