'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import type { CustomerAddress } from '../../../../../lib/account';
import type { AccountAddressFormValues } from '../../../../../lib/address-schema';

import { AddressFormModal } from './AddressFormModal';

const TYPE_LABELS: Record<CustomerAddress['type'], string> = {
  fatura: 'Fatura Adresi',
  teslimat: 'Teslimat Adresi',
};

interface AddressListProps {
  initialAddresses: readonly CustomerAddress[];
}

/**
 * Account address list — vendor `account-my_address` markup with each
 * card actioned by Edit / Delete / "Varsayılan yap". State is managed
 * client-side; mutations hit the customer-side `/api/customers/me/addresses*`
 * endpoints and refresh the server cache on success via `router.refresh()`.
 */
export function AddressList({ initialAddresses }: AddressListProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<CustomerAddress[]>([...initialAddresses]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CustomerAddress | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const refresh = (): void => {
    startTransition(() => {
      router.refresh();
    });
  };

  const openCreate = (): void => {
    setEditing(null);
    setError(null);
    setModalOpen(true);
  };
  const openEdit = (a: CustomerAddress): void => {
    setEditing(a);
    setError(null);
    setModalOpen(true);
  };
  const close = (): void => {
    if (busy) return;
    setModalOpen(false);
    setEditing(null);
  };

  const onSubmit = async (values: AccountAddressFormValues): Promise<void> => {
    setBusy(true);
    setError(null);
    try {
      const url = editing
        ? `/api/customers/me/addresses/${editing.id}`
        : '/api/customers/me/addresses';
      const method = editing ? 'PATCH' : 'POST';
      const body = {
        ...values,
        ...(values.label === '' ? { label: undefined } : {}),
      };
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? 'İşlem başarısız oldu');
      }
      const saved = (await res.json()) as CustomerAddress;
      setAddresses((prev) => {
        const next = editing ? prev.map((a) => (a.id === saved.id ? saved : a)) : [...prev, saved];
        if (saved.isDefault) {
          return next.map((a) =>
            a.type === saved.type && a.id !== saved.id ? { ...a, isDefault: false } : a,
          );
        }
        return next;
      });
      setModalOpen(false);
      setEditing(null);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id: string): Promise<void> => {
    if (!window.confirm('Bu adresi silmek istediğinize emin misiniz?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/customers/me/addresses/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok && res.status !== 204) throw new Error('Silinemedi');
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      refresh();
    } catch {
      setError('Adres silinemedi.');
    } finally {
      setBusy(false);
    }
  };

  const onSetDefault = async (a: CustomerAddress): Promise<void> => {
    if (a.isDefault) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/customers/me/addresses/${a.id}/default`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error();
      setAddresses((prev) =>
        prev.map((x) => (x.type === a.type ? { ...x, isDefault: x.id === a.id } : x)),
      );
      refresh();
    } catch {
      setError('Varsayılan ayarlanamadı.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold mb-0">Adreslerim</h1>
        <button type="button" className="tf-btn animate-btn" onClick={openCreate}>
          <i className="icon icon-plus me-2" /> Yeni Adres
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {addresses.length === 0 ? (
        <p className="text-main">
          Henüz kayıtlı bir adresiniz yok. Sağ üstteki <strong>Yeni Adres</strong> butonuyla
          ekleyebilirsiniz.
        </p>
      ) : (
        <div className="account-my_address row g-3">
          {addresses.map((a) => (
            <div key={a.id} className="col-md-6">
              <div className="account-address-item border rounded-3 p-3 h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-secondary-subtle text-secondary">
                    {TYPE_LABELS[a.type]}
                  </span>
                  {a.isDefault && (
                    <span className="badge bg-primary-subtle text-primary">Varsayılan</span>
                  )}
                </div>
                <p className="mb-1 fw-semibold">{a.adSoyad}</p>
                <p className="mb-1 small text-main-2">{a.telefon}</p>
                <p className="mb-3 small flex-grow-1">
                  {a.acikAdres}
                  <br />
                  {a.ilce} / {a.il} {a.postaKodu}
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      openEdit(a);
                    }}
                    disabled={busy}
                  >
                    Düzenle
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => void onDelete(a.id)}
                    disabled={busy}
                  >
                    Sil
                  </button>
                  {!a.isDefault && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => void onSetDefault(a)}
                      disabled={busy}
                    >
                      Varsayılan Yap
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressFormModal
        editing={editing}
        open={modalOpen}
        busy={busy}
        errorMessage={error}
        onClose={close}
        onSubmit={onSubmit}
      />
    </>
  );
}
