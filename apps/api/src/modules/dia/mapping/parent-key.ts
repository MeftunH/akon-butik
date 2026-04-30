import type { Stokkart } from '@akonbutik/dia-client';

import type { ParentKeySource } from './types';

/**
 * Decide the parent-key for a single stokkart following ADR 0003:
 *   1. urungrubu  (when DIA tenant populates it)
 *   2. urunmodelkodu  (the next-best signal)
 *   3. name-prefix fallback (strip trailing size/color tokens from `aciklama`)
 *
 * Returns `null` if no signal is usable — caller will land it in `unmatched`.
 */
export function pickParentKey(s: Stokkart): { key: string; source: ParentKeySource } | null {
  const urungrubu = takeNonEmptyString(s['urungrubu']);
  if (urungrubu) return { key: urungrubu, source: 'urungrubu' };

  const urunmodelkodu = takeNonEmptyString(s['urunmodelkodu']);
  if (urunmodelkodu) return { key: urunmodelkodu, source: 'urunmodelkodu' };

  const namePrefix = stripVariantSuffixes(s.aciklama);
  if (namePrefix && namePrefix.length >= 8) return { key: namePrefix, source: 'name-prefix' };

  return null;
}

/**
 * Strip trailing size/colour tokens from a free-form Turkish product description so
 * the remaining prefix can serve as a stable group key.
 *
 *   "Zarif Yazlık Takım — XS Kahverengi"  →  "Zarif Yazlık Takım"
 *   "AKB-001 Bluz S Beyaz"                 →  "AKB-001 Bluz"
 *   "Çanta Siyah"                          →  "Çanta"
 */
const SIZE_TOKEN = /\b(?:XXS|XS|S|M|L|XL|2XL|3XL|4XL|XXL|XXXL|3[2-9]|4[0-9]|5[0-2])\b/i;
const COLOR_VOCAB = new Set(
  [
    'beyaz',
    'siyah',
    'gri',
    'kırmızı',
    'kirmizi',
    'mavi',
    'yeşil',
    'yesil',
    'sarı',
    'sari',
    'mor',
    'pembe',
    'turuncu',
    'kahverengi',
    'lacivert',
    'bej',
    'krem',
    'altın',
    'altin',
    'gümüş',
    'gumus',
    'haki',
    'bordo',
    'turkuaz',
    'fuşya',
    'fusya',
    'açık',
    'acik',
    'koyu',
  ].map((c) => c.toLowerCase()),
);

export function stripVariantSuffixes(name: string): string {
  let cleaned = name.trim();
  // First, drop separator-led suffix groups: " — XS Kahverengi", " - S Beyaz", " / M Mavi"
  cleaned = cleaned.replace(/\s*[—–\-/|]\s*[^\s]+(?:\s+[^\s]+)*$/u, '');
  // Then iteratively peel size or colour tokens from the right
  for (let safety = 0; safety < 6; safety++) {
    const match = cleaned.match(/^(.*?)\s+(\S+)\s*$/u);
    if (!match) break;
    const tail = match[2]?.toLowerCase() ?? '';
    if (SIZE_TOKEN.test(tail) || COLOR_VOCAB.has(tail)) {
      cleaned = match[1] ?? '';
      continue;
    }
    break;
  }
  return cleaned.trim();
}

function takeNonEmptyString(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const trimmed = v.trim();
  return trimmed.length > 0 ? trimmed : null;
}
