import { Link } from "react-router-dom";

import { blogPosts2 } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h2 className="s-title fw-normal mb-8">Our Blog</h2>
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
            el: ".spd22",
          }}
        >
          {blogPosts2.map((post, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="article-blog type-space-2 hover-img4 wow fadeInUp"
                data-wow-delay={post.wowDelay}
              >
                <Link to={`/blog-detail`} className="entry_image img-style4">
                  <img
                    src={post.imgSrc}
                    alt="Blog"
                    className="lazyload aspect-ratio-0"
                    width={672}
                    height={525}
                  />
                </Link>
                <div className="entry_tag">
                  <Link to={`/blog-grid`} className="name-tag h6 link">
                    {post.date}
                  </Link>
                </div>
                <div className="blog-content">
                  <Link to={`/blog-detail`} className="entry_name link h4">
                    {post.title}
                  </Link>
                  <p className="text h6">{post.description}</p>
                  <Link to={`/blog-detail`} className="tf-btn-line fw-normal">
                    Read more
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd22" />
        </Swiper>
      </div>
    </section>
  );
}
