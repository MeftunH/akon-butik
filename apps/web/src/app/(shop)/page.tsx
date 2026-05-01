import type { ProductSummary } from '@akonbutik/types';

import { HomeBestSellers } from './_components/HomeBestSellers';
import { HomeCategories } from './_components/HomeCategories';
import { HomeCollections } from './_components/HomeCollections';
import { HomeFeatures } from './_components/HomeFeatures';
import { HomeHero } from './_components/HomeHero';
import { HomeTrending } from './_components/HomeTrending';

import { api } from '@/lib/api';

interface ProductListResponse {
  items: readonly ProductSummary[];
  total: number;
  page: number;
  pageSize: number;
}

export const revalidate = 300;

/**
 * Storefront home — composition mirrors vendor `home-fashion-2`:
 *
 *   Hero → Collections (s-collection, 2-wide) → Categories (circles)
 *     → Best Sellers (Swiper grid, 2 rows × 4 cols) → Trending banners
 *     → Features strip
 *
 * Header/footer come from the shop layout. Swap to real category /
 * banner data from the catalog API once admin finishes seeding it; the
 * placeholders use vendor demo imagery so the page never renders empty.
 */
export default async function HomePage() {
  const featured = await api<ProductListResponse>('/catalog/products?pageSize=8&sort=newest');

  return (
    <main>
      <HomeHero />
      <HomeCollections />
      <HomeCategories />
      <HomeBestSellers products={featured.items} />
      <HomeTrending />
      <HomeFeatures />
    </main>
  );
}
