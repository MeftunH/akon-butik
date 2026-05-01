'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import styles from './AdminChrome.module.scss';
import { AdminHeader } from './AdminHeader';
import { AdminNav } from './AdminNav';
import { RolePill, SidebarProfile } from './SidebarProfile';

interface DashboardChromeProps {
  name: string;
  email: string;
  role: 'admin' | 'editor';
  children: ReactNode;
}

/**
 * Client wrapper that owns the mobile sidebar state. The desktop sidebar
 * is always visible (lg+); on small viewports it slides in from the left
 * via the header hamburger. The same `<AdminNav />` is reused inside the
 * drawer so we don't duplicate the route/icon list.
 */
export function DashboardChrome({
  name,
  email,
  role,
  children,
}: DashboardChromeProps): React.JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close the drawer whenever the route changes — pressing a nav link
  // on mobile would otherwise leave the drawer covering the destination.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const previous = document.body.style.overflow;
    if (drawerOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  return (
    <>
      <AdminHeader
        name={name}
        email={email}
        role={role}
        onToggleSidebar={() => {
          setDrawerOpen((prev) => !prev);
        }}
      />

      <section className="dashboard tf-spacing-1">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 mb-4 mb-lg-0 d-none d-lg-block">
              <aside className={`${styles.sidebar} sticky-top`} style={{ top: 24 }}>
                <RolePill role={role} />
                <AdminNav role={role} />
                <SidebarProfile name={name} email={email} role={role} />
              </aside>
            </div>
            <div className="col-xl-9 col-lg-8 col-12">
              <main className="account-content">{children}</main>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sidebarShellMobile} data-open={drawerOpen} aria-hidden={!drawerOpen}>
        <button
          type="button"
          className={styles.sidebarBackdrop}
          aria-label="Menüyü kapat"
          tabIndex={drawerOpen ? 0 : -1}
          onClick={() => {
            setDrawerOpen(false);
          }}
        />
        <aside className={styles.sidebarDrawer} aria-label="Yönetim menüsü">
          <button
            type="button"
            className={styles.drawerClose}
            onClick={() => {
              setDrawerOpen(false);
            }}
            aria-label="Menüyü kapat"
          >
            <i className="icon icon-close" aria-hidden="true" />
          </button>
          <div className={styles.drawerInner}>
            <div
              className={styles.sidebar}
              style={{ border: 0, padding: 0, background: 'transparent' }}
            >
              <RolePill role={role} />
              <AdminNav role={role} />
              <SidebarProfile name={name} email={email} role={role} />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
