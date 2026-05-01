// Shared types for the DIA sync page.
//
// `entity` is the BullMQ job name; the API contract lives in
// apps/api/src/modules/dia/workers/sync.constants.ts (DiaSyncJobName) and
// apps/api/src/modules/admin/admin-sync.controller.ts. Keep this union
// aligned with the server type.

export type SyncEntity = 'products' | 'stock' | 'categories';

export type SyncStatus = 'running' | 'success' | 'failed';

export interface SyncLogEntry {
  id: string;
  entity: string;
  status: SyncStatus;
  startedAt: string;
  finishedAt: string | null;
  error: string | null;
  stats: Record<string, unknown> | null;
}

/**
 * Editorial-feel descriptor for one sync type. The cadence + duration
 * hints come from the cron-scheduler config, expressed for an operator
 * (not a developer) so the page reads as a buyer's room rather than a
 * worker dashboard.
 */
export interface SyncEntityMeta {
  key: SyncEntity;
  numeral: string; // editorial 01/02/03 marker
  label: string;
  tagline: string; // one short sentence, no period
  cadence: string; // operator-facing cron summary
  typicalDuration: string; // operator-facing perf hint
  description: string; // concrete consequence of the sync
}

export const SYNC_ENTITY_META: readonly SyncEntityMeta[] = [
  {
    key: 'products',
    numeral: '01',
    label: 'Ürün Kataloğu',
    tagline: 'Stok kartları, varyantlar, fiyatlar',
    cadence: '30 dk’da bir',
    typicalDuration: 'tipik 8-15 sn',
    description:
      'DIA stokkartlarını çeker, Product ve Variant kayıtlarını upsert eder. Yeni renk veya beden ekledikten sonra burayı tetikleyin.',
  },
  {
    key: 'stock',
    numeral: '02',
    label: 'Stok Adedi',
    tagline: 'Yalnızca miktar yenilemesi',
    cadence: '5 dk’da bir',
    typicalDuration: 'tipik 1-2 sn',
    description:
      'Hızlı yol. Her varyantın güncel stok adedini DIA’dan çeker; ürün kartı ve fiyat dokunmaz.',
  },
  {
    key: 'categories',
    numeral: '03',
    label: 'Kategoriler',
    tagline: 'Taksonomi senkronu (gece 03:17)',
    cadence: 'Günde bir kez',
    typicalDuration: 'tipik 0.5 sn',
    description:
      'Bu tenant’ta DIA kategori servisi kapalı; senkron uyarıyla geçer. Manuel taksonomi düzenlemesi /products altından yapılır.',
  },
] as const;

export const SYNC_LABELS: Record<SyncEntity, string> = {
  products: 'Ürünler',
  stock: 'Stok',
  categories: 'Kategoriler',
};

export const SYNC_STATUS_TONE: Record<SyncStatus, string> = {
  success: 'stt-complete',
  failed: 'stt-cancel',
  running: 'stt-pending',
};

export const SYNC_STATUS_TEXT: Record<SyncStatus, string> = {
  success: 'Başarılı',
  failed: 'Hata',
  running: 'Çalışıyor',
};

/**
 * Latest snapshot per entity, derived from the sync log on the server.
 * Shipped to the trigger card so the operator can see the previous run
 * in context without paging the table.
 */
export interface SyncEntitySnapshot {
  entity: SyncEntity;
  lastRun: SyncLogEntry | null;
  isRunning: boolean;
}
