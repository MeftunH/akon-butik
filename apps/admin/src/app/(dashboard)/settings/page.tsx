import Link from 'next/link';

import styles from './settings.module.scss';

export const metadata = { title: 'Site Ayarları' };

interface SettingsCard {
  href: '/settings/announcement';
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
}

const SETTINGS_CARDS: readonly SettingsCard[] = [
  {
    href: '/settings/announcement',
    title: 'Duyuru Bandı',
    eyebrow: 'Storefront',
    description:
      'Mağazanın üst tarafında görünen ince duyuru şeridini düzenleyin. Mesaj, bağlantı ve görünürlük tek bir yerden yönetilir.',
    icon: 'icon-setting',
  },
] as const;

/**
 * Site-wide settings landing. Today there is one card (the duyuru bandı);
 * the surface is intentionally a card grid so adding a new setting (KVKK
 * banner, currency, contact metadata, etc.) is a single entry append in
 * SETTINGS_CARDS without touching layout.
 */
export default function SettingsLandingPage(): React.JSX.Element {
  return (
    <div className="my-account-content">
      <header className={styles.hero}>
        <p className={styles.heroEyebrow}>Yönetim</p>
        <h1 className={styles.heroTitle}>Site Ayarları</h1>
        <p className={styles.heroLead}>
          Storefrontta görünen küçük ama önemli detaylar burada toplanır. Değişiklikler en geç 60
          saniye içinde mağazaya yansır.
        </p>
      </header>

      <ul className={styles.cardGrid}>
        {SETTINGS_CARDS.map((card) => (
          <li key={card.href}>
            <Link href={card.href} className={styles.card}>
              <span className={styles.cardEyebrow}>{card.eyebrow}</span>
              <span className={styles.cardTitleRow}>
                <i className={`icon ${card.icon}`} aria-hidden />
                <span className={styles.cardTitle}>{card.title}</span>
              </span>
              <p className={styles.cardDescription}>{card.description}</p>
              <span className={styles.cardCta}>
                Aç
                <i className="icon icon-arrow-right" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
