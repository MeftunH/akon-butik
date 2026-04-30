import { useEffect, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

interface SliderProps {
  activeColor?: string;
  setActiveColor?: (color: string) => void;
}

type SlideItem = {
  id: number;
  color: string;
  src: string;
};

export default function Slider({
  activeColor = "gold",
  setActiveColor = () => {},
}: SliderProps) {
  const previewImages: string[] = [
    "/images/products/jewelry/thumb-1.jpg",
    "/images/products/jewelry/thumb-2.jpg",
    "/images/products/jewelry/thumb-3.jpg",
    "/images/products/jewelry/thumb-4.jpg",
  ];

  const slideItems: SlideItem[] = [
    { id: 1, color: "gold", src: "/images/products/jewelry/product-21.jpg" },
    {
      id: 2,
      color: "titanium",
      src: "/images/products/jewelry/product-22.jpg",
    },
    { id: 3, color: "rose", src: "/images/products/jewelry/thumb-3.jpg" },
    { id: 4, color: "gold", src: "/images/products/jewelry/thumb-4.jpg" },
  ];

  const [thumbSwiper, setThumbSwiper] = useState<SwiperInstance | null>(null);

  const swiperRef = useRef<SwiperInstance | null>(null);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  // Image zoom (Drift) on desktop
  useEffect(() => {
    const isDesktop = () => window.innerWidth >= 1200;
    if (!isDesktop()) return;

    const driftAll = document.querySelectorAll<HTMLElement>(".tf-image-zoom");
    const pane =
      document.querySelector<HTMLElement>(".tf-zoom-main") || undefined;

    driftAll.forEach((el) => {
      // Drift’s types can be loose depending on package version
      new (Drift as unknown as new (el: Element, opts: any) => any)(el, {
        zoomFactor: 2,
        paneContainer: pane,
        inlinePane: 0,
        handleTouch: false,
        hoverBoundingBox: true,
        containInline: true,
      });
    });

    const zoomElements =
      document.querySelectorAll<HTMLElement>(".tf-image-zoom");

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const parent = target.closest<HTMLElement>(".section-image-zoom");
      if (parent) parent.classList.add("zoom-active");
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const parent = target.closest<HTMLElement>(".section-image-zoom");
      if (parent) parent.classList.remove("zoom-active");
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Photoswipe Lightbox
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

  // Sync main swiper to activeColor changes
  useEffect(() => {
    const target = slideItems.find((elm) => elm.color === activeColor);
    if (target && swiperRef.current) {
      swiperRef.current.slideTo((target.id ?? 1) - 1);
    }
  }, [activeColor, slideItems]);

  // Initial correction to ensure the right slide is active after mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = slideItems.find((elm) => elm.color === activeColor);
      if (swiperRef.current && target) {
        swiperRef.current.slideTo(1);
        swiperRef.current.slideTo((target.id ?? 1) - 1);
      }
    });
    return () => window.clearTimeout(timer);
  }, []); // run once

  return (
    <>
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-thumbs other-image-zoom"
        spaceBetween={8}
        slidesPerView={4.7}
        freeMode
        watchSlidesProgress
        observer
        observeParents
        breakpoints={{
          0: { direction: "horizontal", slidesPerView: 5 },
          1200: { direction: "vertical", slidesPerView: 4.7 },
        }}
        modules={[Thumbs, FreeMode]}
        onSwiper={setThumbSwiper}
      >
        {previewImages.map((src, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide stagger-item"
            data-size="XS"
            data-color="blue"
          >
            <div className="item">
              <img
                className="lazyload"
                src={src}
                alt="img-product"
                width={696}
                height={800}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flat-wrap-media-product">
        <Swiper
          dir="ltr"
          className="swiper tf-product-media-main"
          id="gallery-swiper-started"
          modules={[Thumbs]}
          thumbs={{ swiper: thumbSwiper ?? undefined }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            const current = slideItems[swiper.activeIndex];
            if (current) setActiveColor(current.color);
          }}
        >
          {slideItems.map((image, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide"
              data-color={image.color}
            >
              <a
                href={image.src}
                target="_blank"
                rel="noreferrer"
                className="item"
                data-pswp-width="696px"
                data-pswp-height="800px"
              >
                <img
                  className="tf-image-zoom lazyload"
                  data-zoom={image.src}
                  data-src={image.src}
                  alt=""
                  src={image.src}
                  width={696}
                  height={800}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
