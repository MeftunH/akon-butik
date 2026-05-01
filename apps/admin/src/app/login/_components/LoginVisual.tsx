import styles from './LoginVisual.module.scss';

/**
 * Editorial visual rail for the login screen. We deliberately avoid coupling
 * to a specific product image: the panel is a layered CSS composition on
 * brand-tinted neutrals, so it ships with the bundle and never breaks if
 * vendor public assets shift. The arrangement reads as a tailored fabric
 * swatch rather than a stock-photo lockup, which keeps the chrome editorial.
 */
export function LoginVisual(): React.JSX.Element {
  return (
    <aside className={styles.visual} aria-hidden="true">
      <div className={styles.gridFigure} />
      <div className={styles.tape} />
      <div className={styles.markBlock}>
        <span className={styles.markEyebrow}>Atelier</span>
        <p className={styles.markLine}>
          Sezon kataloğu, sipariş akışı ve stok hareketi tek bir editöryel panelden.
        </p>
        <span className={styles.markFooter}>İstanbul · 2026</span>
      </div>
    </aside>
  );
}
