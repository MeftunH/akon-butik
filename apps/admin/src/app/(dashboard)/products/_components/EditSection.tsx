'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import styles from './EditSection.module.scss';

export interface EditSectionDescriptor {
  /** Anchor id, used both as `id` on the section and href fragment in the nav. */
  id: string;
  /** Sidebar label. */
  label: string;
}

export interface EditSectionNavProps {
  sections: readonly EditSectionDescriptor[];
}

/**
 * Sticky left-rail anchor nav that highlights the section currently in
 * the viewport. Uses IntersectionObserver to track the visible section
 * (50% threshold so the active state changes when a section crosses the
 * page midline). Click smoothly scrolls to the target section and
 * updates the URL hash without a full reload.
 */
export function EditSectionNav({ sections }: EditSectionNavProps) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '');
  const lastScrollRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || sections.length === 0) return;

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio that is currently
        // intersecting; falls back to the first if nothing is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const onClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    lastScrollRef.current = Date.now();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (typeof history.replaceState === 'function') {
      history.replaceState(null, '', `#${id}`);
    }
    setActive(id);
  };

  return (
    <aside className={styles.sectionNav} aria-label="Düzenleme bölümleri">
      <p className={styles.sectionNavTitle}>Bölümler</p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={styles.sectionNavItem}
          data-active={active === s.id ? 'true' : 'false'}
          onClick={onClick(s.id)}
        >
          <span className={styles.navDot} aria-hidden />
          {s.label}
        </a>
      ))}
    </aside>
  );
}

export interface EditLayoutProps {
  sections: readonly EditSectionDescriptor[];
  children: ReactNode;
}

export function EditLayout({ sections, children }: EditLayoutProps) {
  return (
    <div className={styles.editLayout}>
      <EditSectionNav sections={sections} />
      <div className={styles.sectionStack}>{children}</div>
    </div>
  );
}

export interface EditSectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  children: ReactNode;
}

export function EditSection({ id, eyebrow, title, description, meta, children }: EditSectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <header className={styles.sectionHeader}>
        <div>
          {eyebrow && <p className={styles.sectionEyebrow}>{eyebrow}</p>}
          <h2 id={`${id}-title`} className={styles.sectionTitle}>
            {title}
          </h2>
        </div>
        {meta && <div className={styles.sectionMeta}>{meta}</div>}
      </header>
      {description && <p className={styles.sectionDescription}>{description}</p>}
      {children}
    </section>
  );
}

export interface DangerSectionProps {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHint: string;
}

export function DangerSection({
  id,
  title,
  description,
  buttonLabel,
  buttonHint,
}: DangerSectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${styles.dangerSection}`}
      aria-labelledby={`${id}-title`}
    >
      <header className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionEyebrow}>Tehlikeli bölge</p>
          <h2 id={`${id}-title`} className={styles.sectionTitle}>
            {title}
          </h2>
        </div>
      </header>
      <div className={styles.dangerBody}>
        <p className={styles.dangerCopy}>{description}</p>
        <button
          type="button"
          className={styles.dangerButton}
          disabled
          aria-disabled
          title={buttonHint}
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}
