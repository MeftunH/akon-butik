'use client';

import { useState, type FormEvent } from 'react';

export interface NewsletterFormProps {
  endpoint?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Newsletter signup. Posts to the Ocaka-compatible Brevo proxy by default
 * but can be pointed at any JSON endpoint accepting `{ email }`.
 */
export function NewsletterForm({
  endpoint = 'https://express-brevomail.vercel.app/api/contacts',
  placeholder = 'E-posta adresiniz',
  buttonLabel = 'Abone Ol',
  successMessage = 'Teşekkürler — listeye eklendiniz.',
  errorMessage = 'Bir hata oluştu, lütfen tekrar deneyin.',
}: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-newsletter">
      <fieldset className="d-flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder={placeholder}
          className="form-control"
          aria-label={placeholder}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'sending'}
        >
          {buttonLabel}
        </button>
      </fieldset>
      {status === 'ok' && <p className="text-success small mt-2">{successMessage}</p>}
      {status === 'error' && <p className="text-danger small mt-2">{errorMessage}</p>}
    </form>
  );
}
