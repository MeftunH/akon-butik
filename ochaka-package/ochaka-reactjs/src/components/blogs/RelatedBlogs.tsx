import { Link } from "react-router-dom";

import { blogArticles2 } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function RelatedBlogs() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="sect-title">
          <h1>Related Articles</h1>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd1",
          }}
        >
          {blogArticles2.map((article, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="article-blog hover-img4">
                <div className="blog-image">
                  <Link to={`/blog-detail`} className="entry_image img-style4">
                    <img
                      src={article.imgSrc}
                      alt=""
                      className="lazyload"
                      width={article.width}
                      height={article.height}
                    />
                  </Link>
                </div>
                <div className="blog-content p-0">
                  <Link to={`/blog-detail`} className="entry_name link h4">
                    {article.title}
                  </Link>
                  <p className="entry_date">{article.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd1" />
        </Swiper>
      </div>
    </section>
  );
}
