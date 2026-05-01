'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/**
 * Public contact form. Mirrors the API DTO bounds 1:1 so client and
 * server reject the same payloads — a length change here is meaningless
 * unless `apps/api/src/modules/contact/dto/contact-message.dto.ts` is
 * updated in lock-step.
 */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Adınızı yazın (en az 2 karakter)')
    .max(80, 'Ad en fazla 80 karakter olabilir'),
  email: z.string().trim().email('Geçerli bir e-posta girin'),
  subject: z
    .string()
    .trim()
    .min(4, 'Konuyu yazın (en az 4 karakter)')
    .max(120, 'Konu en fazla 120 karakter olabilir'),
  message: z
    .string()
    .trim()
    .min(10, 'Mesajınızı yazın (en az 10 karakter)')
    .max(2000, 'Mesaj en fazla 2000 karakter olabilir'),
  kvkkConsent: z.literal<true>(true, {
    errorMap: () => ({ message: 'KVKK aydınlatma metnini onaylayın' }),
  }),
});

type ContactValues = z.infer<typeof contactSchema>;

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'ok' }
  | { kind: 'error'; message: string };

/**
 * Contact form. Validates client-side via zod, posts to the storefront
 * `/api/contact` rewrite (proxied to the NestJS controller), and renders
 * inline aria-live feedback rather than a toast — keeps the success and
 * error path readable to assistive tech and visible without scroll.
 */
export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ kind: 'idle' });

  const { register, handleSubmit, formState, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      // Cast: the schema requires literal `true`, but the unchecked initial
      // state is `false`. The validator surfaces the proper error message
      // when the user submits without ticking the box.
      kvkkConsent: false as unknown as true,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setState({ kind: 'submitting' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        const fallback =
          res.status === 429
            ? 'Çok fazla istek aldık. Lütfen bir dakika sonra tekrar deneyin.'
            : 'Mesaj gönderilemedi, lütfen az sonra tekrar deneyin.';
        throw new Error(body?.message ?? fallback);
      }
      reset();
      setState({ kind: 'ok' });
    } catch (err) {
      setState({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu.',
      });
    }
  });

  const submitting = state.kind === 'submitting';

  return (
    <section className="s-contact-form flat-spacing">
      <div className="container">
        <div className="sect-title text-center mb-5">
          <p className="h2 title fw-normal mb-2">Bize yazın.</p>
          <p className="s-subtitle h6 text-main-2 mb-0">
            Sorularınızı, işbirliği tekliflerinizi veya iadelerle ilgili talepleri
            doldurabileceğiniz bir form. Genelde 1 iş günü içinde dönüş yaparız.
          </p>
        </div>

        <form
          className="form-contact-2"
          onSubmit={(e) => void onSubmit(e)}
          noValidate
          aria-describedby="contact-form-status"
        >
          <div className="form-content">
            <div className="tf-grid-layout md-col-2 gap-3">
              <fieldset>
                <label className="form-label" htmlFor="contact-name">
                  Ad Soyad
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  className="form-control"
                  placeholder="Adınız"
                  {...register('name')}
                />
                {formState.errors.name && (
                  <small className="text-danger" role="alert">
                    {formState.errors.name.message}
                  </small>
                )}
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="contact-email">
                  E-posta
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  className="form-control"
                  placeholder="ornek@akonbutik.com"
                  {...register('email')}
                />
                {formState.errors.email && (
                  <small className="text-danger" role="alert">
                    {formState.errors.email.message}
                  </small>
                )}
              </fieldset>
            </div>

            <fieldset className="mt-3">
              <label className="form-label" htmlFor="contact-subject">
                Konu
              </label>
              <input
                id="contact-subject"
                type="text"
                className="form-control"
                placeholder="Sipariş, iade, işbirliği…"
                {...register('subject')}
              />
              {formState.errors.subject && (
                <small className="text-danger" role="alert">
                  {formState.errors.subject.message}
                </small>
              )}
            </fieldset>

            <fieldset className="mt-3">
              <label className="form-label" htmlFor="contact-message">
                Mesajınız
              </label>
              <textarea
                id="contact-message"
                className="form-control"
                placeholder="Bize iletmek istediklerinizi yazın."
                rows={6}
                {...register('message')}
              />
              {formState.errors.message && (
                <small className="text-danger" role="alert">
                  {formState.errors.message.message}
                </small>
              )}
            </fieldset>

            <fieldset className="mt-3">
              <div className="form-check d-flex align-items-start gap-2">
                <input
                  id="contact-kvkk"
                  type="checkbox"
                  className="form-check-input mt-1"
                  {...register('kvkkConsent')}
                />
                <label htmlFor="contact-kvkk" className="form-check-label small">
                  Form aracılığıyla ilettiğim kişisel verilerimin{' '}
                  <Link href="/kvkk" className="link">
                    KVKK Aydınlatma Metni
                  </Link>{' '}
                  kapsamında işlenmesini kabul ediyorum.
                </label>
              </div>
              {formState.errors.kvkkConsent && (
                <small className="text-danger d-block mt-1" role="alert">
                  {formState.errors.kvkkConsent.message}
                </small>
              )}
            </fieldset>
          </div>

          <div
            id="contact-form-status"
            className="form_message mt-3"
            role="status"
            aria-live="polite"
          >
            {state.kind === 'ok' && (
              <p className="text-success small mb-0">
                Mesajınız iletildi. En kısa sürede dönüş yapacağız.
              </p>
            )}
            {state.kind === 'error' && <p className="text-danger small mb-0">{state.message}</p>}
          </div>

          <div className="form-action mt-4">
            <button type="submit" className="h6 tf-btn animate-btn" disabled={submitting}>
              {submitting ? 'Gönderiliyor…' : 'Mesajı Gönder'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
