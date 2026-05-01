import styles from './AdminChrome.module.scss';

interface AdminTopbarProps {
  /** Localized role label, e.g. "Yönetici", "Editör" */
  roleLabel: string;
}

/**
 * Top strip above the dashboard header. Replaces the old `tf-topbar bg-black`
 * vendor strip — that stark black read like an office-SaaS template. We use
 * a brand-tinted dark wine (oklch derived from the primary red hue) so the
 * rail still reads as a header but with a fashion-house weight.
 *
 * Pure presentation — no JS — so it stays a server component.
 */
export function AdminTopbar({ roleLabel }: AdminTopbarProps): React.JSX.Element {
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className={styles.topbar}>
      <div className="container">
        <div className={styles.topbarInner}>
          <div className={styles.topbarLeft}>
            <span className={styles.topbarMark}>Akon Butik</span>
            <span className={styles.topbarRule} aria-hidden="true" />
            <span className={styles.topbarLine}>Yönetim merkezi · yetkili kullanıcılar için</span>
          </div>
          <div className={styles.topbarRight}>
            <span className={styles.topbarMeta}>{today}</span>
            <span className={styles.topbarRule} aria-hidden="true" />
            <span className={styles.topbarMeta}>{roleLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
