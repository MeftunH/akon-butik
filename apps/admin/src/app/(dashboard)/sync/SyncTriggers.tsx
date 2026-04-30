'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ENTITIES = [
  {
    key: 'products' as const,
    label: 'Ürünler',
    description: 'DIA stokkartlarını çek + Product+Variant tablolarını upsert et.',
  },
  {
    key: 'stock' as const,
    label: 'Stok',
    description: 'Sadece stok miktarlarını yenile (hızlı).',
  },
  {
    key: 'categories' as const,
    label: 'Kategoriler',
    description: "Bu tenant'ta servis kapalı; senkron warning ile geçer.",
  },
];

type Entity = (typeof ENTITIES)[number]['key'];

export function SyncTriggers() {
  const router = useRouter();
  const [busy, setBusy] = useState<Entity | null>(null);
  const [feedback, setFeedback] = useState<{ entity: Entity; jobId: string | null } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trigger = async (entity: Entity) => {
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
      setTimeout(() => router.refresh(), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <div className="row g-3">
        {ENTITIES.map((e) => (
          <div key={e.key} className="col-md-4">
            <div className="border rounded p-3 bg-white d-flex flex-column h-100">
              <h3 className="h6 fw-bold">{e.label}</h3>
              <p className="text-muted small flex-grow-1">{e.description}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => void trigger(e.key)}
                disabled={busy !== null}
              >
                {busy === e.key ? 'Tetikleniyor…' : 'Senkronu Başlat'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {feedback && (
        <p className="text-success small mt-3 mb-0" role="status">
          ✓ <strong>{feedback.entity}</strong> kuyruğa alındı
          {feedback.jobId ? ` (job #${feedback.jobId})` : ''}. Log birkaç saniye içinde aşağıda
          görünecek.
        </p>
      )}
      {error && (
        <p className="text-danger small mt-3 mb-0" role="alert">
          ✗ {error}
        </p>
      )}
    </div>
  );
}
