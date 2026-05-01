/**
 * Domain types shared between FE and BE.
 *
 * These mirror Prisma models but live here so that frontend code
 * (which must not import @prisma/client directly) can use them.
 *
 * Where Prisma's generated types and these diverge, the API layer
 * is responsible for the mapping. Keep these in sync via PR review;
 * see ADR 0006 (planned) for the projection rules.
 */

export type ProductId = string;
export type VariantId = string;
export type OrderId = string;
export type UserId = string;

export type ProductStatus = 'visible' | 'hidden' | 'needs_review';

/**
 * Vendor product card supports a small badge whitelist (sale / hot / new)
 * — we mirror that here so the storefront ProductCard can render the
 * matching CSS class. Type is closed-set on purpose; if marketing wants
 * a custom label, extend this enum first.
 */
export type ProductBadgeType = 'sale' | 'hot' | 'new';

export interface ProductBadge {
  type: ProductBadgeType;
  text: string;
}

export interface ProductSummary {
  id: ProductId;
  slug: string;
  nameTr: string;
  brand: { id: string; name: string; slug: string } | null;
  category: { id: string; name: string; slug: string } | null;
  defaultPriceMinor: number;
  /**
   * Original "list" price when the product is on sale — strict greater
   * than `defaultPriceMinor`. Null when not on sale. Used by ProductCard
   * to render the strikethrough `price-old`.
   */
  compareAtPriceMinor: number | null;
  primaryImageUrl: string | null;
  availableSizes: readonly string[];
  availableColors: readonly { name: string; hex: string }[];
  badges: readonly ProductBadge[];
  inStock: boolean;
  status: ProductStatus;
}

export interface ProductDetail extends ProductSummary {
  descriptionMd: string;
  images: readonly { url: string; sortOrder: number; isPrimary: boolean }[];
  variants: readonly ProductVariantSummary[];
}

export interface ProductVariantSummary {
  id: VariantId;
  sku: string;
  size: string | null;
  color: string | null;
  priceMinor: number;
  stockQty: number;
}

export interface CartItem {
  variantId: VariantId;
  quantity: number;
}

export interface CartSnapshot {
  items: readonly (CartItem & { product: ProductSummary; variant: ProductVariantSummary })[];
  subtotalMinor: number;
  shippingMinor: number;
  totalMinor: number;
  currency: 'TRY';
}

export interface AddressInput {
  type: 'fatura' | 'teslimat';
  adSoyad: string;
  telefon: string;
  il: string;
  ilce: string;
  acikAdres: string;
  postaKodu: string;
  isDefault?: boolean;
  label?: string;
}

export interface OrderSummary {
  id: OrderId;
  orderNumber: string;
  diaSiparisKodu: string | null;
  status: 'pending' | 'paid' | 'fulfilling' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  totalMinor: number;
  currency: 'TRY';
  itemCount: number;
  createdAt: string;
}

export interface ProductFilterInput {
  category?: string | undefined;
  brand?: string | undefined;
  size?: readonly string[] | undefined;
  color?: readonly string[] | undefined;
  minPriceMinor?: number | undefined;
  maxPriceMinor?: number | undefined;
  inStock?: boolean | undefined;
  onSale?: boolean | undefined;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popularity' | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
}
