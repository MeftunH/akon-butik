import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../lib/admin-fetch';

import { AdminNav } from './_components/AdminNav';

interface AdminProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

/**
 * Admin dashboard chrome. Mirrors vendor `pages/dashboard/layout.tsx` +
 * `pages/dashboard/account-page/index.tsx`:
 *
 *   - `tf-topbar bg-black` (vendor Topbar1) above
 *   - `tf-header header-fix` brand + nav (Akon Admin variant — fewer
 *      links than the storefront, no cart/wishlist)
 *   - `dashboard tf-spacing-1` body with a `row` of
 *     `sidebar-account sidebar-content-wrap sticky-top` (left) +
 *     content area (right)
 *
 * All vendor classes — the same SCSS bundle that styles the storefront
 * styles this too, so admin no longer needs the bespoke dark `admin-shell`
 * theme.
 */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const me = await fetchAdmin<AdminProfile>('/admin/auth/me');
  if (me === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  return (
    <>
      <div className="tf-topbar bg-black">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="topbar-left">
                <h6 className="text-up text-white fw-normal text-line-clamp-1">
                  Akon Butik Yönetim Paneli — yalnızca yetkili kullanıcılar için.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="tf-header header-fix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 col-6">
              <Link href="/" className="logo-site">
                <span className="brand-text fs-4 fw-bold">AKON BUTİK · ADMIN</span>
              </Link>
            </div>
            <div className="col-md-8 col-6 d-flex justify-content-end">
              <ul className="nav-icon-list">
                <li className="d-none d-md-flex align-items-center">
                  <span className="h6 text-main me-2">{me.name}</span>
                </li>
                <li>
                  <Link
                    href="/"
                    className="nav-icon-item"
                    aria-label="Mağazaya dön"
                    target="_blank"
                  >
                    <i className="icon icon-arrow-square-out" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="dashboard tf-spacing-1">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 mb-4 mb-lg-0">
              <div className="sidebar-account sidebar-content-wrap sticky-top">
                <div className="account-author">
                  <h4 className="author_name">{me.name}</h4>
                  <p className="author_email h6">{me.email}</p>
                </div>
                <AdminNav role={me.role} />
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <main className="account-content">{children}</main>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
