'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoginVisual } from './_components/LoginVisual';
import styles from './LoginForm.module.scss';

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  password: z.string().min(1, 'Şifrenizi girin'),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

const LAST_EMAIL_KEY = 'akonbutik.admin.last_email';
const CONTACT_EMAIL = 'yonetim@akonbutik.com';

/**
 * Map server-side auth failure messages (and a few well-known status codes)
 * into clear Turkish guidance. Keeps the language specific so a tired store
 * manager at midnight knows whether to try again or call IT.
 */
function mapAuthError(status: number, raw: string | undefined): string {
  if (status === 401) return 'E-posta veya şifre hatalı.';
  if (status === 403) return 'Bu hesap askıya alınmış. Lütfen yöneticinizle görüşün.';
  if (status === 429) return 'Çok fazla deneme yapıldı. Birkaç dakika sonra yeniden deneyin.';
  if (status >= 500) return 'Sunucuya ulaşılamıyor. Birazdan tekrar deneyin.';
  if (raw && /password|email/i.test(raw)) return 'E-posta veya şifre hatalı.';
  return 'Giriş tamamlanamadı. Bağlantınızı kontrol edip tekrar deneyin.';
}

/**
 * Editorial admin login. Two-column composition: form column on the left,
 * a brand-tinted CSS visual rail on the right (collapses above the form
 * on narrow viewports). No vendor s-log markup here — the vendor pattern
 * is calibrated for storefront sign-up which carries different copy and
 * weight. We lean instead on a colocated SCSS module.
 */
export function LoginForm(): React.JSX.Element {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState, setValue, watch } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  });

  // Restore last-used admin email on mount so frequent users land on a
  // half-filled form. localStorage only — no cookies, no fingerprinting.
  useEffect(() => {
    try {
      const remembered = window.localStorage.getItem(LAST_EMAIL_KEY);
      if (remembered) setValue('email', remembered, { shouldValidate: false });
    } catch {
      // private mode / disabled storage — silently skip
    }
  }, [setValue]);

  const emailValue = watch('email');

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
        throw Object.assign(new Error(body?.message ?? 'auth_failed'), { status: res.status });
      }

      if (values.remember) {
        try {
          window.localStorage.setItem(LAST_EMAIL_KEY, values.email);
        } catch {
          /* storage unavailable */
        }
      } else {
        try {
          window.localStorage.removeItem(LAST_EMAIL_KEY);
        } catch {
          /* storage unavailable */
        }
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      const status = (err as { status?: number }).status ?? 0;
      const raw = err instanceof Error ? err.message : undefined;
      setSubmitError(mapAuthError(status, raw));
      setSubmitting(false);
    }
  });

  const emailInvalid = Boolean(formState.errors.email);
  const passwordInvalid = Boolean(formState.errors.password);

  return (
    <main className={styles.shell}>
      <section className={styles.formColumn}>
        <div className={styles.brandStrip}>
          <Link href="/" className={styles.brandWordmark}>
            AKON BUTİK<em>·</em>YÖNETİM
          </Link>
          <span className={styles.brandLabel}>Admin Console</span>
        </div>

        <div className={styles.formInner}>
          <header className={styles.heading}>
            <span className={styles.eyebrow}>Yetkili giriş</span>
            <h1 className={styles.title}>İyi çalışmalar.</h1>
            <p className={styles.lede}>
              Kataloğu, sipariş akışını ve DIA senkronlarını tek panelden yönetmek için kurumsal
              hesabınıza giriş yapın.
            </p>
          </header>

          <form className={styles.form} onSubmit={(e) => void onSubmit(e)} noValidate>
            <div className={styles.fieldRow}>
              <label htmlFor="login-email" className={styles.fieldLabel}>
                E-posta
              </label>
              <div className={styles.fieldShell} data-invalid={emailInvalid}>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  className={styles.input}
                  placeholder="ad.soyad@akonbutik.com"
                  aria-invalid={emailInvalid}
                  aria-describedby={emailInvalid ? 'login-email-err' : undefined}
                  {...register('email')}
                />
              </div>
              {emailInvalid && (
                <span id="login-email-err" className={styles.fieldHint} role="alert">
                  {formState.errors.email?.message}
                </span>
              )}
            </div>

            <div className={styles.fieldRow}>
              <label htmlFor="login-password" className={styles.fieldLabel}>
                Şifre
              </label>
              <div className={styles.fieldShell} data-invalid={passwordInvalid}>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  spellCheck={false}
                  className={styles.input}
                  placeholder="••••••••"
                  aria-invalid={passwordInvalid}
                  aria-describedby={passwordInvalid ? 'login-password-err' : undefined}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPass((prev) => !prev);
                  }}
                  className={styles.revealButton}
                  aria-label={showPass ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  aria-pressed={showPass}
                >
                  <i
                    className={`icon ${showPass ? 'icon-view' : 'icon-show-password'}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
              {passwordInvalid && (
                <span id="login-password-err" className={styles.fieldHint} role="alert">
                  {formState.errors.password?.message}
                </span>
              )}
            </div>

            <div className={styles.row}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} {...register('remember')} />
                Bu cihazda e-postamı hatırla
              </label>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Akon Butik Admin · Şifre Yardımı`}
                className={styles.contactLink}
              >
                Şifrenizi mi unuttunuz?
              </a>
            </div>

            <div role="alert" aria-live="polite" aria-atomic="true">
              {submitError && (
                <div className={styles.alert}>
                  <i className={`icon icon-x ${styles.alertIcon}`} aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}
            </div>

            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? 'Doğrulanıyor' : 'Giriş Yap'}
              <span className={styles.submitArrow} aria-hidden="true">
                →
              </span>
            </button>
          </form>

          <p className={styles.footnote}>
            Bu panel yalnızca Akon Butik personeli içindir. Müşteri girişi için{' '}
            <Link href="/">mağaza sitesini</Link> kullanın. Erişim sorunları için{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            {emailValue && (
              <>
                {' '}
                Son giriş: <span suppressHydrationWarning>{emailValue}</span>.
              </>
            )}
          </p>
        </div>

        <div className={styles.bottomStrip}>
          <span>Akon Butik · İstanbul</span>
          <Link href="/" target="_blank" rel="noreferrer">
            Mağazaya dön
          </Link>
        </div>
      </section>

      <LoginVisual />
    </main>
  );
}
