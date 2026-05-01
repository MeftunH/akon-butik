'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mevcut şifrenizi girin'),
    newPassword: z
      .string()
      .min(10, 'Yeni şifre en az 10 karakter olmalı')
      .max(128, 'Yeni şifre en fazla 128 karakter olabilir'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  });

type PasswordValues = z.infer<typeof passwordSchema>;

/**
 * Şifre değişikliği formu — POST /api/customers/me/password.
 * Mevcut şifre yanlışsa backend 401 döner; başarılı değişiklikte 204 +
 * formu sıfırlar ve "Şifreniz güncellendi" mesajı gösterir.
 */
export function PasswordChangeForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSuccess(false);
    setSubmitting(true);
    try {
      const res = await fetch('/api/customers/me/password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });
      if (res.status === 401) {
        throw new Error('Mevcut şifre hatalı.');
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? 'Şifre güncellenemedi');
      }
      reset();
      setSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form className="form-login" onSubmit={(e) => void onSubmit(e)} noValidate>
      <div className="list-ver d-flex flex-column gap-3">
        <fieldset className="password-wrapper position-relative">
          <label className="form-label" htmlFor="current-password">
            Mevcut Şifre
          </label>
          <input
            id="current-password"
            className="password-field form-control"
            type={showCurrent ? 'text' : 'password'}
            autoComplete="current-password"
            {...register('currentPassword')}
          />
          <button
            type="button"
            className={`toggle-pass btn-reset position-absolute end-0 top-0 mt-4 me-3 ${
              showCurrent ? 'icon-view' : 'icon-show-password'
            }`}
            onClick={() => {
              setShowCurrent((p) => !p);
            }}
            aria-label={showCurrent ? 'Şifreyi gizle' : 'Şifreyi göster'}
          />
          {formState.errors.currentPassword && (
            <small className="text-danger">{formState.errors.currentPassword.message}</small>
          )}
        </fieldset>

        <fieldset className="password-wrapper position-relative">
          <label className="form-label" htmlFor="new-password">
            Yeni Şifre
          </label>
          <input
            id="new-password"
            className="password-field form-control"
            type={showNew ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="En az 10 karakter"
            {...register('newPassword')}
          />
          <button
            type="button"
            className={`toggle-pass btn-reset position-absolute end-0 top-0 mt-4 me-3 ${
              showNew ? 'icon-view' : 'icon-show-password'
            }`}
            onClick={() => {
              setShowNew((p) => !p);
            }}
            aria-label={showNew ? 'Şifreyi gizle' : 'Şifreyi göster'}
          />
          {formState.errors.newPassword && (
            <small className="text-danger">{formState.errors.newPassword.message}</small>
          )}
        </fieldset>

        <fieldset>
          <label className="form-label" htmlFor="confirm-password">
            Yeni Şifre (Tekrar)
          </label>
          <input
            id="confirm-password"
            type={showNew ? 'text' : 'password'}
            className="form-control"
            autoComplete="new-password"
            {...register('confirmPassword')}
          />
          {formState.errors.confirmPassword && (
            <small className="text-danger">{formState.errors.confirmPassword.message}</small>
          )}
        </fieldset>
      </div>

      {submitError && (
        <p className="text-danger small mt-3 mb-0" role="alert">
          {submitError}
        </p>
      )}
      {success && <p className="text-success small mt-3 mb-0">Şifreniz başarıyla güncellendi.</p>}

      <button type="submit" className="tf-btn animate-btn fw-semibold mt-4" disabled={submitting}>
        {submitting ? 'Güncelleniyor…' : 'Şifreyi Güncelle'}
        {!submitting && <i className="icon icon-arrow-right ms-2" />}
      </button>
    </form>
  );
}
