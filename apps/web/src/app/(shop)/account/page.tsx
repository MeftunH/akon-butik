import { redirect } from 'next/navigation';

import {
  fetchAccount,
  NOT_AUTHENTICATED,
  type CustomerOrderSummary,
  type CustomerProfile,
} from '../../../lib/account';

import { AccountStats } from './_components/AccountStats';
import { RecentOrdersTable } from './_components/RecentOrdersTable';

export default async function AccountHomePage() {
  const profile = await fetchAccount<CustomerProfile>('/customers/me');
  if (profile === NOT_AUTHENTICATED) redirect('/login?next=/account');

  const ordersResp = await fetchAccount<readonly CustomerOrderSummary[]>('/customers/me/orders');
  const orders = ordersResp === NOT_AUTHENTICATED ? [] : ordersResp;

  const memberSince = new Date(profile.createdAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article>
      <h1 className="h3 fw-bold mb-4">Profilim</h1>

      <AccountStats orders={orders} />

      <RecentOrdersTable orders={orders} limit={5} />

      <section className="mt-5">
        <h2 className="h5 fw-bold mb-3">İletişim Bilgileri</h2>
        <dl className="row mb-0">
          <dt className="col-sm-4 text-main-2 fw-normal">Ad Soyad</dt>
          <dd className="col-sm-8 mb-3">{profile.adSoyad}</dd>

          <dt className="col-sm-4 text-main-2 fw-normal">E-posta</dt>
          <dd className="col-sm-8 mb-3">
            {profile.email}
            {profile.emailVerifiedAt ? (
              <span className="badge bg-success-subtle text-success ms-2">Doğrulandı</span>
            ) : (
              <span className="badge bg-warning-subtle text-warning ms-2">Doğrulanmadı</span>
            )}
          </dd>

          <dt className="col-sm-4 text-main-2 fw-normal">Telefon</dt>
          <dd className="col-sm-8 mb-3">{profile.telefon}</dd>

          <dt className="col-sm-4 text-main-2 fw-normal">Üyelik Tarihi</dt>
          <dd className="col-sm-8 mb-3">{memberSince}</dd>

          {profile.diaCarikartKodu && (
            <>
              <dt className="col-sm-4 text-main-2 fw-normal">Müşteri Kodu</dt>
              <dd className="col-sm-8 mb-0">
                <code>{profile.diaCarikartKodu}</code>
              </dd>
            </>
          )}
        </dl>
      </section>
    </article>
  );
}
