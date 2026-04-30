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

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const me = await fetchAdmin<AdminProfile>('/admin/auth/me');
  if (me === ADMIN_NOT_AUTHENTICATED) redirect('/login');

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="d-flex flex-column h-100">
          <h5 className="mb-1">Akon Admin</h5>
          <p className="small text-muted-light mb-4">{me.name}</p>
          <AdminNav role={me.role} />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
