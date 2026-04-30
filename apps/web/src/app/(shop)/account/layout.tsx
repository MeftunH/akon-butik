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
    <main className="container py-5">
      <div className="row gx-4">
        <aside className="col-lg-3 mb-4 mb-lg-0">
          <div className="border rounded p-3">
            <p className="fw-semibold mb-1">{profile.adSoyad}</p>
            <p className="text-muted small mb-3">{profile.email}</p>
            <AccountNav />
          </div>
        </aside>
        <section className="col-lg-9">{children}</section>
      </div>
    </main>
  );
}
