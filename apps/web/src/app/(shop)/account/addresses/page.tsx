import { redirect } from 'next/navigation';

import { fetchAccount, NOT_AUTHENTICATED, type CustomerAddress } from '../../../../lib/account';

const TYPE_LABELS: Record<string, string> = {
  fatura: 'Fatura Adresi',
  teslimat: 'Teslimat Adresi',
};

export default async function AddressesPage() {
  const addresses = await fetchAccount<CustomerAddress[]>('/customers/me/addresses');
  if (addresses === NOT_AUTHENTICATED) redirect('/login?next=/account/addresses');

  return (
    <article>
      <h1 className="h3 fw-bold mb-4">Adreslerim</h1>
      {addresses.length === 0 ? (
        <p className="text-muted">
          Henüz kayıtlı bir adresiniz yok. Bir sipariş verdiğinizde adres bilgileriniz burada
          listelenir.
        </p>
      ) : (
        <div className="row g-3">
          {addresses.map((a) => (
            <div key={a.id} className="col-md-6">
              <div className="border rounded p-3 h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-secondary-subtle text-secondary">
                    {TYPE_LABELS[a.type] ?? a.type}
                  </span>
                  {a.isDefault && (
                    <span className="badge bg-primary-subtle text-primary">Varsayılan</span>
                  )}
                </div>
                <p className="mb-1 fw-semibold">{a.adSoyad}</p>
                <p className="mb-1 small text-muted">{a.telefon}</p>
                <p className="mb-0 small">
                  {a.acikAdres}
                  <br />
                  {a.ilce} / {a.il} {a.postaKodu}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-muted small mt-4 mb-0">
        Adres ekleme ve düzenleme yakında bu sayfada olacak.
      </p>
    </article>
  );
}
