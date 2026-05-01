import type { MetadataRoute } from 'next';

import { env } from '../config/env';

export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/cart', '/checkout', '/api/', '/login', '/register'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
