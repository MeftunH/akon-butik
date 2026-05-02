'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';

import styles from './dashboard.module.scss';
import { formatNumber } from './format';

interface OperatorShortcutsProps {
  needsReviewCount: number;
}

interface SyncFeedback {
  tone: 'idle' | 'ok' | 'error';
  message: string;
}

/**
 * Operator shortcuts row. Three muscle-memory destinations the dashboard
 * surfaces because they're the operator's daily start-of-shift checklist:
 *
 *   1. Yeni ürün ekle — disabled stub. The "create product" wizard ships
 *      separately; we keep the affordance so the row keeps its rhythm and
 *      operators learn where the action will live.
 *   2. DIA senkronu başlat — POSTs `/api/admin/sync/products`. We do this
 *      from the client (use client + transition) so the operator gets a
 *      tactile confirmation without a full reload, and surface a quiet
 *      inline message instead of a noisy modal.
 *   3. İncelenmesi gerekenler — deep link into the products list filtered
 *      by status=needs_review. The badge counts the queue so the link
 *      reads as "X ürün incelenmeli" rather than a generic verb.
 */
export function OperatorShortcuts({ needsReviewCount }: OperatorShortcutsProps): React.JSX.Element {
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<SyncFeedback>({ tone: 'idle', message: '' });

  const triggerSync = (): void => {
    setFeedback({ tone: 'idle', message: '' });
    startTransition(() => {
      void (async () => {
        try {
          const res = await fetch('/api/admin/sync/products', {
            method: 'POST',
            credentials: 'include',
          });
          if (!res.ok) {
            const body = await res.text().catch(() => '');
            setFeedback({
              tone: 'error',
              message: body || `Senkron başlatılamadı (HTTP ${res.status}).`,
            });
            return;
          }
          setFeedback({
            tone: 'ok',
            message: 'Senkron kuyruğa alındı. İlerlemeyi sync log üzerinden takip edebilirsiniz.',
          });
        } catch (error) {
          const detail = error instanceof Error ? error.message : 'bilinmeyen hata';
          setFeedback({ tone: 'error', message: `Ağ hatası: ${detail}.` });
        }
      })();
    });
  };

  return (
    <section className={styles.shortcutsSection} aria-labelledby="operator-shortcuts-title">
      <h2 id="operator-shortcuts-title" className={styles.visuallyHidden}>
        Hızlı işlemler
      </h2>

      <div className={styles.shortcutsRow}>
        <span
          className={`${styles.shortcut} ${styles.shortcutDisabled}`.trim()}
          aria-disabled="true"
          title="Bu özellik bir sonraki sürümde gelecek"
        >
          <span className={styles.shortcutIcon} aria-hidden>
            <i className="icon icon-plus" />
          </span>
          <span className={styles.shortcutBody}>
            <span className={styles.shortcutTitle}>Yeni ürün ekle</span>
            <span className={styles.shortcutSub}>Yakında — DIA dışı manuel ürün</span>
          </span>
        </span>

        <button
          type="button"
          onClick={triggerSync}
          disabled={pending}
          className={`${styles.shortcut} ${styles.shortcutAction} ${
            pending ? (styles.shortcutBusy ?? '') : ''
          }`.trim()}
        >
          <span className={styles.shortcutIcon} aria-hidden>
            <i className="icon icon-arrow-top-right" />
          </span>
          <span className={styles.shortcutBody}>
            <span className={styles.shortcutTitle}>
              {pending ? 'Senkron başlatılıyor…' : 'DIA senkronu başlat'}
            </span>
            <span className={styles.shortcutSub}>
              {feedback.tone === 'idle' ? 'Ürünleri DIA üzerinden tazeleyin' : feedback.message}
            </span>
          </span>
        </button>

        <Link
          href="/products?status=needs_review"
          className={`${styles.shortcut} ${styles.shortcutLink}`.trim()}
        >
          <span className={styles.shortcutIcon} aria-hidden>
            <i className="icon icon-view" />
          </span>
          <span className={styles.shortcutBody}>
            <span className={styles.shortcutTitle}>İncelenmesi gerekenler</span>
            <span className={styles.shortcutSub}>
              {needsReviewCount === 0
                ? 'Kuyruk boş'
                : `${formatNumber(needsReviewCount)} ürün açıklama / fotoğraf bekliyor`}
            </span>
          </span>
          {needsReviewCount > 0 && (
            <span className={styles.shortcutBadge} aria-hidden>
              {formatNumber(needsReviewCount)}
            </span>
          )}
        </Link>
      </div>
    </section>
  );
}
