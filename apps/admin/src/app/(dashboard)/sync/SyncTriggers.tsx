'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ENTITIES = [
  {
    key: 'products' as const,
    label: 'Ürünler',
    icon: 'icon-bag-simple',
    description: 'DIA stokkartlarını çek + Product+Variant tablolarını upsert et.',
  },
  {
    key: 'stock' as const,
    label: 'Stok',
    icon: 'icon-package-thin',
    description: 'Sadece stok miktarlarını yenile (hızlı).',
  },
  {
    key: 'categories' as const,
    label: 'Kategoriler',
    icon: 'icon-list',
    description: "Bu tenant'ta servis kapalı; senkron warning ile geçer.",
  },
];

type Entity = (typeof ENTITIES)[number]['key'];

/**
 * Three sync trigger cards in vendor `order-box` markup. Each card POSTs
 * to /api/admin/sync/:entity, then refreshes the page after a beat so the
 * fresh sync log row shows up below. Only one trigger can run at a time
 * (BullMQ queue is shared anyway).
 */
export function SyncTriggers() {
  const router = useRouter();
  const [busy, setBusy] = useState<Entity | null>(null);
  const [feedback, setFeedback] = useState<{ entity: Entity; jobId: string | null } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trigger = async (entity: Entity): Promise<void> => {
    setError(null);
    setFeedback(null);
    setBusy(entity);
    try {
      const res = await fetch(`/api/admin/sync/${entity}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? `Senkron başlatılamadı (${res.status.toString()})`);
      }
      const body = (await res.json()) as { enqueued: Entity; jobId: string | null };
      setFeedback({ entity: body.enqueued, jobId: body.jobId });
      // Wait a beat then refresh to pick up the new sync log row.
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <div className="row g-3 g-xl-4">
        {ENTITIES.map((e) => (
          <div key={e.key} className="col-md-4">
            <div className="sync-trigger-card h-100">
              <div className="sync-trigger-card_icon">
                <i className={`icon ${e.icon}`} aria-hidden />
              </div>
              <div className="sync-trigger-card_body">
                <h3 className="h5 fw-semibold mb-1">{e.label}</h3>
                <p className="h6 text-main mb-0">{e.description}</p>
              </div>
              <button
                type="button"
                className="tf-btn animate-btn w-100"
                onClick={() => void trigger(e.key)}
                disabled={busy !== null}
              >
                <i className="icon icon-arrow-clockwise me-2" />
                {busy === e.key ? 'Tetikleniyor…' : 'Senkronu Başlat'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {feedback && (
        <div className="alert alert-success mt-4 mb-0" role="status">
          <span className="h6 fw-normal">
            <strong>{feedback.entity}</strong> kuyruğa alındı
            {feedback.jobId ? ` (job #${feedback.jobId})` : ''}. Log birkaç saniye içinde aşağıda
            görünecek.
          </span>
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-4 mb-0" role="alert">
          <span className="h6 fw-normal">{error}</span>
        </div>
      )}
    </div>
  );
}
