import { productThumbs, testimonialsV03 } from "@/data/testimonials";
import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

interface Testimonial {
  title: string;
  text: string;
  author: string;
}

interface ProductThumb {
  imgSrc: string;
  imgAlt: string;
  title: string;
  price: string | number;
}

export default function Testimonials() {
  const [swiperThumb, setSwiperThumb] = useState<SwiperInstance | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperInstance | null>(null);

  return (
    <section className="flat-spacing pt-0">
      <div className="tf-sw-thumbs tes_thumb">
        <div className="container">
          <div className="s-banner-tes">
            {/* Left column (reviews) */}
            <div className="col-left">
              <h1 className="s-title sect-title wow fadeInUp">
                Customer Reviews
              </h1>

              <Swiper
                dir="ltr"
                className="swiper sw-thumb sw-tes-thumb wow fadeInUp"
                modules={[Thumbs, Navigation]}
                thumbs={{ swiper: swiperThumb ?? undefined }}
                navigation={{
                  prevEl: ".snbp50",
                  nextEl: ".snbn50",
                }}
                onSwiper={setMainSwiper}
              >
                {testimonialsV03.map((item: Testimonial, index: number) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="testimonial-V03">
                      <div className="tes_icon">
                        <i className="icon icon-block-quote" />
                      </div>
                      <div className="d-grid">
                        <h4 className="tes_title">{item.title}</h4>
                        <p className="tes_text h4">{item.text}</p>
                        <div className="tes_author">
                          <p className="author-name h4">{item.author}</p>
                          <i className="author-verified icon-check-circle" />
                        </div>
                        <div className="rate_wrap">
                          {[...Array(5)].map((_, i) => (
                            <i className="icon-star text-star" key={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="group-btn-slider wow fadeInUp">
                <div className="tf-sw-nav style-2 type-small nav-prev-swiper snbp50">
                  <i className="icon icon-caret-left" />
                </div>
                <div className="tf-sw-nav style-2 type-small nav-next-swiper snbn50">
                  <i className="icon icon-caret-right" />
                </div>
              </div>
            </div>

            {/* Right column (product thumbs) */}
            <div className="col-right">
              <div className="s-image overflow-hidden">
                <img
                  className="ani-zoom lazyload"
                  src="/images/section/s-img-1.jpg"
                  alt=""
                  width={858}
                  height={822}
                />
              </div>

              <Swiper
                dir="ltr"
                modules={[Thumbs]}
                onSwiper={setSwiperThumb}
                className="swiper sw-main-thumb sw-tes wow fadeInUp"
                onSlideChange={(s) => {
                  const idx =
                    typeof s.realIndex === "number"
                      ? s.realIndex
                      : s.activeIndex;
                  mainSwiper?.slideTo(idx);
                }}
              >
                {productThumbs.map((item: ProductThumb, index: number) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="product-thumbs">
                      <div className="image">
                        <img
                          className="lazyload"
                          src={item.imgSrc}
                          alt={item.imgAlt}
                          width={546}
                          height={560}
                        />
                      </div>
                      <div className="content">
                        <a href="#" className="link h4 name text-black">
                          {item.title}
                        </a>
                        <p className="h6 price text-black">{item.price}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
