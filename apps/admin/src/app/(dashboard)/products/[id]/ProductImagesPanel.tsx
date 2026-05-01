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

/**
 * Vendor `product-bottom-thumbnail` inspired gallery panel — a 2-up grid of
 * uploaded images with hover-revealed actions. The drag-drop dropzone uses
 * a vendor-style dashed border block; clicking it (or the gallery+ tile)
 * opens the file picker. Multi-select uploads sequentially and patches the
 * UI optimistically.
 *
 * API contract unchanged: POST/PATCH/DELETE /api/admin/products/:id/images.
 */
export function ProductImagesPanel({ productId, initialImages }: ProductImagesPanelProps) {
  const router = useRouter();
  const [images, setImages] = useState<readonly ProductImage[]>(initialImages);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
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

  const onDrop = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    setDragOver(false);
    if (busy) return;
    const list = e.dataTransfer.files;
    if (list.length > 0) void handleFiles(Array.from(list));
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
    <section className="dashboard-card product-images-panel">
      <h3 className="account-title type-semibold h5 mb-2">Görseller</h3>
      <p className="h6 text-main mb-3">
        Ürün fotoğrafları DIA&apos;dan değil, bu panelden yüklenir. JPG / PNG / WebP, en fazla 5 MB.
      </p>

      <label
        className={`product-images-dropzone${dragOver ? ' is-drag-over' : ''}${busy ? ' is-busy' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!busy) setDragOver(true);
        }}
        onDragLeave={() => {
          setDragOver(false);
        }}
        onDrop={onDrop}
      >
        <i className="icon icon-image-square" aria-hidden />
        <span className="h6 fw-semibold">
          {busy ? 'Yükleniyor…' : 'Sürükle bırak ya da seçmek için tıkla'}
        </span>
        <span className="h6 text-main">Birden çok dosya seçebilirsiniz</span>
        <input
          type="file"
          accept={ALLOWED_MIMES.join(',')}
          multiple
          onChange={onSelect}
          disabled={busy}
          hidden
        />
      </label>

      {error && (
        <div className="alert alert-danger mt-3 mb-0" role="alert">
          <span className="h6 fw-normal">{error}</span>
        </div>
      )}

      {images.length === 0 ? (
        <div className="dashboard-empty mt-3">
          <i className="icon icon-image-square mb-2" aria-hidden />
          <h6 className="fw-semibold mb-1">Henüz görsel yüklenmedi</h6>
          <p className="h6 text-main mb-0">
            Ürün listesinde, kart önizlemesinde ve detay sayfasında ilk yüklediğiniz görsel görünür.
          </p>
        </div>
      ) : (
        <div className="row g-3 mt-2">
          {images.map((img) => (
            <div key={img.id} className="col-6">
              <div className="product-image-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={`Ürün görseli ${img.sortOrder.toString()}`}
                  loading="lazy"
                />
                <div className="product-image-tile_meta">
                  {img.isPrimary && <span className="tb-order_status stt-complete">Birincil</span>}
                  <span className="tb-order_status stt-muted">{img.source}</span>
                </div>
                <div className="product-image-tile_actions">
                  {!img.isPrimary && (
                    <button
                      type="button"
                      className="tf-btn style-line btn-sm"
                      onClick={() => void setPrimary(img.id)}
                      disabled={busy}
                    >
                      Birincil yap
                    </button>
                  )}
                  <button
                    type="button"
                    className="tf-btn style-line btn-sm btn-danger-line"
                    onClick={() => void remove(img.id)}
                    disabled={busy}
                    aria-label="Görseli sil"
                  >
                    <i className="icon icon-trash" />
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
