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

/**
 * Storefront login page — mirrors vendor `other-pages/Login.tsx`'s
 * `s-log > col-left > heading + form-login` layout. We drop the demo's
 * social-sign-in column (we don't ship Google/Facebook OAuth) and the
 * right-side promo block (no current campaign asset) — what's left is
 * the email + password fieldset with a `password-wrapper` show/hide
 * toggle, a "Beni Hatırla" checkbox, and a "Şifremi Unuttum" link
 * stub (Phase 6 email-reset flow).
 */
export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { refresh: refreshCart } = useCart();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <>
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">Giriş Yap</h1>
            <ul className="breadcrumbs-page">
              <li>
                <Link href="/" className="h6 link">
                  Ana Sayfa
                </Link>
              </li>
              <li className="d-flex">
                <i className="icon icon-caret-right" />
              </li>
              <li>
                <h6 className="current-page fw-normal">Giriş</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flat-spacing">
        <div className="container">
          <div className="s-log row justify-content-center">
            <div className="col-left col-md-7 col-lg-5">
              <h2 className="heading h3 fw-bold mb-4">Hesabınıza Giriş Yapın</h2>
              <form className="form-login" onSubmit={(e) => void onSubmit(e)} noValidate>
                <div className="list-ver d-flex flex-column gap-3">
                  <fieldset>
                    <label className="form-label" htmlFor="login-email">
                      E-posta
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      className="form-control"
                      placeholder="ornek@akonbutik.com"
                      {...register('email')}
                    />
                    {formState.errors.email && (
                      <small className="text-danger">{formState.errors.email.message}</small>
                    )}
                  </fieldset>

                  <fieldset className="password-wrapper position-relative">
                    <label className="form-label" htmlFor="login-password">
                      Şifre
                    </label>
                    <input
                      id="login-password"
                      className="password-field form-control"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...register('password')}
                    />
                    <button
                      type="button"
                      className={`toggle-pass btn-reset position-absolute end-0 top-0 mt-4 me-3 ${
                        showPassword ? 'icon-view' : 'icon-show-password'
                      }`}
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                    />
                    {formState.errors.password && (
                      <small className="text-danger">{formState.errors.password.message}</small>
                    )}
                  </fieldset>

                  <div className="check-bottom d-flex justify-content-between align-items-center">
                    <div className="checkbox-wrap d-flex align-items-center gap-2">
                      <input id="remember" type="checkbox" className="tf-check form-check-input" />
                      <label htmlFor="remember" className="h6 mb-0">
                        Beni Hatırla
                      </label>
                    </div>
                    <h6 className="mb-0">
                      <Link href="/sifre-sifirla" className="link text-main-2">
                        Şifremi Unuttum
                      </Link>
                    </h6>
                  </div>
                </div>

                {submitError && (
                  <p className="text-danger small mt-3 mb-0" role="alert">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  className="tf-btn animate-btn w-100 fw-semibold mt-4"
                  disabled={submitting}
                >
                  {submitting ? 'Giriş yapılıyor…' : 'Giriş Yap'}
                  {!submitting && <i className="icon icon-arrow-right ms-2" />}
                </button>
              </form>

              <p className="text-center text-main-2 mt-4 mb-0">
                Hesabınız yok mu?{' '}
                <Link href="/register" className="link fw-semibold">
                  Kayıt Olun
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
