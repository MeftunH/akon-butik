import { redirect } from 'next/navigation';

import { fetchAccount, NOT_AUTHENTICATED, type CustomerProfile } from '../../../../lib/account';

export default async function SettingsPage() {
  const profile = await fetchAccount<CustomerProfile>('/customers/me');
  if (profile === NOT_AUTHENTICATED) redirect('/login?next=/account/settings');

  return (
    <article>
      <h1 className="h3 fw-bold mb-4">Hesap Ayarları</h1>

      <section className="border rounded p-4 mb-4">
        <h2 className="h6 fw-bold mb-3">İletişim Bilgileri</h2>
        <dl className="row mb-0">
          <dt className="col-sm-4 text-muted fw-normal">E-posta</dt>
          <dd className="col-sm-8 mb-2">{profile.email}</dd>
          <dt className="col-sm-4 text-muted fw-normal">Telefon</dt>
          <dd className="col-sm-8 mb-0">{profile.telefon}</dd>
        </dl>
      </section>

      <section className="border rounded p-4">
        <h2 className="h6 fw-bold mb-2">Şifre Değişikliği</h2>
        <p className="text-muted small mb-0">Şifre değişikliği akışı yakında bu sayfada olacak.</p>
      </section>
    </article>
  );
}
