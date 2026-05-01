'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './AdminChrome.module.scss';

interface NavLink {
  href: '/' | '/products' | '/orders' | '/sync';
  label: string;
  icon: string;
  description?: string;
  /** If set, only roles in this list see the link. Default: visible to all. */
  roles?: readonly ('admin' | 'editor')[];
}

interface NavGroup {
  heading: string;
  items: readonly NavLink[];
}

/**
 * Section-grouped admin nav. Sections were chosen against the routes that
 * actually exist under `apps/admin/src/app/(dashboard)/` — Panel, Ürünler,
 * Siparişler, DIA Senkron — and grouped editorially so the chrome doesn't
 * read as a flat icon-list dump.
 *
 * Adding a new top-level admin route means adding it here AND adding the
 * page under (dashboard)/. Sections are not a routing primitive; they
 * exist purely for visual grouping of an actual route surface.
 */
const NAV_GROUPS: readonly NavGroup[] = [
  {
    heading: 'Genel',
    items: [
      {
        href: '/',
        label: 'Panel',
        icon: 'icon-circle-four',
        description: 'Günün özeti',
      },
    ],
  },
  {
    heading: 'Katalog',
    items: [
      {
        href: '/products',
        label: 'Ürünler',
        icon: 'icon-bag',
        description: 'Ürün kataloğu, görseller, fiyatlama',
      },
    ],
  },
  {
    heading: 'Sipariş',
    items: [
      {
        href: '/orders',
        label: 'Siparişler',
        icon: 'icon-package',
        description: 'Tüm siparişler ve durumlar',
      },
    ],
  },
  {
    heading: 'İşletim',
    items: [
      {
        href: '/sync',
        label: 'DIA Senkron',
        icon: 'icon-arrow-right',
        description: 'Stok ve katalog senkronizasyonu',
        roles: ['admin'],
      },
    ],
  },
] as const;

interface AdminNavProps {
  role: 'admin' | 'editor';
}

/**
 * Pure nav list. Profile block + role pill live in `SidebarProfile` so this
 * component is reusable inside both the desktop sidebar and the mobile
 * drawer without prop-drilling user data twice.
 */
export function AdminNav({ role }: AdminNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav aria-label="Yönetim menüsü">
      {NAV_GROUPS.map((group) => {
        const visibleItems = group.items.filter((item) => !item.roles || item.roles.includes(role));
        if (visibleItems.length === 0) return null;
        return (
          <div key={group.heading} className={styles.navGroup}>
            <h2 className={styles.navHeading}>{group.heading}</h2>
            <ul className={styles.navList}>
              {visibleItems.map(({ href, label, icon }) => {
                // Exact match for `/`; prefix match for nested resource pages
                // (e.g. /products/[id] should still highlight Ürünler).
                const active =
                  href === '/'
                    ? pathname === '/'
                    : pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`${styles.navItem} ${active ? styles['navItem--active'] : ''}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <i className={`icon ${icon}`} aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
