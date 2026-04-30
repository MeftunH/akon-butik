import { Link } from "react-router-dom";

import { blogPosts } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Our Blog</h2>
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
            el: ".spd92",
          }}
        >
          {blogPosts.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`article-blog style-radius hover-img4 wow fadeInLeft`}
                {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
              >
                <Link to={`/blog-detail`} className="entry_image img-style4">
                  <img
                    src={item.imgSrc}
                    alt="Blog"
                    className="lazyload aspect-ratio-0"
                    width={672}
                    height={525}
                  />
                </Link>
                <div className="entry_tag pst-2 primary-3">
                  <a href={item.dateLink} className="name-tag h6 link">
                    {item.date}
                  </a>
                </div>
                <div className="blog-content">
                  <Link to={`/blog-detail`} className="entry_name link h4">
                    {item.title}
                  </Link>
                  <p className="text h6">{item.text}</p>
                  <Link to={`/blog-detail`} className="tf-btn-line fw-normal">
                    Read more
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd92" />
        </Swiper>
      </div>
    </section>
  );
}
