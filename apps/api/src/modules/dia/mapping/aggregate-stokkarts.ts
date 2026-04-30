import { slugify } from '@akonbutik/utils';
import type { Stokkart } from '@akonbutik/dia-client';

import { pickParentKey } from './parent-key';
import type {
  DiaSyncChangeset,
  ParentKeySource,
  ProductUpsert,
  VariantUpsert,
} from './types';

/**
 * Group a batch of DIA stokkarts into Product + ProductVariant upserts.
 *
 * Pure function — no I/O, no DB access. Caller (DiaSyncService) applies
 * the resulting changeset to Prisma in a transaction.
 *
 * Behaviour:
 * - Groups stokkarts by {@link pickParentKey}.
 * - Each group becomes one ProductUpsert; each member becomes one VariantUpsert.
 * - A group of size 1 is still emitted as a Product (with a single variant),
 *   marked source='self' so admin UI can offer to merge it with others later.
 * - Stokkarts with no usable signal land in `unmatched` and are skipped.
 * - Within a group: the canonical name is the longest stokkart description with
 *   variant suffixes stripped; brand/category use the modal value.
 */
export function aggregateStokkarts(
  stokkarts: readonly Stokkart[],
): DiaSyncChangeset {
  const grouped = new Map<
    string,
    { source: ParentKeySource; members: Stokkart[] }
  >();
  const unmatched: { stokkartkodu: string; reason: string }[] = [];

  for (const s of stokkarts) {
    const decided = pickParentKey(s);
    if (!decided) {
      unmatched.push({
        stokkartkodu: s.stokkartkodu,
        reason: 'no urungrubu / urunmodelkodu / extractable name-prefix',
      });
      continue;
    }
    const bucket = grouped.get(decided.key);
    if (bucket) {
      bucket.members.push(s);
    } else {
      grouped.set(decided.key, { source: decided.source, members: [s] });
    }
  }

  const products: ProductUpsert[] = [];
  const variants: VariantUpsert[] = [];

  for (const [parentKey, { source, members }] of grouped) {
    const canonicalName = pickCanonicalName(members);
    products.push({
      parentKey,
      parentKeySource: members.length === 1 ? 'self' : source,
      slug: slugify(`${canonicalName}-${parentKey}`),
      nameTr: canonicalName,
      defaultPriceMinor: pickDefaultPrice(members),
      brandDiaKodu: modalString(members.map((m) => stringOrNull(m['markakodu']))),
      categoryDiaKodu: modalString(members.map((m) => stringOrNull(m['kategorikodu']))),
    });
    for (const m of members) {
      variants.push({
        parentKey,
        diaStokkartkodu: m.stokkartkodu,
        sku: m.stokkartkodu,
        size: stringOrNull(m['beden']),
        color: stringOrNull(m['renk']),
        priceMinor: priceToMinor(m.satisfiyati1),
        stockQty: numberOrZero(m['b2c_depomiktari']),
      });
    }
  }

  return { products, variants, unmatched };
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function pickCanonicalName(members: readonly Stokkart[]): string {
  // Prefer the description with the most non-suffix content. We approximate by
  // taking the longest description and re-running the suffix stripper, then
  // falling back to the original if the strip leaves something too short.
  const sorted = [...members].sort((a, b) => b.aciklama.length - a.aciklama.length);
  const longest = sorted[0]?.aciklama ?? 'Ürün';
  const stripped = longest
    .replace(/\s*[—–\-/|]\s*[^\s]+(?:\s+[^\s]+)*$/u, '')
    .trim();
  return stripped.length >= 4 ? stripped : longest.trim();
}

function pickDefaultPrice(members: readonly Stokkart[]): number {
  const prices = members
    .map((m) => m.satisfiyati1)
    .filter((p): p is number => typeof p === 'number' && p > 0);
  if (prices.length === 0) return 0;
  // Use the modal price (most common variant price) for B2C presentation.
  return priceToMinor(modalNumber(prices));
}

function priceToMinor(p: number | undefined): number {
  if (typeof p !== 'number' || !Number.isFinite(p)) return 0;
  return Math.round(p * 100);
}

function numberOrZero(v: unknown): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : 0;
}

function stringOrNull(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
}

function modalString(values: readonly (string | null)[]): string | null {
  const counts = new Map<string, number>();
  for (const v of values) {
    if (v === null) continue;
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  let bestKey: string | null = null;
  let bestCount = 0;
  for (const [k, c] of counts) {
    if (c > bestCount) {
      bestCount = c;
      bestKey = k;
    }
  }
  return bestKey;
}

function modalNumber(values: readonly number[]): number {
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  let bestKey = values[0] ?? 0;
  let bestCount = 0;
  for (const [k, c] of counts) {
    if (c > bestCount) {
      bestCount = c;
      bestKey = k;
    }
  }
  return bestKey;
}
