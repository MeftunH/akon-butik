import { useEffect, useRef } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";

type Size = "XS" | "S" | "M" | "L";
type Color = "blue"; // extend if you add more colors

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

export default function Gallery1() {
  // Init image zoom on desktop
  useEffect(() => {
    const isDesktop = () => window.innerWidth >= 1200;
    if (!isDesktop()) return;

    const driftAll = document.querySelectorAll<HTMLElement>(".tf-image-zoom2");
    const pane =
      document.querySelector<HTMLElement>(".tf-zoom-main") || undefined;

    // Drift types can vary by package version — minimally cast the constructor
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

    const zoomElements =
      document.querySelectorAll<HTMLElement>(".tf-image-zoom2");

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
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started2",
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
    <div className="product-thumbs-slider d-none d-md-block">
      <div className="flat-wrap-media-product w-100">
        <div
          dir="ltr"
          className="swiper tf-product-media-main"
          id="gallery-swiper-started2"
        >
          <div className="swiper-wrapper">
            {jewelryProducts.map((item, index) => (
              <div key={index} className="swiper-slide item-scroll-target">
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item"
                  data-pswp-width="860px"
                  data-pswp-height="1146px"
                >
                  <img
                    className="tf-image-zoom2 lazyload"
                    data-zoom={item.src as unknown as string}
                    data-src={item.src}
                    alt="img-product"
                    src={item.src}
                    width={740}
                    height={740}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
