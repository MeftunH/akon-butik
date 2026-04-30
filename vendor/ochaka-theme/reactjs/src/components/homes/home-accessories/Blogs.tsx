import { Link } from "react-router-dom";

import { fashionBlogPosts } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section className="themesFlat">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Read Our Blog</h2>
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
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd15",
          }}
        >
          {fashionBlogPosts.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="article-blog style-radius hover-img4 wow fadeInLeft"
                {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
              >
                <Link to={`/blog-detail`} className="entry_image img-style4">
                  <img
                    src={item.imgSrc}
                    alt="Blog"
                    className="lazyload aspect-ratio-0"
                    width={648}
                    height={700}
                  />
                </Link>
                <div className="entry_tag pst-2 primary-3">
                  <Link to={`/blog-detail`} className="name-tag h6">
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
          <div className="sw-dot-default tf-sw-pagination spd15" />
        </Swiper>
      </div>
    </section>
  );
}
