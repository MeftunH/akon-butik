'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/' as const, label: 'Dashboard' },
  { href: '/products' as const, label: 'Ürünler' },
  { href: '/orders' as const, label: 'Siparişler' },
  { href: '/sync' as const, label: 'DIA Senkron' },
] as const;

interface AdminNavProps {
  role: 'admin' | 'editor';
}

export function AdminNav({ role }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onLogout = async () => {
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
    <nav className="d-flex flex-column gap-1 flex-grow-1">
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className={pathname === href ? 'active' : undefined}>
          {label}
        </Link>
      ))}
      <div className="mt-auto pt-3 border-top border-secondary">
        <p className="small text-muted-light mb-2">Rol: {role}</p>
        <button
          type="button"
          className="btn btn-sm btn-outline-light w-100"
          onClick={() => void onLogout()}
          disabled={busy}
        >
          {busy ? 'Çıkış yapılıyor…' : 'Çıkış Yap'}
        </button>
      </div>
    </nav>
  );
}
