import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';

export const metadata: Metadata = {
  title: { default: 'Akon Butik', template: '%s · Akon Butik' },
  description: 'Şıklığın butik adresi — Akon Butik',
  metadataBase: new URL(process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://akonbutik.com'),
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
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
