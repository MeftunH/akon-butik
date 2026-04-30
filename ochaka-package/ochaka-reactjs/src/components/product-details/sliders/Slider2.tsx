import { useEffect, useRef, useState } from "react";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";

type Size = "XS" | "S" | "M" | "L";
type Color = "blue"; // extend if needed

interface JewelryProduct {
  src: string;
  size: Size;
  color: Color;
}

const jewelryProducts: JewelryProduct[] = [
  { src: "/images/products/jewelry/product-1.jpg", size: "XS", color: "blue" },
  { src: "/images/products/jewelry/product-1.jpg", size: "S", color: "blue" },
  { src: "/images/products/jewelry/product-2.jpg", size: "S", color: "blue" },
  { src: "/images/products/jewelry/product-3.jpg", size: "M", color: "blue" },
  { src: "/images/products/jewelry/product-4.jpg", size: "L", color: "blue" },
];

export default function Slider2() {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperInstance | null>(null);

  // Image zoom (desktop only)
  useEffect(() => {
    if (window.innerWidth < 1200) return;

    const driftAll = document.querySelectorAll<HTMLElement>(".tf-image-zoom1");
    const pane =
      document.querySelector<HTMLElement>(".tf-zoom-main") || undefined;

    driftAll.forEach((el) => {
      // Drift typings vary across versions; minimally cast the constructor
      new (Drift as unknown as new (el: Element, opts: any) => any)(el, {
        zoomFactor: 2,
        paneContainer: pane,
        inlinePane: 0,
        handleTouch: false,
        hoverBoundingBox: true,
        containInline: true,
      });
    });

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

    driftAll.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      driftAll.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Photoswipe lightbox
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started1",
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

  return (
    <div className="product-thumbs-slider d-md-none">
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-thumbs other-image-zoom"
        spaceBetween={8}
        slidesPerView={4.7}
        direction="horizontal"
        modules={[Thumbs]}
        onSwiper={setThumbSwiper}
      >
        {jewelryProducts.map((item, i) => (
          <SwiperSlide className="swiper-slide stagger-item" key={i}>
            <div className="item">
              <img
                className="lazyload"
                data-src={item.src}
                alt="img-product"
                src={item.src}
                width={740}
                height={740}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flat-wrap-media-product w-100">
        <Swiper
          dir="ltr"
          className="swiper tf-product-media-main"
          id="gallery-swiper-started1"
          thumbs={{ swiper: thumbSwiper ?? undefined }}
          modules={[Thumbs]}
        >
          {jewelryProducts.map((item, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide item-scroll-target"
            >
              <a
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className="item"
                data-pswp-width="860px"
                data-pswp-height="1146px"
              >
                <img
                  className="tf-image-zoom1 lazyload"
                  data-zoom={item.src as unknown as string}
                  data-src={item.src}
                  alt="img-product"
                  src={item.src}
                  width={740}
                  height={740}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
