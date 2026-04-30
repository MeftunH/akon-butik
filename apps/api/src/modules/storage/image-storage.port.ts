/**
 * Hexagonal port for product image persistence. The admin app uploads
 * photography for products (per the project rule: images do not come
 * from DIA, the team uploads them through the admin panel) and we store
 * the bytes somewhere durable + reachable from the storefront.
 *
 * The default adapter writes to the local filesystem (dev: project tree,
 * prod: ~akonbutik/public_html/uploads which Apache serves). When the
 * catalogue grows beyond what a single VPS can host, swap in an S3 /
 * MinIO adapter without touching the controller or service layers.
 */
export const IMAGE_STORAGE = Symbol('IMAGE_STORAGE');

export interface ImageWriteResult {
  /** Stable opaque key used to delete the object later. */
  storageKey: string;
  /** Absolute, browser-reachable URL — what gets written to ProductImage.url. */
  publicUrl: string;
  /** Final filename on disk (with extension; collisions deduped). */
  filename: string;
}

export interface ImageStorage {
  /**
   * Persist an uploaded image scoped to a product. Returns the public URL
   * and an opaque storage key. The returned URL is what the storefront
   * eventually fetches.
   */
  save(args: {
    productId: string;
    /** Original filename from the upload — used as a hint, not trusted. */
    originalFilename: string;
    /** image/jpeg, image/png, image/webp. */
    mimeType: string;
    bytes: Buffer;
  }): Promise<ImageWriteResult>;

  /**
   * Remove an object previously saved by `save()`. Idempotent — missing
   * objects do not raise. The DB row is the source of truth; storage
   * cleanup is best-effort.
   */
  delete(storageKey: string): Promise<void>;
}
