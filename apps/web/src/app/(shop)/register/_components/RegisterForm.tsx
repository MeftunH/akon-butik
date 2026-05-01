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

/**
 * Storefront register page — same vendor `s-log > col-left > heading +
 * form-login` shell as LoginForm. Adds Akon-specific fields (adSoyad,
 * telefon required, KVKK consent gating submit) on top of the email +
 * password baseline.
 */
export function RegisterForm() {
  const router = useRouter();
  const { refresh: refreshCart } = useCart();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <>
      <section className="s-page-title">
        <div className="container">
          <div className="content">
            <h1 className="title-page">Hesap Oluştur</h1>
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
                <h6 className="current-page fw-normal">Kayıt</h6>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flat-spacing">
        <div className="container">
          <div className="s-log row justify-content-center">
            <div className="col-left col-md-8 col-lg-6">
              <h2 className="heading h3 fw-bold mb-4">Yeni Hesap Oluştur</h2>
              <form className="form-login" onSubmit={(e) => void onSubmit(e)} noValidate>
                <div className="list-ver d-flex flex-column gap-3">
                  <fieldset>
                    <label className="form-label" htmlFor="reg-adSoyad">
                      Ad Soyad
                    </label>
                    <input
                      id="reg-adSoyad"
                      autoComplete="name"
                      className="form-control"
                      placeholder="Ayşe Yılmaz"
                      {...register('adSoyad')}
                    />
                    {formState.errors.adSoyad && (
                      <small className="text-danger">{formState.errors.adSoyad.message}</small>
                    )}
                  </fieldset>

                  <fieldset>
                    <label className="form-label" htmlFor="reg-email">
                      E-posta
                    </label>
                    <input
                      id="reg-email"
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

                  <fieldset>
                    <label className="form-label" htmlFor="reg-telefon">
                      Cep Telefonu
                    </label>
                    <input
                      id="reg-telefon"
                      autoComplete="tel"
                      className="form-control"
                      placeholder="0555 123 45 67"
                      {...register('telefon')}
                    />
                    {formState.errors.telefon && (
                      <small className="text-danger">{formState.errors.telefon.message}</small>
                    )}
                  </fieldset>

                  <fieldset className="password-wrapper position-relative">
                    <label className="form-label" htmlFor="reg-password">
                      Şifre
                    </label>
                    <input
                      id="reg-password"
                      className="password-field form-control"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="En az 10 karakter"
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
                    <small className="text-main-2">Güvenliğiniz için en az 10 karakter.</small>
                    {formState.errors.password && (
                      <div>
                        <small className="text-danger">{formState.errors.password.message}</small>
                      </div>
                    )}
                  </fieldset>

                  <div className="checkbox-wrap d-flex align-items-start gap-2">
                    <input
                      id="kvkkAccepted"
                      type="checkbox"
                      className="tf-check form-check-input mt-1"
                      {...register('kvkkAccepted')}
                    />
                    <label htmlFor="kvkkAccepted" className="h6 mb-0">
                      <Link href="/kvkk" target="_blank" className="link text-decoration-underline">
                        KVKK Aydınlatma Metnini
                      </Link>{' '}
                      ve{' '}
                      <Link
                        href="/kullanim-kosullari"
                        target="_blank"
                        className="link text-decoration-underline"
                      >
                        Kullanım Koşullarını
                      </Link>{' '}
                      okudum, onaylıyorum.
                    </label>
                  </div>
                  {formState.errors.kvkkAccepted && (
                    <small className="text-danger">{formState.errors.kvkkAccepted.message}</small>
                  )}
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
                  {submitting ? 'Hesap oluşturuluyor…' : 'Hesap Oluştur'}
                  {!submitting && <i className="icon icon-arrow-right ms-2" />}
                </button>
              </form>

              <p className="text-center text-main-2 mt-4 mb-0">
                Zaten hesabınız var mı?{' '}
                <Link href="/login" className="link fw-semibold">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
