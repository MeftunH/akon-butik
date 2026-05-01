import { redirect } from 'next/navigation';

import { fetchAccount, NOT_AUTHENTICATED, type CustomerProfile } from '../../../../lib/account';

import { PasswordChangeForm } from './_components/PasswordChangeForm';

export default async function SettingsPage() {
  const profile = await fetchAccount<CustomerProfile>('/customers/me');
  if (profile === NOT_AUTHENTICATED) redirect('/login?next=/account/settings');

  return (
    <article>
      <h1 className="h3 fw-bold mb-4">Hesap Ayarları</h1>

      <section className="border rounded-3 p-4 mb-4 bg-white">
        <h2 className="h5 fw-bold mb-3">İletişim Bilgileri</h2>
        <dl className="row mb-0">
          <dt className="col-sm-4 text-main-2 fw-normal">Ad Soyad</dt>
          <dd className="col-sm-8 mb-2">{profile.adSoyad}</dd>
          <dt className="col-sm-4 text-main-2 fw-normal">E-posta</dt>
          <dd className="col-sm-8 mb-2">{profile.email}</dd>
          <dt className="col-sm-4 text-main-2 fw-normal">Telefon</dt>
          <dd className="col-sm-8 mb-0">{profile.telefon}</dd>
        </dl>
      </section>

      <section className="border rounded-3 p-4 bg-white">
        <h2 className="h5 fw-bold mb-3">Şifre Değişikliği</h2>
        <p className="text-main-2 small mb-4">
          Güvenliğiniz için yeni şifrenizin en az 10 karakter olmasını öneririz. Şifre değişikliği
          sonrası diğer cihazlardaki oturumlar açık kalır.
        </p>
        <PasswordChangeForm />
      </section>
    </article>
  );
}
