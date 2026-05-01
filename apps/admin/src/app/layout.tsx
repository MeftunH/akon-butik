import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Vendor Ocaka theme stack — same import order as apps/web/src/app/layout.tsx
// so the bundles are byte-for-byte equivalent and admin pages style with
// the same selectors as the storefront. Bootstrap is the vendor-pinned
// version, never the npm one (would race vendor's CSS variables).
import '../../../../vendor/ochaka-theme/reactjs/public/css/animate.css';
import '../../../../vendor/ochaka-theme/reactjs/public/css/bootstrap-select.min.css';
import '../../../../vendor/ochaka-theme/reactjs/public/css/bootstrap.min.css';
import '../../../../vendor/ochaka-theme/reactjs/public/css/swiper-bundle.min.css';
import '../../../../vendor/ochaka-theme/reactjs/public/icon/icomoon/style.css';
import '../styles/ocaka.scss';
import './globals.scss';

export const metadata: Metadata = {
  title: { default: 'Akon Butik Admin', template: '%s · Akon Butik Admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      {/* Afacad Google Font — vendor `$font-main` defined in
          public/scss/abstracts/_variable.scss. Without this load every
          `.title` / `.h1`-`h6` / heading falls back to the system font
          stack and visually drifts from the vendor demo. */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
