'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState, type ChangeEvent, type DragEvent } from 'react';

import styles from './ProductImagesPanel.module.scss';

interface ProductImage {
  id: string;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
  source: 'dia' | 'manual';
}

export interface ProductImagesPanelProps {
  productId: string;
  initialImages: readonly ProductImage[];
}

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const ALLOWED_EXT_LABEL = 'JPG, PNG, WebP, AVIF';
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_LABEL = '5 MB';

interface UploadJob {
  /** Local handle for keying the row in the upload list. */
  key: string;
  filename: string;
  size: number;
  /** 0–100, or null for indeterminate fallback. */
  progress: number | null;
  /** When set, the upload failed and this is the message to display. */
  error: string | null;
}

/**
 * Vendor `product-bottom-thumbnail` inspired gallery panel — a 3-up grid
 * of uploaded images with inline controls (make-primary, delete) and
 * native HTML5 drag-and-drop reorder.
 *
 * Uploads use XMLHttpRequest (not fetch) so we get real per-file
 * progress; each in-flight upload renders a row with a determinate
 * progress bar above the gallery. The dropzone surface compacts to a
 * thin bar once images exist, expanding back to a hero state when the
 * gallery is empty.
 *
 * Reorder fires PATCH /api/admin/products/:id/images/:imageId with
 * `{ sortOrder }` — sequentially, not parallel, to avoid the API's
 * unique-index races on `(productId, sortOrder)` triggers.
 *
 * API contract unchanged: POST/PATCH/DELETE /api/admin/products/:id/images.
 */
