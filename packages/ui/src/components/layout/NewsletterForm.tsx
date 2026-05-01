'use client';

import Link from 'next/link';
import { useState, type SyntheticEvent } from 'react';

export interface NewsletterFormProps {
  /** Submit URL. Defaults to a no-op success — the storefront doesn't yet
   *  ship a real subscriber backend; wire to /api/newsletter when it lands. */
  endpoint?: string;
  isBgDark?: boolean;
}

/**
 * Newsletter signup. Direct port of vendor `footers/NewsLetterForm.tsx`:
 * `form_sub has_check` shell with the `f-content` row (input + submit
 * button), GDPR/KVKK checkbox, and the `tfSubscribeMsg` flash slot — same
 * vendor classes, so `_form.scss` styles it without override.
 */
export function NewsletterForm({ endpoint, isBgDark = false }: NewsletterFormProps) {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const flash = (): void => {
    setShowMessage(true);
    window.setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const raw = data.get('email');
    const email = typeof raw === 'string' ? raw.trim() : '';
    if (!email) return;

    if (!endpoint) {
      // No backend wired yet — give the user a positive ack so the form
      // doesn't sit dead. Replace this branch when /api/newsletter lands.
      form.reset();
      setSuccess(true);
      flash();
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        form.reset();
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch {
      setSuccess(false);
    }
    flash();
  };

  return (
    <form className="form_sub has_check" id="subscribe-form" onSubmit={(e) => void onSubmit(e)}>
      <div className="f-content" id="subscribe-content">
        <fieldset className="col">
          <input
            className={isBgDark ? 'style-stroke-2' : 'style-stroke'}
            id="subscribe-email"
            type="email"
            name="email"
            placeholder="E-posta adresiniz"
            required
          />
        </fieldset>
        <button
          id="subscribe-button"
          type="submit"
          className={`tf-btn animate-btn type-small-2 ${isBgDark ? 'btn-white animate-dark' : ''}`}
        >
          Abone Ol
          <i className="icon icon-arrow-right" />
        </button>
      </div>

      <div className="checkbox-wrap">
        <input
          id="newsletter-consent"
          type="checkbox"
          className={`tf-check style-3 ${isBgDark ? 'style-white' : ''}`}
        />
        <label htmlFor="newsletter-consent" className={`h6 ${isBgDark ? 'text-main-5' : ''}`}>
          Abone olarak&nbsp;
          <Link
            href="/kvkk"
            className={`text-decoration-underline link ${isBgDark ? 'text-main-5' : ''}`}
          >
            KVKK Aydınlatma Metnini
          </Link>{' '}
          ve{' '}
          <Link
            href="/cerezler"
            className={`text-decoration-underline link ${isBgDark ? 'text-main-5' : ''}`}
          >
            Çerez Politikasını
          </Link>{' '}
          kabul etmiş olursunuz.
        </label>
      </div>

      <div id="subscribe-msg">
        <div className={`tfSubscribeMsg footer-sub-element ${showMessage ? 'active' : ''}`}>
          {success ? (
            <p style={{ color: 'rgb(52, 168, 83)' }}>Listeye eklendiniz, teşekkürler.</p>
          ) : (
            <p style={{ color: 'red' }}>Bir hata oluştu, lütfen tekrar deneyin.</p>
          )}
        </div>
      </div>
    </form>
  );
}
