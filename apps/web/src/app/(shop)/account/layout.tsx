import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { fetchAccount, NOT_AUTHENTICATED, type CustomerProfile } from '../../../lib/account';

import { AccountNav } from './_components/AccountNav';

export const metadata = {
  title: 'Hesabım',
  robots: { index: false, follow: false },
};

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const profile = await fetchAccount<CustomerProfile>('/customers/me');
  if (profile === NOT_AUTHENTICATED) redirect('/login?next=/account');

  return (
    <main className="flat-spacing">
      <div className="container">
        <div className="row gx-4">
          <aside className="col-lg-3 mb-4 mb-lg-0">
            <div className="account-sidebar bg-surface rounded-3 p-4">
              <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary fw-bold flex-shrink-0"
                  style={{ width: 48, height: 48 }}
                  aria-hidden
                >
                  {profile.adSoyad.charAt(0).toUpperCase()}
                </span>
                <div className="overflow-hidden">
                  <p className="fw-semibold mb-0 text-truncate">{profile.adSoyad}</p>
                  <p className="text-muted small mb-0 text-truncate">{profile.email}</p>
                </div>
              </div>
              <AccountNav />
            </div>
          </aside>
          <section className="col-lg-9">{children}</section>
        </div>
      </div>
    </main>
  );
}
