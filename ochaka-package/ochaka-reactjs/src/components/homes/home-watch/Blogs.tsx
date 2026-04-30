import { Link } from "react-router-dom";

import { blogPosts4 } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title wow fadeInUp">
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
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd132",
          }}
        >
          {blogPosts4.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`article-blog style-row hover-img4 wow fadeInLeft`}
                {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
              >
                <Link
                  to={`/blog-detail`}
                  className="entry_image img-style4 flex-xl-1"
                >
                  <img
                    src={item.imgSrc}
                    alt={item.alt}
                    className="lazyload"
                    width={648}
                    height={700}
                  />
                </Link>
                <div className="blog-content flex-1">
                  <a href="#" className="entry_date name-tag h6 link">
                    {item.date}
                  </a>
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
          <div className="sw-dot-default tf-sw-pagination spd132" />
        </Swiper>
      </div>
    </section>
  );
}
