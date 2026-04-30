/**
 * Pure data structures returned by the DIA→domain mapper.
 *
 * The mapper is intentionally side-effect-free: it takes a batch of DIA
 * records and returns a changeset that the caller (DiaSyncService) then
 * applies to Prisma in a transaction. Keeps the heuristic testable in
 * isolation and lets us preview mis-groupings without touching the DB.
 */

export type ParentKeySource = 'urungrubu' | 'urunmodelkodu' | 'name-prefix' | 'self';

export interface ProductUpsert {
  /** The canonical key DIA stokkarts will join on (the value of urungrubu / urunmodelkodu / prefix). */
  parentKey: string;
  parentKeySource: ParentKeySource;
  slug: string;
  nameTr: string;
  defaultPriceMinor: number;
  /** DIA `markakodu` of the dominant brand in the variant set; null if none. */
  brandDiaKodu: string | null;
  /** DIA `kategorikodu` of the dominant category. */
  categoryDiaKodu: string | null;
}

export interface VariantUpsert {
  /** Joins back to {@link ProductUpsert.parentKey}. */
  parentKey: string;
  diaStokkartkodu: string;
  sku: string;
  size: string | null;
  color: string | null;
  priceMinor: number;
  stockQty: number;
}

export interface DiaSyncChangeset {
  products: readonly ProductUpsert[];
  variants: readonly VariantUpsert[];
  /**
   * Stokkarts the heuristic could not assign to a parent group — they will
   * be flagged as needs_review in the DB so an operator can merge/split via admin.
   */
  unmatched: readonly { stokkartkodu: string; reason: string }[];
}
