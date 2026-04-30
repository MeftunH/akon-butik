import { redirect } from 'next/navigation';

import { fetchAccount, NOT_AUTHENTICATED, type CustomerProfile } from '../../../lib/account';

export default async function AccountHomePage() {
  const profile = await fetchAccount<CustomerProfile>('/customers/me');
  if (profile === NOT_AUTHENTICATED) redirect('/login?next=/account');

  const memberSince = new Date(profile.createdAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article>
      <h1 className="h3 fw-bold mb-4">Profilim</h1>
      <dl className="row mb-0">
        <dt className="col-sm-4 text-muted fw-normal">Ad Soyad</dt>
        <dd className="col-sm-8 mb-3">{profile.adSoyad}</dd>

        <dt className="col-sm-4 text-muted fw-normal">E-posta</dt>
        <dd className="col-sm-8 mb-3">
          {profile.email}
          {profile.emailVerifiedAt ? (
            <span className="badge bg-success-subtle text-success ms-2">Doğrulandı</span>
          ) : (
            <span className="badge bg-warning-subtle text-warning ms-2">Doğrulanmadı</span>
          )}
        </dd>

        <dt className="col-sm-4 text-muted fw-normal">Telefon</dt>
        <dd className="col-sm-8 mb-3">{profile.telefon}</dd>

        <dt className="col-sm-4 text-muted fw-normal">Üyelik Tarihi</dt>
        <dd className="col-sm-8 mb-3">{memberSince}</dd>

        {profile.diaCarikartKodu && (
          <>
            <dt className="col-sm-4 text-muted fw-normal">Müşteri Kodu</dt>
            <dd className="col-sm-8 mb-0">
              <code>{profile.diaCarikartKodu}</code>
            </dd>
          </>
        )}
      </dl>
    </article>
  );
}
