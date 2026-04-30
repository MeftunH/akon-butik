'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? 'Giriş yapılamadı');
      }
      router.push('/');
      router.refresh();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
      setSubmitting(false);
    }
  });

  return (
    <main className="login-shell">
      <form className="login-card" onSubmit={(e) => void onSubmit(e)} noValidate>
        <h1 className="h4 fw-bold mb-1">Akon Admin</h1>
        <p className="text-muted small mb-4">Yönetim paneline giriş yapın</p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
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
          <label htmlFor="password" className="form-label">
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
    </main>
  );
}
