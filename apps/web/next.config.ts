import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// next.config.ts is evaluated by the Next CLI in its own Node process — it
// does not import from src/, so reading process.env directly here is the
// only option. Rewrites resolve at request time anyway, not from the typed
// env module loaded by the app.
/* eslint-disable no-restricted-syntax */
const apiInternalUrl = process.env.API_INTERNAL_URL;
const isDev = process.env.NODE_ENV !== 'production';
/* eslint-enable no-restricted-syntax */

// Storefront CSP. The vendor Ocaka theme injects inline styles in several
// spots and Next.js itself emits inline hydration scripts; both keep
// 'unsafe-inline' on script/style for the time being. iyzico Checkout
// Form runs in an iframe, so frame-src whitelists their hosted domains.
// Dev mode additionally needs 'unsafe-eval' for Webpack HMR.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https:",
  'frame-src https://*.iyzipay.com https://sandbox-cpay.iyzipay.com',
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://*.iyzipay.com")',
  },
];

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
  headers() {
    return Promise.resolve([{ source: '/:path*', headers: securityHeaders }]);
  },
};

export default withNextIntl(config);
