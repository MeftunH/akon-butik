'use client';

import type { ProductSummary } from '@akonbutik/types';
import { ProductCard } from '@akonbutik/ui';
import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

interface HomeBestSellersProps {
  products: readonly ProductSummary[];
}

/**
 * "Best Seller" section — mirrors vendor `home-fashion-2/Products1`. Uses
 * Swiper with the Grid module (rows: 2) so on desktop we render 4 cols x 2
 * rows = 8 products in one viewport block, with carousel paging when the
 * feed has more.
 */
export function HomeBestSellers({ products }: HomeBestSellersProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="container">
        <div className="sect-title text-center wow fadeInUp">
          <h2 className="title h2 mb-8 fw-normal">Çok Satanlar</h2>
          <p className="s-subtitle h6 text-main-2">
            Sezonun en sevilen parçaları, stoğumuzdaki güncel renk ve bedenlerle.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wrap-sw-over wow fadeInUp"
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: { slidesPerView: 2 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 48 },
          }}
          modules={[Grid, Pagination]}
          grid={{ rows: 2, fill: 'row' }}
          pagination={{ clickable: true, el: '.akon-best-pagination' }}
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination akon-best-pagination" />
        </Swiper>
      </div>
    </section>
  );
}
