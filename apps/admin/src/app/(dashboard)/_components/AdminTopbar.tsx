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
  // Compact date: "2 Mayıs Cum" — drop the long weekday and the "yönetim
  // merkezi · yetkili kullanıcılar" tagline that was reading as filler. The
  // header underneath already carries the brand wordmark and "ADMIN" rail.
  const today = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    weekday: 'short',
  });

  return (
    <div className={styles.topbar}>
      <div className="container">
        <div className={styles.topbarInner}>
          <div className={styles.topbarLeft}>
            <span className={styles.topbarMeta}>{today}</span>
          </div>
          <div className={styles.topbarRight}>
            <span className={styles.topbarMeta}>{roleLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
