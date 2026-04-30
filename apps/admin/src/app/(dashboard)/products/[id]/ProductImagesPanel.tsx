'use client';

import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent } from 'react';

interface ProductImage {
  id: string;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
  source: 'dia' | 'manual';
}

interface ProductImagesPanelProps {
  productId: string;
  initialImages: readonly ProductImage[];
}

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_BYTES = 5 * 1024 * 1024;

export function ProductImagesPanel({ productId, initialImages }: ProductImagesPanelProps) {
  const router = useRouter();
  const [images, setImages] = useState<readonly ProductImage[]>(initialImages);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: readonly File[]): Promise<void> => {
    setError(null);
    if (files.length === 0) return;
    setBusy(true);
    try {
      for (const file of files) {
        if (!ALLOWED_MIMES.includes(file.type)) {
          throw new Error(`${file.name}: desteklenmeyen format (${file.type})`);
        }
        if (file.size > MAX_BYTES) {
          throw new Error(`${file.name}: dosya çok büyük (${file.size} byte)`);
        }
        const form = new FormData();
        form.append('file', file);
        const res = await fetch(`/api/admin/products/${productId}/images`, {
          method: 'POST',
          credentials: 'include',
          body: form,
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { message?: string } | null;
          throw new Error(body?.message ?? `Yükleme başarısız (${res.status.toString()})`);
        }
        const created = (await res.json()) as ProductImage;
        setImages((prev) => [...prev, created]);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setBusy(false);
    }
  };

  const onSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const list = e.target.files;
    if (list) void handleFiles(Array.from(list));
    // reset so the same file can be re-selected
    e.target.value = '';
  };

  const setPrimary = async (imageId: string): Promise<void> => {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}/images/${imageId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ isPrimary: true }),
      });
      if (!res.ok) throw new Error(`PATCH başarısız (${res.status.toString()})`);
      setImages((prev) => prev.map((img) => ({ ...img, isPrimary: img.id === imageId })));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (imageId: string): Promise<void> => {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}/images/${imageId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Silme başarısız (${res.status.toString()})`);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <h2 className="h6 fw-bold mb-3">Görseller</h2>
      <p className="small text-muted mb-3">
        Ürün fotoğrafları DIA&apos;dan değil, bu panelden yüklenir. JPG / PNG / WebP, en fazla 5 MB.
      </p>

      <div className="border rounded bg-white p-3 mb-3">
        <label className="btn btn-outline-primary btn-sm w-100 mb-0">
          {busy ? 'Yükleniyor…' : 'Görsel Ekle'}
          <input
            type="file"
            accept={ALLOWED_MIMES.join(',')}
            multiple
            onChange={onSelect}
            disabled={busy}
            hidden
          />
        </label>
      </div>

      {error && (
        <div className="alert alert-danger small mb-3" role="alert">
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <p className="text-muted small">Henüz görsel yüklenmedi.</p>
      ) : (
        <div className="row g-3">
          {images.map((img) => (
            <div key={img.id} className="col-6">
              <div className="border rounded bg-white p-2 h-100 d-flex flex-column">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={`Ürün görseli ${img.sortOrder.toString()}`}
                  className="img-fluid rounded mb-2"
                  style={{ aspectRatio: '4/5', objectFit: 'cover' }}
                />
                <div className="small text-muted mb-2">
                  {img.isPrimary && (
                    <span className="badge bg-primary-subtle text-primary me-2">Birincil</span>
                  )}
                  <span className="badge bg-secondary-subtle text-secondary">{img.source}</span>
                </div>
                <div className="mt-auto d-flex gap-2">
                  {!img.isPrimary && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary flex-grow-1"
                      onClick={() => void setPrimary(img.id)}
                      disabled={busy}
                    >
                      Birincil yap
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => void remove(img.id)}
                    disabled={busy}
                    aria-label="Görseli sil"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
