import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  typedRoutes: true,
  transpilePackages: [
    '@akonbutik/ui',
    '@akonbutik/utils',
    '@akonbutik/types',
    '@akonbutik/i18n',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'akonbutik.com' },
      { protocol: 'https', hostname: 'cdn.akonbutik.com' },
    ],
  },
  sassOptions: {
    quietDeps: true,
  },
};

export default withNextIntl(config);
