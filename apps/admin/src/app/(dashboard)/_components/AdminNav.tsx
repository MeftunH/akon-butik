'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/' as const, label: 'Panel', icon: 'icon-circle-four' },
  { href: '/products' as const, label: 'Ürünler', icon: 'icon-bag-simple' },
  { href: '/orders' as const, label: 'Siparişler', icon: 'icon-box-arrow-down' },
  { href: '/sync' as const, label: 'DIA Senkron', icon: 'icon-arrow-clockwise' },
] as const;

interface AdminNavProps {
  role: 'admin' | 'editor';
}

/**
 * Admin sidebar nav. Mirrors vendor `dashboard/Sidebar.tsx` —
 * `my-account-nav` list with `my-account-nav_item h5` links and a leading
 * icon. The "Log out" link in vendor is a real <Link to="/">; we
 * intercept the click to hit the API then bounce to /login.
 */
export function AdminNav({ role }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onLogout = async (): Promise<void> => {
    setBusy(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' });
      router.push('/login');
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <ul className="my-account-nav">
      {links.map(({ href, label, icon }) => {
        const active = pathname === href;
        return (
          <li key={href}>
            <Link href={href} className={`my-account-nav_item h5 ${active ? 'active' : ''}`}>
              <i className={`icon ${icon}`} />
              {label}
            </Link>
          </li>
        );
      })}
      <li>
        <button
          type="button"
          className="my-account-nav_item h5 w-100 text-start bg-transparent border-0"
          onClick={() => void onLogout()}
          disabled={busy}
        >
          <i className="icon icon-sign-out" />
          {busy ? 'Çıkış yapılıyor…' : `Çıkış Yap (${role})`}
        </button>
      </li>
    </ul>
  );
}
