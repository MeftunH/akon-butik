'use client';

import { useId, useRef, useState } from 'react';

import styles from './InlineCreateSelect.module.scss';

export interface InlineCreateOption {
  id: string;
  label: string;
}

export interface InlineCreateSelectProps {
  /** Currently selected option id, or '' for "unassigned". */
  value: string;
  /** Called whenever the user picks a different option, including newly created ones. */
  onChange: (value: string) => void;
  options: readonly InlineCreateOption[];
  /** Visible label rendered above the field. */
  label: string;
  /** Empty-row label, e.g. "Atanmadı" for unassigned. */
  emptyLabel: string;
  /** Trigger copy for the create affordance, e.g. "Yeni marka ekle". */
  createLabel: string;
  /** Placeholder for the inline name input. */
  createPlaceholder: string;
  /**
   * Endpoint to POST the new entity to. The component sends a JSON body
   * shaped via `buildCreateBody(name)`; the response must include
   * `id` plus enough info to be derived back to a label via
   * `deriveLabel`.
   */
  createEndpoint: string;
  buildCreateBody: (name: string) => Record<string, unknown>;
  deriveLabel: (created: unknown) => string;
  /** Called after a successful create so the parent can refetch / merge options. */
  onCreated: (created: { id: string; label: string }) => void;
}

/**
 * Select with an inline-create row: when the operator clicks the
 * "+ Yeni X ekle" trigger, the select swaps for a single-line form
 * that POSTs to the API and immediately selects the new entity. No
 * modal, no page navigation, the operator stays in the form.
 *
 * Rationale: brands and categories are master data the akonbutik team
 * curates by hand (the DIA tenant doesn't ship marka/kategori master
 * tables). A modal-based "manage taxonomy" page would be overkill for
 * a two-person team that creates a new brand maybe twice a month.
 */
export function InlineCreateSelect({
  value,
  onChange,
  options,
  label,
  emptyLabel,
  createLabel,
  createPlaceholder,
  createEndpoint,
  buildCreateBody,
  deriveLabel,
  onCreated,
}: InlineCreateSelectProps) {
  const fieldId = useId();
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startCreate = (): void => {
    setError(null);
    setDraft('');
    setCreating(true);
    // Defer focus to next tick so the input is mounted.
    queueMicrotask(() => inputRef.current?.focus());
  };

  const cancelCreate = (): void => {
    setCreating(false);
    setDraft('');
    setError(null);
  };

  const submitCreate = async (): Promise<void> => {
    const name = draft.trim();
    if (name.length < 2) {
      setError('Ad en az 2 karakter olmalı');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(createEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(buildCreateBody(name)),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? `Oluşturulamadı (${res.status.toString()})`);
      }
      const created = (await res.json()) as { id?: string };
      if (typeof created.id !== 'string') {
        throw new Error('Sunucu yanıtı geçersiz: id eksik');
      }
      const newOption = { id: created.id, label: deriveLabel(created) };
      onCreated(newOption);
      onChange(newOption.id);
      setCreating(false);
      setDraft('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen hata');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId}>{label}</label>

      {creating ? (
        <div className={styles.createRow}>
          <input
            ref={inputRef}
            id={fieldId}
            type="text"
            value={draft}
            placeholder={createPlaceholder}
            onChange={(e) => {
              setDraft(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void submitCreate();
              } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelCreate();
              }
            }}
            disabled={submitting}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${fieldId}-err` : undefined}
          />
          <button
            type="button"
            className={styles.saveButton}
            onClick={() => void submitCreate()}
            disabled={submitting || draft.trim().length < 2}
          >
            {submitting ? 'Kaydediliyor' : 'Kaydet'}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={cancelCreate}
            disabled={submitting}
          >
            Vazgeç
          </button>
        </div>
      ) : (
        <select
          id={fieldId}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          <option value="">{emptyLabel}</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {error ? (
        <span id={`${fieldId}-err`} className={styles.error} role="alert">
          {error}
        </span>
      ) : !creating ? (
        <button type="button" className={styles.trigger} onClick={startCreate}>
          {createLabel}
        </button>
      ) : null}
    </div>
  );
}
