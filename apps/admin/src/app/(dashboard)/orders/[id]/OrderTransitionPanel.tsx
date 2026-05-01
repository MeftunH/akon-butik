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

const STATUS_CLASS: Record<string, string> = {
  pending: 'stt-pending',
  paid: 'stt-complete',
  fulfilling: 'stt-delivery',
  shipped: 'stt-delivery',
  delivered: 'stt-complete',
  cancelled: 'stt-cancel',
  refunded: 'stt-cancel',
};

interface OrderTransitionPanelProps {
  orderId: string;
  currentStatus: string;
}

/**
 * Admin-only state-machine panel pinned to the order detail right-rail.
 * Renders allowed forward transitions for `currentStatus` as vendor-style
 * `tf-btn` buttons, with an optional note textarea (sent through to the
 * audit payload). API contract unchanged: PATCH /api/admin/orders/:id/status
 * with `{ status, note? }`.
 */
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
    <section className="order-transition-panel">
      <h3 className="account-title type-semibold h5 mb-3">Durum Geçişi</h3>
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="h6 text-main">Mevcut:</span>
        <span className={`tb-order_status ${STATUS_CLASS[currentStatus] ?? 'stt-pending'}`}>
          {STATUS_LABELS[currentStatus] ?? currentStatus}
        </span>
      </div>

      {targets.length === 0 ? (
        <p className="h6 text-main mb-0">Bu sipariş terminal durumda — yeni geçiş yapılamaz.</p>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="transition-note" className="form-label h6 fw-semibold">
              Not (opsiyonel)
            </label>
            <textarea
              id="transition-note"
              rows={2}
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
                className="tf-btn animate-btn w-100"
                onClick={() => void transition(target)}
                disabled={busy !== null}
              >
                <i className="icon icon-arrow-right me-2" />
                {busy === target ? 'İşleniyor…' : (STATUS_LABELS[target] ?? target)}
              </button>
            ))}
          </div>
          {error && (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              <span className="h6 fw-normal">{error}</span>
            </div>
          )}
        </>
      )}
    </section>
  );
}
