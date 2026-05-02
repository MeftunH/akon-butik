'use client';

import { useEffect, useState } from 'react';

import styles from './Topbar.module.scss';

interface TopbarDismissProps {
  /**
   * Stable identity for the current announcement. A new value (e.g. a
   * fresh `updatedAt` from the admin) un-dismisses any prior close so
   * the bar re-appears automatically on the next render.
   */
  announcementId: string;
}

const STORAGE_KEY = 'akon.topbar.dismissed';

/**
 * Tiny client island that owns the close button. The decision to hide
 * lives on the client only; SSR always renders the bar so first paint
 * never flickers when localStorage is absent (e.g. crawlers, no-JS).
 *
 * Hiding works by walking up to the nearest `.tf-topbar` ancestor and
 * setting `display: none` on it once the effect confirms a matching
 * dismissal. No state lifting, no portal indirection.
 */
export function TopbarDismiss({ announcementId }: TopbarDismissProps): React.JSX.Element | null {
  const [hidden, setHidden] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && stored === announcementId) {
        setHidden(true);
      }
    } catch {
      // localStorage may be blocked by privacy mode; treat as "not
      // dismissed" and let the user close again next visit.
    }
  }, [announcementId]);

  useEffect(() => {
    if (!hidden) return;
    const node = document.querySelector<HTMLElement>(
      `[data-announcement-id="${cssEscape(announcementId)}"]`,
    );
    if (node) node.style.display = 'none';
  }, [hidden, announcementId]);

  const onDismiss = (): void => {
    try {
      window.localStorage.setItem(STORAGE_KEY, announcementId);
    } catch {
      // Same fallback as above; visual close still happens this session.
    }
    setHidden(true);
  };

  if (!hydrated) return null;

  return (
    <button
      type="button"
      className={styles.dismiss}
      aria-label="Duyuruyu kapat"
      onClick={onDismiss}
    >
      <i className="icon icon-x" aria-hidden />
    </button>
  );
}

/**
 * Minimal CSS.escape polyfill for the rare runtime that lacks it; the
 * announcementId is an ISO date so backslash and quote characters
 * never appear, but the wrapper keeps the selector defensive.
 */
function cssEscape(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(value);
  return value.replace(/[^\w-]/g, (ch) => `\\${ch}`);
}
