'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogoutButton } from './LogoutButton';

const links = [
  { href: '/account', label: 'Profilim' },
  { href: '/account/orders', label: 'Siparişlerim' },
  { href: '/account/addresses', label: 'Adreslerim' },
  { href: '/account/settings', label: 'Hesap Ayarları' },
] as const;

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav className="account-nav d-flex flex-column gap-2" aria-label="Hesap menüsü">
      <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`d-block px-3 py-2 rounded text-decoration-none ${
                  active ? 'bg-primary text-white' : 'text-body'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="border-top pt-3 mt-2">
        <LogoutButton />
      </div>
    </nav>
  );
}
