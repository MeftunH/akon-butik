import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@akonbutik/i18n';

import trMessages from '@akonbutik/i18n/messages/tr';
import enMessages from '@akonbutik/i18n/messages/en';

const messagesByLocale = {
  tr: trMessages,
  en: enMessages,
} as const satisfies Record<Locale, unknown>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = LOCALES.includes(requested as Locale)
    ? (requested as Locale)
    : DEFAULT_LOCALE;
  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
