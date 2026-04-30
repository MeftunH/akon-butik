import { useEffect, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { defaultImages } from "@/data/singleProductSlides";

interface SlideItem {
  src: string;
  color: string;
  size: string;
  width: number;
  height: number;
  video?: string;
  outOfStock?: boolean;
}

interface Slider1Props {
  activeColor?: string;
  setActiveColor?: (color: string) => void;
  firstItem?: string;
  slideItems?: SlideItem[];
  sliderThumbPosition?: string;
}

export default function Slider1({
  activeColor = "Black",
  setActiveColor = () => {},
  firstItem,
  slideItems = defaultImages as SlideItem[],
  sliderThumbPosition = "left",
}: Slider1Props) {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperInstance | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  // Derive slides (avoid mutating prop array)
  const slides: SlideItem[] =
    firstItem && slideItems.length
      ? [{ ...slideItems[0], src: firstItem }, ...slideItems.slice(1)]
      : slideItems;

  // Setup Drift zoom (desktop only)
  useEffect(() => {
    if (window.innerWidth < 1200) return;

    const pane =
      document.querySelector<HTMLElement>(".tf-zoom-main") || undefined;
    const images = document.querySelectorAll<HTMLElement>(".tf-image-zoom");

    // Initialize Drift (cast constructor to satisfy TS across versions)
    images.forEach((img) => {
      new (Drift as unknown as new (el: Element, opts: any) => any)(img, {
        zoomFactor: 2,
        paneContainer: pane,
        inlinePane: 0,
        handleTouch: false,
        hoverBoundingBox: true,
        containInline: true,
      });
    });

    // Handlers must be stable references for add/remove
    const handleOver = (e: Event) => {
      const target = e.currentTarget as HTMLElement | null;
      const parent = target?.closest<HTMLElement>(".section-image-zoom");
      parent?.classList.add("zoom-active");
    };
    const handleLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement | null;
      const parent = target?.closest<HTMLElement>(".section-image-zoom");
      parent?.classList.remove("zoom-active");
    };

    images.forEach((img) => {
      img.addEventListener("mouseover", handleOver);
      img.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("mouseover", handleOver);
        img.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  // Setup PhotoSwipe
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, []);

  // Slide to active color on color change
  useEffect(() => {
    const index = slides.findIndex((item) => item.color === activeColor);
    if (swiperRef.current && index !== -1) {
      swiperRef.current.slideTo(index);
    }
  }, [activeColor, slides]);

  const isRight = sliderThumbPosition === "right";
  const isBottom = sliderThumbPosition === "bottom";

  return (
    <>
      {/* Thumbnail Slider */}
      <Swiper
        dir="ltr"
        className={`swiper tf-product-media-thumbs other-image-zoom ${
          isRight ? "order-2" : ""
        }`}
        spaceBetween={8}
        slidesPerView={4.7}
        freeMode
        watchSlidesProgress
        observer
        observeParents
        breakpoints={{
          0: { direction: "horizontal", slidesPerView: 5 },
          1200: {
            direction: isBottom ? "horizontal" : "vertical",
            slidesPerView: 4.7,
          },
        }}
        modules={[Thumbs, FreeMode]}
        onSwiper={setThumbSwiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            data-size={slide.size}
            data-color={slide.color}
          >
            <div className={`item ${slide.video ? "wrap-btn-viewer" : ""}`}>
              {slide.video && <i className="icon icon-video" />}
              <img
                className="lazyload"
                data-src={slide.src}
                src={slide.src}
                alt="Product Thumbnail"
                width={slide.width}
                height={slide.height}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Product Slider */}
      <div className={`flat-wrap-media-product ${isRight ? "order-1" : ""}`}>
        <Swiper
          dir="ltr"
          className="swiper tf-product-media-main"
          id="gallery-swiper-started"
          modules={[Thumbs]}
          thumbs={{ swiper: thumbSwiper ?? undefined }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            const item = slides[swiper.activeIndex];
            if (item) setActiveColor(item.color);
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              data-size={slide.size}
              data-color={slide.color}
            >
              <a
                href={slide.src}
                target="_blank"
                rel="noreferrer"
                className={`item ${
                  slide.outOfStock ? "position-relative" : ""
                }`}
                data-pswp-width={slide.width}
                data-pswp-height={slide.height}
              >
                {slide.video ? (
                  <video
                    playsInline
                    autoPlay
                    preload="metadata"
                    muted
                    controls
                    loop
                    src={slide.video}
                  />
                ) : (
                  <img
                    className="tf-image-zoom lazyload"
                    data-zoom={slide.src as unknown as string}
                    data-src={slide.src}
                    src={slide.src}
                    alt={`Product ${slide.color}`}
                    width={952}
                    height={1512}
                  />
                )}

                {slide.outOfStock && (
                  <div className="sold-out-wrap">
                    <h4 className="text fw-6 text-primary">
                      SOLD <br /> OUT
                    </h4>
                  </div>
                )}
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
