import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const orderStats = [
  {
    iconClass: "icon icon-package-thin",
    label: "Wait for confirmation",
    count: 29,
  },
  {
    iconClass: "icon icon-check-fat",
    label: "Successful order",
    count: 35,
  },
  {
    iconClass: "icon icon-box-arrow-up",
    label: "Total order",
    count: 108,
  },
];
export default function StatesSlider() {
  return (
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
          spaceBetween: 16,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 48,
        },
      }}
      modules={[Pagination]}
      pagination={{
        clickable: true,
        el: ".spd3",
      }}
    >
      {orderStats.map((item, index) => (
        <SwiperSlide className="swiper-slide" key={index}>
          <div className="order-box">
            <div className="order_icon">
              <i className={item.iconClass} />
            </div>
            <div className="order_info">
              <p className="info_label h6">{item.label}</p>
              <h2 className="info_count type-semibold">{item.count}</h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="sw-dot-default tf-sw-pagination spd3" />
    </Swiper>
  );
}
