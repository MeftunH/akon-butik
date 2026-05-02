import Link from 'next/link';

import { api, ApiError } from '../../../lib/api';

import styles from './Topbar.module.scss';
import { TopbarDismiss } from './TopbarDismiss';

interface AnnouncementResponse {
  message: string | null;
  linkUrl: string | null;
  linkLabel: string | null;
  enabled: boolean;
  updatedAt: string;
}

interface TopbarProps {
  /** Optional left-side category links; defaults to none. */
  categoryLinks?: readonly { label: string; href: string }[];
}

const DEFAULT_MESSAGE = 'Akon Butik · Çark Caddesi, Sakarya. 450₺ üzeri kargo ücretsiz.';

/**
 * Storefront duyuru bandı. Server component fetches the current value
 * from the API every minute (matching the public endpoint's
 * Cache-Control: max-age=60). When `enabled` is false, the entire shell
 * is omitted; the surface below visibly closes up rather than leaving
 * an empty strip.
 *
 * The brand-tinted dark background mirrors the admin Topbar
 * (`oklch(0.18 0.04 25)`) so the two surfaces feel like one product
 * once an admin opens both tabs.
 *
 * The dismiss control is a small client child that stamps localStorage
 * with the announcement's `updatedAt`; whenever the admin saves, the
 * timestamp shifts, so previously-dismissed bars re-appear automatically.
 */
export async function Topbar({ categoryLinks }: TopbarProps): Promise<React.JSX.Element | null> {
  const announcement = await loadAnnouncement();
  if (!announcement || !announcement.enabled) return null;

  const message = announcement.message?.trim() || DEFAULT_MESSAGE;
  const hasLink =
    typeof announcement.linkUrl === 'string' &&
    announcement.linkUrl.length > 0 &&
    typeof announcement.linkLabel === 'string' &&
    announcement.linkLabel.length > 0;

  return (
    <div className={`tf-topbar ${styles.shell}`} data-announcement-id={announcement.updatedAt}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <h6 className={styles.message}>
              <span>{message}</span>
              {hasLink ? (
                <Link href={announcement.linkUrl ?? '#'} className={styles.cta}>
                  {announcement.linkLabel}
                </Link>
              ) : null}
            </h6>
            {categoryLinks && categoryLinks.length > 0 ? (
              <div className={styles.categoryLinks}>
                {categoryLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.categoryLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <ul className={styles.right}>
            <li>
              <Link href="/faq" className={styles.helpLink}>
                Yardım ve SSS
              </Link>
            </li>
            <li className={styles.divider} aria-hidden />
            <li>
              <Link href="/track-order" className={styles.helpLink}>
                Sipariş Takibi
              </Link>
            </li>
            <li className={`${styles.divider} ${styles.dividerWide}`} aria-hidden />
            <li className={styles.optionalLink}>
              <Link href="/iade-degisim" className={styles.helpLink}>
                İade ve Değişim
              </Link>
            </li>
          </ul>
          <TopbarDismiss announcementId={announcement.updatedAt} />
        </div>
      </div>
    </div>
  );
}

async function loadAnnouncement(): Promise<AnnouncementResponse | null> {
  try {
    return await api<AnnouncementResponse>('/settings/announcement', { revalidate: 60 });
  } catch (err) {
    // A failed fetch must not take down the storefront chrome; fall
    // back to "no announcement". 404 is not expected (the endpoint is
    // mounted unconditionally) but is treated identically.
    if (err instanceof ApiError && err.status >= 500) return null;
    return null;
  }
}
