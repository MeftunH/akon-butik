import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { testimonialData } from "@/data/testimonials";

export default function Testimonials() {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleThumbClick = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="flat-spacing pt-0">
              <span className="br-line d-flex" />
            </div>
            <div className="sect-title text-center">
              <h1 className="s-title mb-8">Customer Reviews</h1>
              <p className="s-subtitle h6">
                Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
                elit
              </p>
            </div>

            <div className="slider-thumb-wrap">
              <Swiper
                ref={swiperRef}
                dir="ltr"
                className="swiper tf-swiper slider-content-thumb"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {testimonialData.map((item, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="testimonial-V05">
                      <div className="tes_icon">
                        <i className="icon icon-block-quote" />
                      </div>
                      <div className="tes_author">
                        <p className="author-name h4">{item.name}</p>
                        <i className="author-verified icon-check-circle" />
                      </div>
                      <div className="rate_wrap">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="icon-star text-star" />
                        ))}
                      </div>
                      <p className="tes_text h4">{item.text}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Slider Thumbnails */}
              <div className="slider-btn-thumbs">
                {testimonialData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleThumbClick(index)}
                    className={`btn-thumbs ${
                      index === activeIndex ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      alt="Avatar"
                      src={item.avatar}
                      width={150}
                      height={150}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
