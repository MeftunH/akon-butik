'use client';

import { TR_ILLER } from '@akonbutik/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { CustomerAddress } from '../../../../../lib/account';
import {
  accountAddressSchema,
  EMPTY_ADDRESS_FORM,
  type AccountAddressFormValues,
} from '../../../../../lib/address-schema';

interface AddressFormModalProps {
  /** When non-null the modal is in edit mode and the form is pre-filled. */
  editing: CustomerAddress | null;
  open: boolean;
  busy: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onSubmit: (values: AccountAddressFormValues) => Promise<void> | void;
}

/**
 * Plain HTML modal (no Bootstrap JS dependency). Renders fixed-position
 * over the page when `open`. Form layout matches the checkout's
 * AddressFieldset for consistency, plus a `type` selector + `label` +
 * `isDefault` toggle that the checkout form doesn't need.
 */
export function AddressFormModal({
  editing,
  open,
  busy,
  errorMessage,
  onClose,
  onSubmit,
}: AddressFormModalProps) {
  const { register, control, handleSubmit, reset, formState } = useForm<AccountAddressFormValues>({
    resolver: zodResolver(accountAddressSchema),
    defaultValues: EMPTY_ADDRESS_FORM,
  });

  useEffect(() => {
    if (open) {
      if (editing) {
        reset({
          type: editing.type,
          adSoyad: editing.adSoyad,
          telefon: editing.telefon,
          il: editing.il,
          ilce: editing.ilce,
          acikAdres: editing.acikAdres,
          postaKodu: editing.postaKodu,
          label: '',
          isDefault: editing.isDefault,
        });
      } else {
        reset(EMPTY_ADDRESS_FORM);
      }
    }
  }, [open, editing, reset]);

  if (!open) return null;

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1080 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-modal-title"
    >
      <div
        className="bg-white rounded-3 shadow p-4"
        style={{ width: 'min(720px, 92vw)', maxHeight: '92vh', overflowY: 'auto' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 id="address-modal-title" className="fw-bold mb-0">
            {editing ? 'Adresi Düzenle' : 'Yeni Adres'}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Kapat"
            disabled={busy}
          />
        </div>

        <form onSubmit={(e) => void submit(e)} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="addr-type">
                Adres Tipi
              </label>
              <select id="addr-type" className="form-select" {...register('type')}>
                <option value="teslimat">Teslimat Adresi</option>
                <option value="fatura">Fatura Adresi</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="addr-label">
                Etiket (ev / iş, opsiyonel)
              </label>
              <input
                id="addr-label"
                className="form-control"
                placeholder="Ev"
                {...register('label')}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="addr-adSoyad">
                Ad Soyad
              </label>
              <input id="addr-adSoyad" className="form-control" {...register('adSoyad')} />
              {formState.errors.adSoyad && (
                <small className="text-danger">{formState.errors.adSoyad.message}</small>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="addr-telefon">
                Telefon
              </label>
              <input
                id="addr-telefon"
                className="form-control"
                placeholder="0555 123 45 67"
                {...register('telefon')}
              />
              {formState.errors.telefon && (
                <small className="text-danger">{formState.errors.telefon.message}</small>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="addr-il">
                İl
              </label>
              <Controller
                control={control}
                name="il"
                render={({ field }) => (
                  <select id="addr-il" className="form-select" {...field}>
                    <option value="" disabled>
                      İl seçin
                    </option>
                    {TR_ILLER.map((il) => (
                      <option key={il.code} value={il.name}>
                        {il.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {formState.errors.il && (
                <small className="text-danger">{formState.errors.il.message}</small>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="addr-ilce">
                İlçe
              </label>
              <input id="addr-ilce" className="form-control" {...register('ilce')} />
              {formState.errors.ilce && (
                <small className="text-danger">{formState.errors.ilce.message}</small>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="addr-postaKodu">
                Posta Kodu
              </label>
              <input
                id="addr-postaKodu"
                className="form-control"
                inputMode="numeric"
                maxLength={5}
                {...register('postaKodu')}
              />
              {formState.errors.postaKodu && (
                <small className="text-danger">{formState.errors.postaKodu.message}</small>
              )}
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="addr-acikAdres">
                Açık Adres
              </label>
              <textarea
                id="addr-acikAdres"
                rows={3}
                className="form-control"
                {...register('acikAdres')}
              />
              {formState.errors.acikAdres && (
                <small className="text-danger">{formState.errors.acikAdres.message}</small>
              )}
            </div>

            <div className="col-12">
              <div className="form-check">
                <input
                  id="addr-isDefault"
                  type="checkbox"
                  className="form-check-input"
                  {...register('isDefault')}
                />
                <label className="form-check-label" htmlFor="addr-isDefault">
                  Bu tip için varsayılan adres yap
                </label>
              </div>
            </div>
          </div>

          {errorMessage && (
            <p className="text-danger small mt-3 mb-0" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="d-flex gap-2 justify-content-end mt-4">
            <button type="button" className="tf-btn style-line" onClick={onClose} disabled={busy}>
              Vazgeç
            </button>
            <button type="submit" className="tf-btn animate-btn fw-semibold" disabled={busy}>
              {busy ? 'Kaydediliyor…' : editing ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
