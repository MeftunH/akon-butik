import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const slideItems = [
  "Shopping day, 15% off all products",
  "Free shipping on orders of $50 or more",
  "Pick up in store: Ready in an hour",
];
export default function Topbar6() {
  return (
    <div className="tf-topbar_slide bg-black">
      <div className="topbar-top tf-btn-swiper-main">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-1 d-none d-sm-block">
              <div className="text-white link d-flex justify-content-end nav-prev-swiper snbp6">
                <i className="icon icon-caret-left" />
              </div>
            </div>
            <div className="col-lg-4 col-sm-7 col-12">
              <Swiper
                dir="ltr"
                className="swiper tf-swiper"
                loop
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 30000,
                }}
                navigation={{
                  prevEl: ".snbp6",
                  nextEl: ".snbn6",
                }}
              >
                {slideItems.map((text, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <h6 className="text-white fw-normal text-center">{text}</h6>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="col-sm-1 d-none d-sm-block">
              <div className="text-white link d-flex nav-next-swiper snbn6">
                <i className="icon icon-caret-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
