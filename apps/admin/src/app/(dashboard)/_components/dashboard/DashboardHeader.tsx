import styles from './dashboard.module.scss';
import { firstName, formatDateTime } from './format';

interface DashboardHeaderProps {
  fullName: string;
  role: 'admin' | 'editor';
  refreshedAt: Date;
}

const ROLE_LABEL: Record<DashboardHeaderProps['role'], string> = {
  admin: 'Yönetici',
  editor: 'Editör',
};

/**
 * Editorial greeting strip: light leading "İyi günler," + bolder first name,
 * pushed-right meta column with a tabular refreshed timestamp and a role pill.
 * Replaces the bare `<h2>Panel</h2>` with three-part rhythm on a single line.
 */
export function DashboardHeader({
  fullName,
  role,
  refreshedAt,
}: DashboardHeaderProps): React.JSX.Element {
  const name = firstName(fullName);
  const refreshedIso = refreshedAt.toISOString();
  const refreshedLabel = formatDateTime(refreshedIso);

  return (
    <header className={styles.greeting}>
      <h1 className={styles.greetingHeadline}>
        <span className={styles.greetingLead}>İyi günler,</span> {name}.
      </h1>
      <div className={styles.greetingMeta}>
        <span className={styles.greetingRefresh}>Yenilendi</span>
        <time className={styles.greetingTime} dateTime={refreshedIso}>
          {refreshedLabel}
        </time>
        <span
          className={`${styles.rolePill} ${role === 'editor' ? styles.rolePillEditor : ''}`.trim()}
          aria-label={`Rol: ${ROLE_LABEL[role]}`}
        >
          {ROLE_LABEL[role]}
        </span>
      </div>
    </header>
  );
}
