import { Link } from "react-router-dom";

import { carMaintenanceBlogs } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function Blogs() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="sect-title type-4 wow fadeInUp">
          <h2 className="s-title fw-normal">Read our blog</h2>
          <div className="group-btn-slider wow fadeInUp" data-wow-delay="0.1s">
            <div className="tf-sw-nav style-2 type-small nav-prev-swiper snbp37">
              <i className="icon icon-caret-left" />
            </div>
            <div className="tf-sw-nav style-2 type-small nav-next-swiper snbn37">
              <i className="icon icon-caret-right" />
            </div>
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper swiper-blog"
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
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd37",
          }}
          navigation={{
            prevEl: ".snbp37",
            nextEl: ".snbn37",
          }}
        >
          {carMaintenanceBlogs.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="article-blog type-space-2 hover-img4 wow fadeInUp">
                <Link to={`/blog-detail`} className="entry_image img-style4">
                  <img
                    src={item.imgSrc}
                    alt="Blog"
                    className="lazyload aspect-ratio-0"
                    width={648}
                    height={700}
                  />
                </Link>
                <div className="entry_tag">
                  <Link
                    to={`/blog-detail`}
                    className="name-tag h6 bg-primary primary-5"
                  >
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

          <div className="sw-dot-default d-xl-none tf-sw-pagination spd37" />
        </Swiper>
      </div>
    </section>
  );
}
