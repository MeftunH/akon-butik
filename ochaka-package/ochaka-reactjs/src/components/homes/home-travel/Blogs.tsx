import { Link } from "react-router-dom";

import { blogPosts3 } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h1 className="s-title mb-8">Our Blog</h1>
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
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
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
            el: ".spd126",
          }}
        >
          {blogPosts3.map((post, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="article-blog hover-img4 wow fadeInLeft"
                {...(post.wowDelay && { "data-wow-delay": post.wowDelay })}
              >
                <div className="blog-image">
                  <Link to={`/blog-detail`} className="entry_image img-style4">
                    <img
                      src={post.imgSrc}
                      alt=""
                      className="lazyload"
                      width={896}
                      height={700}
                    />
                  </Link>
                </div>
                <div className="blog-content p-0">
                  <Link to={`/blog-detail`} className="entry_name link h4">
                    {post.title}
                  </Link>
                  <p className="entry_date">{post.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd126" />
        </Swiper>
      </div>
    </section>
  );
}
