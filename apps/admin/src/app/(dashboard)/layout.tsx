import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { ADMIN_NOT_AUTHENTICATED, fetchAdmin } from '../../lib/admin-fetch';

import { AdminTopbar } from './_components/AdminTopbar';
import { DashboardChrome } from './_components/DashboardChrome';

interface AdminProfile {
  id: string;
  email: string;
  /** May be null on accounts created before the seed populated `name`. */
  name?: string | null;
  role: 'admin' | 'editor';
}

/**
 * Admin dashboard chrome. The vendor `tf-topbar bg-black` strip used to
 * sit above; we replaced it with a brand-tinted dark wine strip and a
 * lighter editorial header so the back-office reads as fashion-buyer
 * rather than office-SaaS.
 *
 * The composition is:
 *   - AdminTopbar (server) — thin contextual rail with brand mark + date
 *   - DashboardChrome (client) — header w/ profile dropdown + sidebar
 *     + mobile drawer + role pill
 *   - children — the page being rendered
 *
 * Auth: a single 401 against /admin/auth/me bounces the user to /login
 * with no data leak.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): Promise<React.JSX.Element> {
  const me = await fetchAdmin<AdminProfile>('/admin/auth/me');
  if (me === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  const roleLabel = me.role === 'admin' ? 'Yönetici' : 'Editör';
  const displayName = me.name?.trim() || me.email;

  return (
    <>
      <AdminTopbar roleLabel={roleLabel} />
      <DashboardChrome name={displayName} email={me.email} role={me.role}>
        {children}
      </DashboardChrome>
    </>
  );
}
