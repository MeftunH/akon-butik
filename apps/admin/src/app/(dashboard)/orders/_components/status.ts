/**
 * Canonical status taxonomy shared by the list, the detail header, and
 * the transition control. Source of truth lives at the API
 * (`apps/api/src/modules/admin/admin-orders.controller.ts`); this file
 * mirrors the same shape so the admin can reason about it client-side
 * without an additional fetch.
 */

export const ORDER_STATUSES = [
  'pending',
  'paid',
  'fulfilling',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Bekliyor',
  paid: 'Ödendi',
  fulfilling: 'Hazırlanıyor',
  shipped: 'Kargoda',
  delivered: 'Teslim Edildi',
  cancelled: 'İptal',
  refunded: 'İade',
};

/**
 * Vendor `tb-order_status` palette modifier — kept for places that still
 * lean on the vendor badge, e.g. the right-rail "current status" pill.
 */
export const STATUS_VENDOR_CLASS: Record<OrderStatus, string> = {
  pending: 'stt-pending',
  paid: 'stt-complete',
  fulfilling: 'stt-delivery',
  shipped: 'stt-delivery',
  delivered: 'stt-complete',
  cancelled: 'stt-cancel',
  refunded: 'stt-cancel',
};

/**
 * Editorial badge tone — drives the OKLCH palette in `orders.module.scss`.
 * Tones map onto the lifecycle, not 1:1 onto the vendor classes (paid is
 * a different tone from delivered, both render `stt-complete`).
 */
export const STATUS_BADGE_TONE: Record<OrderStatus, string> = {
  pending: 'pending',
  paid: 'paid',
  fulfilling: 'shipping',
  shipped: 'shipping',
  delivered: 'delivered',
  cancelled: 'cancelled',
  refunded: 'refunded',
};

export const ALLOWED_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['fulfilling', 'shipped', 'cancelled', 'refunded'],
  fulfilling: ['shipped', 'cancelled'],
  shipped: ['delivered', 'refunded'],
  delivered: ['refunded'],
  cancelled: [],
  refunded: [],
};

/**
 * Transitions that change customer money or are not undoable from the
 * UI surface. These prompt a confirmation row.
 */
export const DESTRUCTIVE_TRANSITIONS = new Set<OrderStatus>(['cancelled', 'refunded']);

export const TRANSITION_HINT: Partial<Record<OrderStatus, string>> = {
  paid: 'Ödeme alındı, sipariş hazırlanmaya başlanabilir.',
  fulfilling: 'Sipariş depoya düştü, paketleme başlasın.',
  shipped: 'Kargo bilgisi notla birlikte iletilecek.',
  delivered: 'Teslimat tamam, müşteri paneli güncellenecek.',
  cancelled: 'İptal kalıcıdır, stok ve raporlar etkilenir.',
  refunded: 'İade kalıcıdır, ödeme sağlayıcısında manuel iade gerekebilir.',
};

export const isOrderStatus = (value: string): value is OrderStatus =>
  (ORDER_STATUSES as readonly string[]).includes(value);

/**
 * Filter pills above the orders table. Lives here (not in
 * OrderListFilters.tsx) because the table is a server component that
 * iterates this array; a `'use client'` module would expose only a
 * module-reference proxy, breaking `.map()` at render time.
 */
export const STATUS_PILL_OPTIONS: readonly { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  ...ORDER_STATUSES.map((s) => ({ key: s, label: STATUS_LABELS[s] })),
];
