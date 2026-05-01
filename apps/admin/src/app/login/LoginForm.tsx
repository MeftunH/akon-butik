'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  password: z.string().min(1, 'Şifrenizi girin'),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

/**
 * Admin login. Markup follows the vendor `s-log` form-login pattern from
 * `components/other-pages/Login.tsx` — same `password-wrapper` toggle, same
 * `tf-btn animate-btn` submit, same `check-bottom` row for "remember me".
 *
 * The right column is admin-specific (no shopping voucher copy); it shows
 * an explicit "authorized users only" notice instead of the storefront's
 * register CTA. Auth flow is unchanged: POST /api/admin/auth/login.
 */
export function LoginForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }),
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
    <>
      <div className="tf-topbar bg-black">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="topbar-left">
                <h6 className="text-up text-white fw-normal text-line-clamp-1">
                  Akon Butik Yönetim Paneli — yalnızca yetkili kullanıcılar için.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="tf-header header-fix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 col-6">
              <Link href="/" className="logo-site">
                <span className="brand-text fs-4 fw-bold">AKON BUTİK · ADMIN</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">Giriş</h1>
            <ul className="breadcrumbs-page">
              <li>
                <span className="h6 link">Akon Admin</span>
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
          <div className="s-log">
            <div className="col-left">
              <h1 className="heading">Yönetici Girişi</h1>
              <p className="h6 text-sub text-main">
                Akon Butik admin paneline erişmek için yetkili e-posta ve şifrenizi girin.
              </p>
              <form className="form-login" onSubmit={(e) => void onSubmit(e)} noValidate>
                <div className="list-ver">
                  <fieldset>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="E-posta adresiniz *"
                      aria-label="E-posta"
                      aria-invalid={Boolean(formState.errors.email)}
                      {...register('email')}
                    />
                    {formState.errors.email && (
                      <small className="text-danger d-block mt-2">
                        {formState.errors.email.message}
                      </small>
                    )}
                  </fieldset>
                  <fieldset className="password-wrapper mb-8">
                    <input
                      className="password-field"
                      type={showPass ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Şifre *"
                      aria-label="Şifre"
                      aria-invalid={Boolean(formState.errors.password)}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowPass((prev) => !prev);
                      }}
                      className={`toggle-pass btn-reset ${
                        showPass ? 'icon-view' : 'icon-show-password'
                      }`}
                      aria-label={showPass ? 'Şifreyi gizle' : 'Şifreyi göster'}
                    />
                    {formState.errors.password && (
                      <small className="text-danger d-block mt-2">
                        {formState.errors.password.message}
                      </small>
                    )}
                  </fieldset>
                  <div className="check-bottom">
                    <div className="checkbox-wrap">
                      <input
                        id="remember"
                        type="checkbox"
                        className="tf-check"
                        {...register('remember')}
                      />
                      <label htmlFor="remember" className="h6">
                        Beni Hatırla
                      </label>
                    </div>
                    <h6 className="text-muted">Yetkili erişim</h6>
                  </div>
                </div>

                {submitError && (
                  <div className="alert alert-danger mt-4 mb-0" role="alert">
                    <span className="h6 fw-normal">{submitError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="tf-btn animate-btn w-100 mt-4"
                  disabled={submitting}
                >
                  {submitting ? 'Giriş yapılıyor…' : 'Giriş Yap'}
                </button>
              </form>
            </div>

            <div className="col-right">
              <h1 className="heading">Yetkili Erişim</h1>
              <p className="h6 text-sub">
                Bu giriş ekranı yalnızca Akon Butik personelinin yönetim paneline erişimi için
                tasarlanmıştır. Müşteri girişi için lütfen mağaza sitesini kullanın.
              </p>
              <div className="get-discout-wrap">
                <h6 className="fw-semibold mb-16">Hesabınız mı yok?</h6>
                <div className="box-discount style-2">
                  <div className="discount-top">
                    <div className="discount-off">
                      <p className="h6">Erişim</p>
                      <h6 className="sale-off h6 fw-bold">YETKİLİ</h6>
                    </div>
                    <div className="discount-from">
                      <p className="h6">
                        Admin hesabı yalnızca <br className="d-sm-none" />
                        yönetim tarafından açılır
                      </p>
                    </div>
                  </div>
                  <div className="discount-bot">
                    <h6 className="text-nowrap fw-bold">İletişim: yonetim@akonbutik.com</h6>
                    <Link href="/" className="tf-btn animate-btn w-100 fw-bold">
                      Mağazaya Dön
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
