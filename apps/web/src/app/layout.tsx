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
