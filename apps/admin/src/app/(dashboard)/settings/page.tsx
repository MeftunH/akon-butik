import Link from 'next/link';

import styles from './settings.module.scss';

export const metadata = { title: 'Site Ayarları' };

interface ReadyCard {
  status: 'ready';
  href: '/settings/announcement';
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
}

interface UpcomingCard {
  status: 'upcoming';
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
}

type SettingsCard = ReadyCard | UpcomingCard;

const SETTINGS_CARDS: readonly SettingsCard[] = [
  {
    status: 'ready',
    href: '/settings/announcement',
    title: 'Duyuru Bandı',
    eyebrow: 'Storefront',
    description:
      'Mağazanın üst tarafında görünen ince şeridi düzenleyin. Tek bir mesaj, bir bağlantı ve aç-kapat kontrolü.',
    icon: 'icon-bell',
  },
  {
    status: 'upcoming',
    title: 'İletişim Bilgileri',
    eyebrow: 'Storefront',
    description:
      'Mağaza adresi, telefon, e-posta, sosyal hesaplar tek yerden. Şu an dosyada sabit, yakında düzenlenebilir.',
    icon: 'icon-map-pin',
  },
  {
    status: 'upcoming',
    title: 'Yasal Metinler',
    eyebrow: 'Mevzuat',
    description:
      'KVKK aydınlatma, çerez politikası, kullanım koşulları, iade-değişim. Hukuki onay sonrası buradan güncellenecek.',
    icon: 'icon-file-text',
  },
  {
    status: 'upcoming',
    title: 'Vergi ve Kurumsal',
    eyebrow: 'Operasyon',
    description:
      'Ticari unvan, vergi dairesi, VKN, MERSIS no, KEP adresi. E-fatura entegrasyonu öncesinde girilmesi gerekir.',
    icon: 'icon-briefcase',
  },
];

/**
 * Site-wide settings landing. The first card is live; the rest are
 * deliberately exposed as "yakında" placeholders so the operator knows
 * what's coming without us hiding the roadmap. Once a setting ships, swap
 * its `status` to `'ready'` and add the `href`. Single-card-on-the-page
 * read like a leftover; this composition reads like an index.
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
        {SETTINGS_CARDS.map((card) => {
          const inner = (
            <>
              <span className={styles.cardEyebrow}>{card.eyebrow}</span>
              <span className={styles.cardTitleRow}>
                <i className={`icon ${card.icon}`} aria-hidden />
                <span className={styles.cardTitle}>{card.title}</span>
              </span>
              <p className={styles.cardDescription}>{card.description}</p>
              <span className={styles.cardCta} data-status={card.status}>
                {card.status === 'ready' ? (
                  <>
                    Aç
                    <i className="icon icon-arrow-right" aria-hidden />
                  </>
                ) : (
                  'Yakında'
                )}
              </span>
            </>
          );
          return (
            <li key={card.title}>
              {card.status === 'ready' ? (
                <Link href={card.href} className={styles.card} data-status="ready">
                  {inner}
                </Link>
              ) : (
                <div className={styles.card} data-status="upcoming" aria-disabled>
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