export function ProductImagesPanel({ productId, initialImages }: ProductImagesPanelProps) {
  const router = useRouter();
  const [images, setImages] = useState<readonly ProductImage[]>(
    [...initialImages].sort((a, b) => a.sortOrder - b.sortOrder),
  );
  const [uploadJobs, setUploadJobs] = useState<UploadJob[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [dragImageId, setDragImageId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: readonly File[]): Promise<void> => {
      setError(null);
      if (files.length === 0) return;

      // Validate up-front before any network work, so the user sees the
      // first error immediately rather than after some files succeed.
      for (const file of files) {
        if (!ALLOWED_MIMES.includes(file.type)) {
          setError(`${file.name}: desteklenmeyen dosya türü (${file.type}).`);
          return;
        }
        if (file.size > MAX_BYTES) {
          setError(
            `${file.name}: dosya çok büyük (${(file.size / 1024 / 1024).toFixed(1)} MB > ${MAX_LABEL}).`,
          );
          return;
        }
      }

      // Build initial upload jobs and append to state, then run them in
      // sequence (server-side write order matters for sortOrder).
      const jobs: UploadJob[] = files.map((f, i) => ({
        key: `${Date.now().toString()}-${i.toString()}-${f.name}`,
        filename: f.name,
        size: f.size,
        progress: 0,
        error: null,
      }));
      setUploadJobs((prev) => [...prev, ...jobs]);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const job = jobs[i];
        if (!file || !job) continue;
        const jobKey = job.key;
        try {
          const created = await uploadOne(productId, file, (loaded, total) => {
            const pct = total > 0 ? Math.round((loaded / total) * 100) : null;
            setUploadJobs((prev) =>
              prev.map((j) => (j.key === jobKey ? { ...j, progress: pct } : j)),
            );
          });
          setImages((prev) => [...prev, created].sort((a, b) => a.sortOrder - b.sortOrder));
          // Drop the completed job from the upload list.
          setUploadJobs((prev) => prev.filter((j) => j.key !== jobKey));
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Bilinmeyen yükleme hatası';
          setUploadJobs((prev) =>
            prev.map((j) => (j.key === jobKey ? { ...j, error: message } : j)),
          );
        }
      }
      router.refresh();
    },
    [productId, router],
  );

  const onSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const list = e.target.files;
    if (list) void handleFiles(Array.from(list));
    e.target.value = '';
  };

  const onDropFiles = (e: DragEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    setDragOver(false);
    const list = e.dataTransfer.files;
    if (list.length > 0) void handleFiles(Array.from(list));
  };

  const setPrimary = async (imageId: string): Promise<void> => {
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${productId}/images/${imageId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ isPrimary: true }),
      });
      if (!res.ok) throw new Error(`Birincil olarak ayarlanamadı (${res.status.toString()})`);
      setImages((prev) => prev.map((img) => ({ ...img, isPrimary: img.id === imageId })));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu');
    }
  };

  const remove = async (imageId: string): Promise<void> => {
    setError(null);
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
    }
  };

  // Drag-to-reorder. We use HTML5 native drag events; a row holds two
  // events: dragstart (record source id) and drop (compute new order
  // and sequentially patch sortOrder on the API).
  const onTileDragStart = (id: string) => (e: DragEvent<HTMLLIElement>) => {
    setDragImageId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Required by Firefox to actually start the drag.
    e.dataTransfer.setData('text/plain', id);
  };

  const onTileDragOver = (id: string) => (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetId(id);
  };

  const onTileDragLeave = (): void => {
    setDropTargetId(null);
  };

  const onTileDrop = (targetId: string) => async (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDropTargetId(null);
    if (!dragImageId || dragImageId === targetId) {
      setDragImageId(null);
      return;
    }
    const fromIdx = images.findIndex((i) => i.id === dragImageId);
    const toIdx = images.findIndex((i) => i.id === targetId);
    if (fromIdx === -1 || toIdx === -1) {
      setDragImageId(null);
      return;
    }

    // Compute the new array, then derive the persistence diff: any image
    // whose sortOrder changes must be PATCHed.
    const next = [...images];
    const [moved] = next.splice(fromIdx, 1);
    if (!moved) {
      setDragImageId(null);
      return;
    }
    next.splice(toIdx, 0, moved);
    const repacked = next.map((img, i) => ({ ...img, sortOrder: i }));
    setImages(repacked);
    setDragImageId(null);

    setIsReordering(true);
    setError(null);
    try {
      // PATCH only the rows whose sortOrder changed vs. server state, in
      // order, to keep the API's unique-index invariant happy.
      const changed = repacked.filter((r, i) => images[i]?.id !== r.id);
      for (const row of changed) {
        const res = await fetch(`/api/admin/products/${productId}/images/${row.id}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ sortOrder: row.sortOrder }),
        });
        if (!res.ok) {
          throw new Error(`Sıralama güncellenemedi (${res.status.toString()})`);
        }
      }
      router.refresh();
    } catch (err) {
      // Roll back UI by reverting to the pre-drag order.
      setImages(images);
      setError(err instanceof Error ? err.message : 'Sıralama hatası');
    } finally {
      setIsReordering(false);
    }
  };

  const hasImages = images.length > 0;

  return (
    <div className={styles.panel}>
      <label
        htmlFor="product-image-upload"
        aria-label="Görsel yükle"
        className={`${styles.dropzone} ${hasImages ? styles.dropzoneCompact : ''} ${
          dragOver ? styles.dropzoneActive : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => {
          setDragOver(false);
        }}
        onDrop={onDropFiles}
      >
        <i className="icon icon-image-square" aria-hidden />
        <div className={styles.dropzoneText}>
          <span className={styles.dropzoneTitle}>
            {hasImages
              ? 'Yeni görsel ekle: sürükle bırak veya tıkla'
              : 'Bu ürün için görsel yükleyin'}
          </span>
          <span className={styles.dropzoneHint}>
            {ALLOWED_EXT_LABEL} formatları kabul edilir, dosya başına en fazla {MAX_LABEL}.
          </span>
        </div>
        <input
          id="product-image-upload"
          ref={inputRef}
          type="file"
          accept={ALLOWED_MIMES.join(',')}
          multiple
          onChange={onSelect}
          hidden
        />
      </label>

      {uploadJobs.length > 0 && (
        <ul className={styles.uploadList} aria-live="polite">
          {uploadJobs.map((job) => (
            <li
              key={job.key}
              className={styles.uploadRow}
              data-error={job.error ? 'true' : 'false'}
            >
              <div className={styles.uploadInfo}>
                <span className={styles.uploadFilename}>{job.filename}</span>
                <span className={styles.uploadSize}>
                  {(job.size / 1024 / 1024).toFixed(2)} MB
                  {job.error
                    ? ` · ${job.error}`
                    : job.progress !== null
                      ? ` · %${job.progress.toString()}`
                      : ' · yükleniyor'}
                </span>
              </div>
              <div className={styles.uploadProgress}>
                <div
                  className={styles.uploadProgressBar}
                  data-error={job.error ? 'true' : 'false'}
                  style={{ width: `${(job.progress ?? 0).toString()}%` }}
                  role="progressbar"
                  aria-valuenow={job.progress ?? undefined}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${job.filename} yükleme ilerlemesi`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      {hasImages ? (
        <ul className={styles.gallery} aria-label="Ürün görselleri">
          {images.map((img, idx) => (
            <li
              key={img.id}
              className={styles.tile}
              data-dragging={dragImageId === img.id ? 'true' : 'false'}
              data-drop-target={dropTargetId === img.id ? 'true' : 'false'}
              draggable
              onDragStart={onTileDragStart(img.id)}
              onDragEnter={(e) => {
                e.preventDefault();
              }}
              onDragOver={onTileDragOver(img.id)}
              onDragLeave={onTileDragLeave}
              onDrop={(e) => void onTileDrop(img.id)(e)}
            >
              <div className={styles.tileImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={`Ürün görseli ${(idx + 1).toString()}`} loading="lazy" />
                <span className={styles.tileHandle} aria-hidden>
                  <i className="icon icon-arrow-up-down" />
                </span>
                {img.isPrimary && (
                  <span className={styles.tileBadge} data-tone="primary">
                    Birincil
                  </span>
                )}
                {img.source === 'dia' && (
                  <span className={styles.tileBadge} data-tone="dia">
                    DIA
                  </span>
                )}
              </div>
              <div className={styles.tileActions}>
                <button
                  type="button"
                  className={styles.tileActionButton}
                  onClick={() => void setPrimary(img.id)}
                  disabled={img.isPrimary || isReordering}
                  aria-label={`${img.isPrimary ? 'Bu görsel zaten birincil' : 'Birincil yap'}`}
                >
                  <i className="icon icon-star" aria-hidden />
                  {img.isPrimary ? 'Birincil' : 'Birincil yap'}
                </button>
                <button
                  type="button"
                  className={`${styles.tileActionButton} ${styles.tileActionDanger}`}
                  onClick={() => void remove(img.id)}
                  disabled={isReordering}
                  aria-label="Görseli sil"
                >
                  <i className="icon icon-trash" aria-hidden />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyGallery}>
          <p className={styles.emptyTitle}>Henüz görsel yok</p>
          <p className={styles.emptyBody}>
            İlk yüklediğiniz görsel mağaza listesinde, kart önizlemesinde ve detay sayfasında
            otomatik olarak birincil görsel olur. Sonra sürükleyerek sırayı değiştirebilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Single-file upload via XMLHttpRequest so we can pipe upload progress
 * back to the caller. Resolves with the created `ProductImage` row, or
 * rejects with a normalized error message that the gallery surfaces in
 * the upload row.
 */
function uploadOne(
  productId: string,
  file: File,
  onProgress: (loaded: number, total: number) => void,
): Promise<ProductImage> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const form = new FormData();
    form.append('file', file);
    xhr.open('POST', `/api/admin/products/${productId}/images`);
    xhr.withCredentials = true;
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) onProgress(event.loaded, event.total);
    });
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const body = JSON.parse(xhr.responseText) as ProductImage;
          resolve(body);
        } catch {
          reject(new Error('Sunucu yanıtı çözümlenemedi'));
        }
      } else {
        let msg: string | undefined;
        try {
          const body = JSON.parse(xhr.responseText) as { message?: string };
          msg = body.message;
        } catch {
          // ignore; fall through to status code message
        }
        reject(new Error(msg ?? `Yükleme başarısız (${xhr.status.toString()})`));
      }
    });
    xhr.addEventListener('error', () => {
      reject(new Error('Bağlantı hatası, lütfen tekrar deneyin'));
    });
    xhr.addEventListener('abort', () => {
      reject(new Error('Yükleme iptal edildi'));
    });
    xhr.send(form);
  });
}
