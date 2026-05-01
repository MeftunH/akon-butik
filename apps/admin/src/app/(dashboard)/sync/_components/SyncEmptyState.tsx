'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SYNC_ENTITY_META, type SyncEntity } from './sync-page.types';
import styles from './sync.module.scss';

/**
 * Onboarding cue rendered when no sync has ever run. Pure UI primitive —
 * the entity buttons reuse the same /api/admin/sync/:entity contract as
 * the full trigger card. Failures surface inline; the parent page
 * router.refresh() flips state once the first row lands.
 */
export function SyncEmptyState(): React.ReactElement {
  const router = useRouter();
  const [busy, setBusy] = useState<SyncEntity | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trigger = async (entity: SyncEntity): Promise<void> => {
    setError(null);
    setBusy(entity);
    try {
      const res = await fetch(`/api/admin/sync/${entity}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(body?.message ?? `Senkron başlatılamadı (${res.status.toString()})`);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className={styles.emptyState}>
      <p className={styles.emptyEyebrow}>İlk senkron</p>
      <h3 className={styles.emptyTitle}>Henüz hiçbir DIA senkronu çalışmamış</h3>
      <p className={styles.emptyLead}>
        DIA bağlantısı kurulduktan sonra senkron kayıtları burada birikir. Şimdi manuel olarak
        başlatın; cron zamanlayıcı zaten kuyrukta, ama ilk çekim için kuyruğun beklemesine gerek
        yok.
      </p>
      <div className={styles.emptyActions}>
        {SYNC_ENTITY_META.map((meta) => (
          <button
            key={meta.key}
            type="button"
            className={styles.triggerButton}
            onClick={() => void trigger(meta.key)}
            disabled={busy !== null}
            style={{ minWidth: 200 }}
          >
            <span>{busy === meta.key ? 'Tetikleniyor' : `${meta.label} senkronunu başlat`}</span>
            <span className={styles.triggerButtonGlyph} aria-hidden>
              →
            </span>
          </button>
        ))}
      </div>
      {error ? (
        <span className={styles.triggerButtonNoteError} role="alert" style={{ fontSize: 12 }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
