'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './AdminChrome.module.scss';

interface SidebarProfileProps {
  name: string;
  email: string;
  role: 'admin' | 'editor';
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
 * Sidebar footer block: avatar + name + email + inline logout. The role
 * pill is intentionally kept at the top of the sidebar (rendered by
 * `<RolePill>`) so it sits above the nav and frames the whole rail
 * with the operator's permission level.
 */
export function SidebarProfile({ name, email }: SidebarProfileProps): React.JSX.Element {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const handleLogout = async (): Promise<void> => {
    setBusy(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      setBusy(false);
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <div className={styles.profileBlock}>
      <span className={styles.avatar} aria-hidden="true">
        {initialsFor(name)}
      </span>
      <div className={styles.profileBlockMeta}>
        <div className={styles.profileBlockName}>{name}</div>
        <div className={styles.profileBlockEmail}>{email}</div>
      </div>
      <button
        type="button"
        className={styles.logoutInline}
        onClick={() => void handleLogout()}
        disabled={busy}
        aria-label="Oturumu kapat"
      >
        {busy ? '...' : 'Çıkış'}
      </button>
    </div>
  );
}

interface RolePillProps {
  role: 'admin' | 'editor';
}

export function RolePill({ role }: RolePillProps): React.JSX.Element {
  const label = role === 'admin' ? 'Yönetici · Tam yetki' : 'Editör · Katalog';
  return (
    <span className={`${styles.rolePill} ${role === 'admin' ? styles['rolePill--admin'] : ''}`}>
      <span className={styles.rolePillDot} aria-hidden="true" />
      {label}
    </span>
  );
}
