'use client';

import { useCart } from '@akonbutik/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  password: z.string().min(1, 'Şifrenizi girin'),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { refresh: refreshCart } = useCart();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? 'Giriş yapılamadı');
      }
      await refreshCart();
      const next = search.get('next');
      router.push(next?.startsWith('/') ? next : '/account');
      router.refresh();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
      setSubmitting(false);
    }
  });

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h1 className="h3 fw-bold mb-4 text-center">Giriş Yap</h1>
          <form onSubmit={(e) => void onSubmit(e)} noValidate>
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
              <label className="form-label" htmlFor="password">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="form-control"
                {...register('password')}
              />
              {formState.errors.password && (
                <small className="text-danger">{formState.errors.password.message}</small>
              )}
            </div>
            {submitError && (
              <p className="text-danger small mb-3" role="alert">
                {submitError}
              </p>
            )}
            <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
              {submitting ? 'Giriş yapılıyor…' : 'Giriş Yap'}
            </button>
          </form>
          <p className="text-center text-muted mt-4 mb-0">
            Hesabınız yok mu?{' '}
            <Link href="/register" className="text-decoration-none">
              Kayıt olun
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
