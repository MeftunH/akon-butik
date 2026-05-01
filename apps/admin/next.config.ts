import type { NextConfig } from 'next';

// next.config.ts is evaluated by the Next CLI in its own Node process — it
// does not import from src/, so reading process.env directly here is the
// only option. Rewrites resolve at request time.
/* eslint-disable no-restricted-syntax */
const apiInternalUrl = process.env.API_INTERNAL_URL;
const isDev = process.env.NODE_ENV !== 'production';
/* eslint-enable no-restricted-syntax */

// Admin CSP — stricter than the storefront because no third-party iframes
// and no Google Fonts; matches the vendor Ocaka admin chrome which still
// emits inline styles. Dev needs 'unsafe-eval' for Webpack HMR.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-src 'none'",
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
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

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
  headers() {
    return Promise.resolve([{ source: '/:path*', headers: securityHeaders }]);
  },
};

export default config;
