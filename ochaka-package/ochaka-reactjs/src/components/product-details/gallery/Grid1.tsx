import { useEffect, useRef, useCallback } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";
import { defaultImages } from "@/data/singleProductSlides";

type Color = string;

export interface GridImageItem {
  id: number | string;
  src: string;
  width: number;
  height: number;
  color: Color;
}

interface Grid1Props {
  activeColor?: Color;
  setActiveColor?: (color: Color) => void;
  images?: GridImageItem[];
}

export default function Grid1({
  activeColor = "blue",
  setActiveColor = () => {},
  images = defaultImages as GridImageItem[],
}: Grid1Props) {
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Zoom setup for desktop
  useEffect(() => {
    if (window.innerWidth < 1200) return;

    const driftAll = document.querySelectorAll<HTMLElement>(".tf-image-zoom3");
    const pane =
      document.querySelector<HTMLElement>(".tf-zoom-main") || undefined;

    // Drift typings vary; minimally cast the constructor
    driftAll.forEach((el) => {
      new (Drift as unknown as new (el: Element, opts: any) => any)(el, {
        zoomFactor: 2,
        paneContainer: pane,
        inlinePane: 0,
        handleTouch: false,
        hoverBoundingBox: true,
        containInline: true,
      });
    });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const parent = target.closest<HTMLElement>(".section-image-zoom");
      if (parent) parent.classList.add("zoom-active");
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const parent = target.closest<HTMLElement>(".section-image-zoom");
      if (parent) parent.classList.remove("zoom-active");
    };

    driftAll.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      driftAll.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Photoswipe setup
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started3",
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

  // Scroll to active color image
  const scrollToTarget = useCallback(() => {
    const currentScroll = window.scrollY;
    const target = document.querySelector<HTMLElement>(
      `[data-scroll='${activeColor}']`
    );
    if (!target) return;

    window.setTimeout(() => {
      if (window.scrollY === currentScroll) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
  }, [activeColor]);

  useEffect(() => {
    scrollToTarget();
  }, [scrollToTarget]);

  // Color tracking via intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute("data-scroll");
            if (color) setActiveColor(color);
          }
        });
      },
      { rootMargin: "-50% 0px" }
    );

    const elements = document.querySelectorAll<HTMLElement>(
      ".item-scroll-target"
    );
    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [setActiveColor]);

  return (
    <div className="flat-wrap-media-product w-100">
      <div
        dir="ltr"
        className="swiper tf-product-media-main"
        id="gallery-swiper-started3"
      >
        <div className="swiper-wrapper">
          {images.map((item) => (
            <div
              className="swiper-slide item-scroll-target"
              data-scroll={item.color}
              key={item.id}
            >
              <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                className="item"
                data-pswp-width={`${item.width}px`}
                data-pswp-height={`${item.height}px`}
              >
                <img
                  className="tf-image-zoom3 lazyload"
                  data-zoom={item.src as unknown as string}
                  data-src={item.src}
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
