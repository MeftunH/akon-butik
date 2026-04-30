'use client';

import { useCart } from '@akonbutik/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const phoneRegex = /^(\+?90|0)?5\d{9}$/;

const registerSchema = z.object({
  adSoyad: z.string().trim().min(2, 'Ad soyad en az 2 karakter olmalı').max(120),
  email: z.string().email('Geçerli bir e-posta girin'),
  telefon: z.string().regex(phoneRegex, 'Geçerli bir Türk cep telefonu girin'),
  password: z
    .string()
    .min(10, 'Şifre en az 10 karakter olmalı')
    .max(128, 'Şifre en fazla 128 karakter olabilir'),
  kvkkAccepted: z.literal(true, {
    errorMap: () => ({ message: 'KVKK aydınlatma metnini onaylamanız gerekir' }),
  }),
});

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { refresh: refreshCart } = useCart();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      adSoyad: '',
      email: '',
      telefon: '',
      password: '',
      kvkkAccepted: false as unknown as true,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? 'Kayıt oluşturulamadı');
      }
      await refreshCart();
      router.push('/account');
      router.refresh();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
      setSubmitting(false);
    }
  });

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <h1 className="h3 fw-bold mb-4 text-center">Hesap Oluştur</h1>
          <form onSubmit={(e) => void onSubmit(e)} noValidate>
            <div className="mb-3">
              <label className="form-label" htmlFor="adSoyad">
                Ad Soyad
              </label>
              <input
                id="adSoyad"
                autoComplete="name"
                className="form-control"
                {...register('adSoyad')}
              />
              {formState.errors.adSoyad && (
                <small className="text-danger">{formState.errors.adSoyad.message}</small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="form-control"
                {...register('email')}
              />
              {formState.errors.email && (
                <small className="text-danger">{formState.errors.email.message}</small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="telefon">
                Cep Telefonu
              </label>
              <input
                id="telefon"
                autoComplete="tel"
                placeholder="0555 123 45 67"
                className="form-control"
                {...register('telefon')}
              />
              {formState.errors.telefon && (
                <small className="text-danger">{formState.errors.telefon.message}</small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="form-control"
                {...register('password')}
              />
              <small className="text-muted">En az 10 karakter</small>
              {formState.errors.password && (
                <div>
                  <small className="text-danger">{formState.errors.password.message}</small>
                </div>
              )}
            </div>
            <div className="form-check mb-3">
              <input
                id="kvkkAccepted"
                type="checkbox"
                className="form-check-input"
                {...register('kvkkAccepted')}
              />
              <label className="form-check-label" htmlFor="kvkkAccepted">
                <Link href="/kvkk" target="_blank" className="text-decoration-none">
                  KVKK aydınlatma metnini
                </Link>{' '}
                okudum, onaylıyorum.
              </label>
              {formState.errors.kvkkAccepted && (
                <div>
                  <small className="text-danger">{formState.errors.kvkkAccepted.message}</small>
                </div>
              )}
            </div>
            {submitError && (
              <p className="text-danger small mb-3" role="alert">
                {submitError}
              </p>
            )}
            <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
              {submitting ? 'Hesap oluşturuluyor…' : 'Hesap Oluştur'}
            </button>
          </form>
          <p className="text-center text-muted mt-4 mb-0">
            Zaten hesabınız var mı?{' '}
            <Link href="/login" className="text-decoration-none">
              Giriş yapın
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
