'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

import styles from '../../settings.module.scss';

export interface AnnouncementValues {
  message: string;
  linkUrl: string;
  linkLabel: string;
  enabled: boolean;
}

interface AnnouncementFormProps {
  initial: AnnouncementValues;
  updatedAt: string;
}

type SaveTone = 'idle' | 'success' | 'error';

/**
 * Client form for the duyuru bandı. Submits the full payload via PUT to
 * `/api/admin/settings/announcement` (rewritten to the API by next.config).
 * Validation rules:
 *   - if `enabled` is true, `message` is required
 *   - if `linkUrl` is filled, `linkLabel` must also be filled (and vice versa)
 *
 * On success, the form refreshes the RSC tree so any other dashboard
 * surface that reads the announcement (and the storefront once revalidated)
 * picks up the change.
 */
export function AnnouncementForm({ initial, updatedAt }: AnnouncementFormProps): React.JSX.Element {
  const router = useRouter();
  const [values, setValues] = useState<AnnouncementValues>(initial);
  const [busy, setBusy] = useState(false);
  const [tone, setTone] = useState<SaveTone>('idle');
  const [statusText, setStatusText] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof AnnouncementValues, string>>>({});

  const set = <K extends keyof AnnouncementValues>(key: K, value: AnnouncementValues[K]): void => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next: Partial<Record<keyof AnnouncementValues, string>> = {};
      for (const k of Object.keys(prev) as (keyof AnnouncementValues)[]) {
        if (k !== key && prev[k]) next[k] = prev[k];
      }
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof AnnouncementValues, string>> = {};
    const trimmed = {
      message: values.message.trim(),
      linkUrl: values.linkUrl.trim(),
      linkLabel: values.linkLabel.trim(),
    };
    if (values.enabled && trimmed.message.length === 0) {
      nextErrors.message = 'Yayında bir duyuru için mesaj gerekli';
    }
    if (trimmed.linkUrl.length > 0 && trimmed.linkLabel.length === 0) {
      nextErrors.linkLabel = 'Bağlantı için bir CTA etiketi gerekli';
    }
    if (trimmed.linkLabel.length > 0 && trimmed.linkUrl.length === 0) {
      nextErrors.linkUrl = 'CTA etiketi için bir bağlantı gerekli';
    }
    if (trimmed.linkUrl.length > 0 && !/^https?:\/\//.test(trimmed.linkUrl)) {
      nextErrors.linkUrl = 'Bağlantı http(s) ile başlamalı';
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setTone('error');
      setStatusText('Kaydetmeden önce alanları kontrol edin');
      return;
    }

    setBusy(true);
    setTone('idle');
    setStatusText('');
    try {
      const res = await fetch('/api/admin/settings/announcement', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: trimmed.message.length > 0 ? trimmed.message : null,
          linkUrl: trimmed.linkUrl.length > 0 ? trimmed.linkUrl : null,
          linkLabel: trimmed.linkLabel.length > 0 ? trimmed.linkLabel : null,
          enabled: values.enabled,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? `Kaydedilemedi (${res.status.toString()})`);
      }
      setTone('success');
      setStatusText('Duyuru güncellendi. Mağaza 60 saniye içinde yansıtacak.');
      router.refresh();
    } catch (err) {
      setTone('error');
      setStatusText(err instanceof Error ? err.message : 'Beklenmeyen bir hata');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.formCard} noValidate>
      <div className={styles.toggleRow}>
        <span className={styles.toggleControl}>
          <input
            id="ann-enabled"
            className={styles.toggleInput}
            type="checkbox"
            checked={values.enabled}
            aria-labelledby="ann-enabled-label ann-enabled-hint"
            onChange={(e) => {
              set('enabled', e.target.checked);
            }}
          />
          <span className={styles.toggleTrack} aria-hidden />
          <span className={styles.toggleThumb} aria-hidden />
        </span>
        <label htmlFor="ann-enabled" className={styles.toggleMeta}>
          <span id="ann-enabled-label" className={styles.toggleLabel}>
            Yayında
          </span>
          <span id="ann-enabled-hint" className={styles.toggleHint}>
            Kapalıyken storefront duyuru bandını hiç render etmez.
          </span>
        </label>
      </div>

      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel} htmlFor="ann-message">
          Mesaj
        </label>
        <textarea
          id="ann-message"
          className={styles.textarea}
          value={values.message}
          maxLength={240}
          placeholder="Akon Butik · Çark Caddesi, Sakarya. 450₺ üzeri kargo ücretsiz."
          onChange={(e) => {
            set('message', e.target.value);
          }}
        />
        <p className={styles.fieldHint}>Tek satırda okunması için 120 karakteri aşmayın.</p>
        {errors.message ? <p className={styles.errorText}>{errors.message}</p> : null}
      </div>

      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel} htmlFor="ann-link-url">
          Bağlantı (opsiyonel)
        </label>
        <input
          id="ann-link-url"
          className={styles.input}
          type="url"
          inputMode="url"
          value={values.linkUrl}
          maxLength={500}
          placeholder="https://..."
          onChange={(e) => {
            set('linkUrl', e.target.value);
          }}
        />
        {errors.linkUrl ? <p className={styles.errorText}>{errors.linkUrl}</p> : null}
      </div>

      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel} htmlFor="ann-link-label">
          CTA etiketi (opsiyonel)
        </label>
        <input
          id="ann-link-label"
          className={styles.input}
          type="text"
          value={values.linkLabel}
          maxLength={60}
          placeholder="İncele"
          onChange={(e) => {
            set('linkLabel', e.target.value);
          }}
        />
        <p className={styles.fieldHint}>
          Doldurulduğunda mesajın yanında küçük bir bağlantı olarak görünür.
        </p>
        {errors.linkLabel ? <p className={styles.errorText}>{errors.linkLabel}</p> : null}
      </div>

      <div className={styles.actionsRow}>
        <span className={styles.statusLine} data-tone={tone}>
          {statusText ? statusText : `Son güncelleme: ${formatDateTr(updatedAt)}`}
        </span>
        <button type="submit" className={styles.submit} disabled={busy}>
          {busy ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}

function formatDateTr(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime()) || d.getTime() === 0) return 'henüz kaydedilmedi';
  return d.toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
