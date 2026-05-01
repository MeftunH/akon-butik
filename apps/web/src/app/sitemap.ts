import type { MetadataRoute } from 'next';

import { env } from '../config/env';
import { api } from '../lib/api';

interface SitemapEntry {
  slug: string;
  updatedAt: string;
}

interface SitemapPayload {
  products: readonly SitemapEntry[];
  categories: readonly SitemapEntry[];
  brands: readonly SitemapEntry[];
}

const STATIC_PATHS: readonly { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
  { path: '/', changeFrequency: 'daily' },
  { path: '/shop', changeFrequency: 'daily' },
  { path: '/blog', changeFrequency: 'weekly' },
  { path: '/about', changeFrequency: 'monthly' },
  { path: '/contact', changeFrequency: 'monthly' },
  { path: '/store-list', changeFrequency: 'monthly' },
  { path: '/track-order', changeFrequency: 'monthly' },
  { path: '/faq', changeFrequency: 'monthly' },
  { path: '/iade-degisim', changeFrequency: 'monthly' },
  { path: '/kullanim-kosullari', changeFrequency: 'monthly' },
  { path: '/kvkk', changeFrequency: 'monthly' },
  { path: '/cerezler', changeFrequency: 'monthly' },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority: path === '/' ? 1 : 0.6,
  }));

  let payload: SitemapPayload;
  try {
    payload = await api<SitemapPayload>('/catalog/sitemap');
  } catch {
    return staticEntries;
  }

  const productEntries: MetadataRoute.Sitemap = payload.products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = payload.categories.map((c) => ({
    url: `${base}/shop?category=${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const brandEntries: MetadataRoute.Sitemap = payload.brands.map((b) => ({
    url: `${base}/shop?brand=${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...productEntries, ...categoryEntries, ...brandEntries];
}
