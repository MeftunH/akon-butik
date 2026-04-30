'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ALLOWED_TRANSITIONS: Record<string, readonly string[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['fulfilling', 'shipped', 'cancelled', 'refunded'],
  fulfilling: ['shipped', 'cancelled'],
  shipped: ['delivered', 'refunded'],
  delivered: ['refunded'],
  cancelled: [],
  refunded: [],
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Bekliyor',
  paid: 'Ödendi',
  fulfilling: 'Hazırlanıyor',
  shipped: 'Kargoda',
  delivered: 'Teslim Edildi',
  cancelled: 'İptal',
  refunded: 'İade',
};

interface OrderTransitionPanelProps {
  orderId: string;
  currentStatus: string;
}

export function OrderTransitionPanel({ orderId, currentStatus }: OrderTransitionPanelProps) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const targets = ALLOWED_TRANSITIONS[currentStatus] ?? [];

  const transition = async (target: string): Promise<void> => {
    setError(null);
    setBusy(target);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: target, note: note.trim() || undefined }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? `Geçiş başarısız (${res.status.toString()})`);
      }
      setNote('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="border rounded bg-white p-4">
      <h2 className="h6 fw-bold mb-3">Durum Geçişi</h2>
      <p className="small text-muted mb-3">
        Mevcut durum: <strong>{STATUS_LABELS[currentStatus] ?? currentStatus}</strong>
      </p>

      {targets.length === 0 ? (
        <p className="small text-muted mb-0">Bu sipariş terminal durumda — yeni geçiş yapılamaz.</p>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="transition-note" className="form-label small">
              Not (opsiyonel)
            </label>
            <textarea
              id="transition-note"
              rows={2}
              className="form-control form-control-sm"
              placeholder="Kargo firması, takip no, iade sebebi, vb."
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              disabled={busy !== null}
            />
          </div>
          <div className="d-flex flex-column gap-2">
            {targets.map((target) => (
              <button
                key={target}
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => void transition(target)}
                disabled={busy !== null}
              >
                {busy === target ? 'İşleniyor…' : (STATUS_LABELS[target] ?? target)}
              </button>
            ))}
          </div>
          {error && (
            <p className="text-danger small mt-3 mb-0" role="alert">
              {error}
            </p>
          )}
        </>
      )}
    </section>
  );
}
