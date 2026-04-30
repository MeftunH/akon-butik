import type { NextConfig } from 'next';

// next.config.ts is evaluated by the Next CLI in its own Node process — it
// does not import from src/, so reading process.env directly here is the
// only option. Rewrites resolve at request time.
// eslint-disable-next-line no-restricted-syntax
const apiInternalUrl = process.env.API_INTERNAL_URL;

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  experimental: { typedRoutes: true },
  rewrites() {
    if (!apiInternalUrl) return Promise.resolve([]);
    const origin = apiInternalUrl.replace(/\/api\/?$/, '');
    return Promise.resolve([{ source: '/api/:path*', destination: `${origin}/api/:path*` }]);
  },
};

export default config;
