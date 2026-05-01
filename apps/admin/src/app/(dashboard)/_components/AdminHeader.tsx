'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import styles from './AdminChrome.module.scss';

interface AdminHeaderProps {
  name: string;
  email: string;
  role: 'admin' | 'editor';
  /** Toggle for the mobile sidebar drawer. */
  onToggleSidebar: () => void;
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0] ?? '';
  if (parts.length === 0) return 'AK';
  if (parts.length === 1) return first.slice(0, 2).toUpperCase();
  const last = parts[parts.length - 1] ?? '';
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

/**
 * Editorial header that wraps every dashboard page. Carries the brand
 * wordmark on the left, a "back to storefront" link, and a profile
 * dropdown on the right with logout.
 *
 * Vendor `tf-header header-fix` is intentionally not reused here — that
 * class set is calibrated for the storefront's heavy nav + cart icons,
 * which an admin header doesn't need. We use a colocated module that
 * still shares the same Afacad font + container width as vendor.
 */
export function AdminHeader({
  name,
  email,
  role,
  onToggleSidebar,
}: AdminHeaderProps): React.JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent): void => {
      const target = event.target as Node | null;
      if (!target) return;
      if (menuRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const handleLogout = async (): Promise<void> => {
    setBusy(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setBusy(false);
      setOpen(false);
      router.push('/login');
      router.refresh();
    }
  };

  const roleLabel = role === 'admin' ? 'Yönetici' : 'Editör';

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <button
              type="button"
              className={styles.headerHamburger}
              onClick={onToggleSidebar}
              aria-label="Menüyü aç"
            >
              <span className={styles.headerHamburgerLines} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
            <Link href="/" className={styles.wordmark} aria-label="Akon Butik Admin">
              <span className={styles.wordmarkBrand}>Akon Butik</span>
              <span className={styles.wordmarkSeparator} aria-hidden="true" />
              <span className={styles.wordmarkRole}>Admin</span>
            </Link>
          </div>

          <div className={styles.headerRight}>
            <Link
              href="/"
              className={styles.storefrontLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Mağazaya dön (yeni sekmede)"
            >
              <i
                className={`icon icon-arrow-top-right ${styles.storefrontIcon}`}
                aria-hidden="true"
              />
              <span>Mağaza</span>
            </Link>

            <div className={styles.profile}>
              <button
                ref={triggerRef}
                type="button"
                className={styles.profileTrigger}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                <span className={styles.avatar} aria-hidden="true">
                  {initialsFor(name)}
                </span>
                <span className={styles.profileMeta}>
                  <span className={styles.profileName}>{name}</span>
                  <span className={styles.profileRole}>{roleLabel}</span>
                </span>
                <i className={`icon icon-caret-down ${styles.profileCaret}`} aria-hidden="true" />
              </button>
              {open && (
                <div ref={menuRef} className={styles.profileMenu} role="menu">
                  <div className={styles.profileMenuHeader}>
                    <div className={styles.profileMenuName}>{name}</div>
                    <div className={styles.profileMenuEmail}>{email}</div>
                  </div>
                  <Link
                    href="/"
                    className={styles.profileMenuItem}
                    role="menuitem"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <i className="icon icon-arrow-top-right" aria-hidden="true" />
                    Mağazayı yeni sekmede aç
                  </Link>
                  <button
                    type="button"
                    className={`${styles.profileMenuItem} ${styles['profileMenuItem--danger']}`}
                    role="menuitem"
                    onClick={() => void handleLogout()}
                    disabled={busy}
                  >
                    <i className="icon icon-sign-out" aria-hidden="true" />
                    {busy ? 'Çıkış yapılıyor' : 'Oturumu kapat'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
