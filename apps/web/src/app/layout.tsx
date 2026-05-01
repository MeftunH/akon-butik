import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

// Vendor Ocaka theme stack. Order matters — vendor base CSS first, then
// vendor SCSS (which builds on it), then site-specific overrides. The
// project's own bootstrap is the vendor's own bootstrap.min.css below;
// `bootstrap/dist/css/bootstrap.min.css` is intentionally NOT pulled in
// because it would race vendor's pinned version.
import '../../../../vendor/ochaka-theme/reactjs/public/css/animate.css';
import '../../../../vendor/ochaka-theme/reactjs/public/css/bootstrap-select.min.css';
import '../../../../vendor/ochaka-theme/reactjs/public/css/bootstrap.min.css';
import '../../../../vendor/ochaka-theme/reactjs/public/css/swiper-bundle.min.css';
import '../../../../vendor/ochaka-theme/reactjs/public/icon/icomoon/style.css';
import '../styles/ocaka.scss';
import './globals.scss';

import { env } from '../config/env';

export const metadata: Metadata = {
  title: { default: 'Akon Butik', template: '%s · Akon Butik' },
  description: 'Şıklığın butik adresi — Akon Butik',
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
};

export const viewport: Viewport = {
  themeColor: '#c8102e',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      {/*
        Vendor Ocaka theme assumes the Afacad Google Font is loaded
        (`$font-main: "Afacad"` in _variable.scss). The font lives on
        Google Fonts; preconnect + stylesheet here keeps headings looking
        identical to the vendor demo. Sora + Ballet are also referenced
        in vendor SCSS for accents but aren't wired anywhere we render
        yet — punt those until they actually appear.
      */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- vendor SCSS hard-codes Afacad as $font-main; next/font would require rewriting every heading rule in read-only vendor SCSS */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap"
        />
      </head>
      {/*
        suppressHydrationWarning on <body> — some browser extensions
        (ColorZilla, Grammarly, Notion Clipper, etc.) inject attributes
        like `cz-shortcut-listen` before React hydrates. This silences
        the React 19 hydration mismatch warning that they trigger.
      */}
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
