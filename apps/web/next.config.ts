import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// next.config.ts is evaluated by the Next CLI in its own Node process — it
// does not import from src/, so reading process.env directly here is the
// only option. Rewrites resolve at request time anyway, not from the typed
// env module loaded by the app.
// eslint-disable-next-line no-restricted-syntax
const apiInternalUrl = process.env.API_INTERNAL_URL;

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  typedRoutes: true,
  transpilePackages: ['@akonbutik/ui', '@akonbutik/utils', '@akonbutik/types', '@akonbutik/i18n'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'akonbutik.com' },
      { protocol: 'https', hostname: 'cdn.akonbutik.com' },
    ],
  },
  sassOptions: {
    quietDeps: true,
  },
  rewrites() {
    if (!apiInternalUrl) return Promise.resolve([]);
    // API_INTERNAL_URL ends in `/api`; strip it so the rewrite preserves it.
    const origin = apiInternalUrl.replace(/\/api\/?$/, '');
    return Promise.resolve([{ source: '/api/:path*', destination: `${origin}/api/:path*` }]);
  },
};

export default withNextIntl(config);
