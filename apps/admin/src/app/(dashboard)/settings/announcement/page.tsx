import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../../../lib/admin-fetch';
import styles from '../settings.module.scss';

import { AnnouncementForm, type AnnouncementValues } from './_components/AnnouncementForm';

export const metadata = { title: 'Duyuru Bandı' };

interface AnnouncementResponse {
  message: string | null;
  linkUrl: string | null;
  linkLabel: string | null;
  enabled: boolean;
  updatedAt: string;
}

/**
 * Admin editor for the storefront duyuru bandı. Server-side hydrates the
 * current row (or its `enabled=false` empty state) and hands an initial
 * value object to the client form. The form PUTs back to the same shape
 * and refreshes RSC cache via router.refresh once persisted.
 */
export default async function AnnouncementSettingsPage(): Promise<React.JSX.Element> {
  const current = await fetchAdmin<AnnouncementResponse>('/admin/settings/announcement');
  if (current === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  const initial: AnnouncementValues = {
    message: current.message ?? '',
    linkUrl: current.linkUrl ?? '',
    linkLabel: current.linkLabel ?? '',
    enabled: current.enabled,
  };

  return (
    <div className="my-account-content">
      <div className={styles.formShell}>
        <Link href="/settings" className={styles.backLink}>
          <i className="icon icon-arrow-left" aria-hidden />
          Ayarlar
        </Link>

        <header>
          <p className={styles.heroEyebrow}>Storefront</p>
          <h1 className={styles.heroTitle}>Duyuru Bandı</h1>
          <p className={styles.heroLead}>
            Mağazanın üst tarafında sabit duran ince şeritte gösterilecek tek satırlık duyuruyu
            buradan yönetin. Kapatma haklarına saygı için her güncelleme yeni bir kapatma butonu
            sayar.
          </p>
        </header>

        <AnnouncementForm initial={initial} updatedAt={current.updatedAt} />
      </div>
    </div>
  );
}
