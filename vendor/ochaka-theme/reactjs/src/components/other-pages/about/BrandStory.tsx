import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function BrandStory() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sect-title text-center">
          <h1 className="s-title mb-8">Brand Story</h1>
          <p className="s-subtitle h6">
            Up to 50% off Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </p>
        </div>
        <div className="box-intro has-mb text-center">
          <h4 className="slogan fw-normal">
            WE PRIORITIZE SUSTAINABLE AND ENVIRONMENTALLY FRIENDLY DEVELOPMENT.
          </h4>
          <p className="intro-text">
            Morbi finibus erat ullamcorper malesuada placerat. Integer malesuada
            orci sed nulla scelerisque fermentum. Suspendisse lacinia elit{" "}
            <br className="d-none d-xxl-block" />
            at bibendum tincidunt.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd142",
          }}
        >
          {/* item 1 */}
          <SwiperSlide className="swiper-slide">
            <div className="wg-icon-image hover-img">
              <div className="image img-style">
                <img
                  className="lazyload"
                  src="/images/section/story-1.jpg"
                  alt=""
                  width={896}
                  height={1030}
                />
              </div>
              <div className="box-icon">
                <span className="icon">
                  <svg
                    width={56}
                    height={56}
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_643_16068"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={56}
                      height={56}
                    >
                      <path
                        d="M55.25 55.25V0.75H0.75V55.25H55.25Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                    </mask>
                    <g mask="url(#mask0_643_16068)">
                      <path
                        d="M51.6682 33.5091H18.0508M30.7811 44.2344C29.205 44.2344 27.9274 42.9568 27.9274 41.3807C27.9274 39.8047 29.205 38.5271 30.7811 38.5271C32.3571 38.5271 33.6348 39.8047 33.6348 41.3807C33.6348 42.9568 32.3571 44.2344 30.7811 44.2344Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M38.5503 20.3796V6.41859H31.1682V20.3796C23.353 22.0814 17.498 29.0756 17.498 37.4452C17.498 47.0887 25.2709 54.9062 34.8593 54.9062C44.4476 54.9062 52.2205 47.0887 52.2205 37.4452C52.2205 29.0756 46.3655 22.0814 38.5503 20.3796Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M41.1696 6.41797H28.5486V1.09328H41.1696V6.41797ZM21.0637 6.41797H3.7793V1.09328H21.0637V6.41797Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.4262 54.9062H12.416C9.61524 54.9062 7.34473 52.6357 7.34473 49.8349V6.4186H17.4975V49.8349C17.4975 52.6357 15.227 54.9062 12.4262 54.9062Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.79785 15.5742H17.2367"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.79785 24.625H10.5066"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.79785 31.5859H10.5066"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.79785 38.5508H10.5066"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.79785 45.5117H10.5066"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M46.9992 15.5766C46.9992 16.6087 46.1626 17.4453 45.1304 17.4453C44.0984 17.4453 43.2617 16.6087 43.2617 15.5766C43.2617 14.5446 44.0984 13.708 45.1304 13.708C46.1626 13.708 46.9992 14.5446 46.9992 15.5766Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </span>
                <div className="content">
                  <h3 className="caption fw-normal">No harmful chemicals</h3>
                  <p className="sub-text">
                    Morbi finibus erat ullamcorper malesuada
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* item 2 */}
          <SwiperSlide className="swiper-slide">
            <div className="wg-icon-image hover-img">
              <div className="image img-style">
                <img
                  className="lazyload"
                  src="/images/section/story-2.jpg"
                  alt=""
                  width={896}
                  height={1030}
                />
              </div>
              <div className="box-icon">
                <span className="icon">
                  <svg
                    width={56}
                    height={56}
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_643_16092"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={56}
                      height={56}
                    >
                      <path
                        d="M55.25 55.25V0.75H0.75V55.25H55.25Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                    </mask>
                    <g mask="url(#mask0_643_16092)">
                      <path
                        d="M19.6885 1.09373H36.3093L28.0005 11.0117L19.6885 1.09373Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.6884 1.09251L16.2471 6.05309L22.6772 15.3633L28.0005 11.0105"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M36.3089 1.09251L39.7502 6.05309L33.3233 15.3633L28 11.0105"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.28058 18.6541C10.527 21.032 11.0447 24.4114 11.0447 26.9939V54.9062H44.956V26.9939C44.956 24.4114 45.4739 21.032 46.7201 18.6541M16.247 6.05438L9.46662 9.46173C2.42585 12.9991 1.37793 22.3559 1.37793 31.7716H11.0447M39.7505 6.05438L46.5311 9.46173C53.5719 12.9991 54.6228 22.3559 54.6228 31.7716H44.956"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.9941 23.4883H28.0004"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.9941 17.25H28.0004"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.0442 26.9922H1.49219"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M44.9561 26.9922H54.5051"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M44.9562 50.1289H11.0449"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </span>
                <div className="content">
                  <h3 className="caption fw-normal">High-quality product</h3>
                  <p className="sub-text">
                    Morbi finibus erat ullamcorper malesuada
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* item 3 */}
          <SwiperSlide className="swiper-slide">
            <div className="wg-icon-image hover-img">
              <div className="image img-style">
                <img
                  className="lazyload"
                  src="/images/section/story-3.jpg"
                  alt=""
                  width={896}
                  height={1030}
                />
              </div>
              <div className="box-icon">
                <span className="icon">
                  <svg
                    width={56}
                    height={56}
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_643_16111"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={56}
                      height={56}
                    >
                      <path
                        d="M55.25 55.25V0.75H0.75V55.25H55.25Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                    </mask>
                    <g mask="url(#mask0_643_16111)">
                      <path
                        d="M11.2432 50.3736L28.8294 52.4844C29.88 52.6111 32.1238 53.2218 34.7726 52.323L52.0644 46.4525C55.8145 44.9715 54.4284 40.1074 49.8461 40.8067L48.5738 41.0188L35.3043 43.5663L26.7343 43.6012M32.1903 43.579C35.3043 43.5663 36.6334 38.0945 30.8579 37.1769L24.4557 36.0249C23.0348 35.9268 21.1835 36.3793 18.8858 37.0629L11.2432 39.3352"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.2428 51.106V38.7606C11.2428 37.8966 10.5372 37.1878 9.67004 37.1878H2.66339C1.79944 37.1878 1.09375 37.8966 1.09375 38.7606V51.106C1.09375 51.97 1.79944 52.6758 2.66339 52.6758H9.67004C10.5372 52.6758 11.2428 51.97 11.2428 51.106Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.80859 6.9492C8.31184 21.8296 30.1387 22.7062 25.7967 13.4748C35.2655 6.48403 14.7045 -1.75364 6.80859 6.9492Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M30.8572 23.3281C30.8572 17.0303 28.0406 13.3435 18.8535 10.3434"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M54.9058 6.9492C53.4026 21.8296 31.5726 22.7062 35.9145 13.4748C26.4489 6.48403 47.0099 -1.75364 54.9058 6.9492Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M30.8574 29.8555V23.3298C30.8574 17.0322 33.6739 13.3453 42.8611 10.3452"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.2783 36.9498C26.1362 24.3101 43.5452 30.1331 43.1021 42.0703"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </span>
                <div className="content">
                  <h3 className="caption fw-normal">
                    Environmentally friendly
                  </h3>
                  <p className="sub-text">
                    Morbi finibus erat ullamcorper malesuada
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <div className="sw-dot-default tf-sw-pagination spd142" />
        </Swiper>
      </div>
    </section>
  );
}
