'use client';

import { useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

interface GalleryImage {
  url: string;
  sortOrder: number;
  isPrimary: boolean;
}

interface ProductGalleryProps {
  productSlug: string;
  productName: string;
  images: readonly GalleryImage[];
}

/**
 * Vendor `product-details/sliders/Slider1.tsx` mirror — main product image
 * carousel + vertical thumbnail strip on the left. Vendor's Drift zoom +
 * PhotoSwipe lightbox are dropped (Phase 6 enhancement); pure Swiper Thumbs
 * + FreeMode handle navigation.
 *
 * Image source: backend ProductImage[] (sorted, primary first). When the
 * product has no admin-uploaded photography yet — common since DIA doesn't
 * push images and admin upload is gated on Phase 5b — fall back to vendor
 * demo fashion stills, picked deterministically by slug so the same product
 * always shows the same photo across reloads.
 */
const FALLBACK_IMAGES = [
  '/images/products/fashion/product-1.jpg',
  '/images/products/fashion/product-2.jpg',
  '/images/products/fashion/product-3.jpg',
  '/images/products/fashion/product-4.jpg',
  '/images/products/fashion/product-5.jpg',
  '/images/products/fashion/product-6.jpg',
  '/images/products/fashion/product-7.jpg',
  '/images/products/fashion/product-8.jpg',
  '/images/products/fashion/product-9.jpg',
  '/images/products/fashion/product-10.jpg',
  '/images/products/fashion/product-11.jpg',
] as const;

const FALLBACK_DEFAULT = '/images/products/fashion/product-1.jpg';

function pickImage(seed: string, salt: number): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i) * salt) >>> 0;
  }
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length] ?? FALLBACK_DEFAULT;
}

function buildFallbackSet(slug: string): readonly string[] {
  return [pickImage(slug, 1), pickImage(slug, 7), pickImage(slug, 13), pickImage(slug, 23)];
}

export function ProductGallery({ productSlug, productName, images }: ProductGalleryProps) {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperInstance | null>(null);

  const sources: readonly string[] =
    images.length > 0
      ? [...images].sort((a, b) => a.sortOrder - b.sortOrder).map((i) => i.url)
      : buildFallbackSet(productSlug);

  return (
    <div className="tf-product-media-wrap d-flex gap-3">
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-thumbs other-image-zoom"
        spaceBetween={8}
        slidesPerView={4.7}
        freeMode
        watchSlidesProgress
        breakpoints={{
          0: { direction: 'horizontal', slidesPerView: 5 },
          1200: { direction: 'vertical', slidesPerView: 4.7 },
        }}
        modules={[Thumbs, FreeMode]}
        onSwiper={setThumbSwiper}
      >
        {sources.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="lazyload"
                src={src}
                alt={`${productName} — görsel ${(index + 1).toString()}`}
                width={952}
                height={1512}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flat-wrap-media-product flex-grow-1">
        <Swiper
          dir="ltr"
          className="swiper tf-product-media-main"
          modules={[Thumbs]}
          thumbs={{ swiper: thumbSwiper }}
        >
          {sources.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="tf-image-zoom lazyload"
                  src={src}
                  alt={`${productName} — görsel ${(index + 1).toString()}`}
                  width={952}
                  height={1512}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
