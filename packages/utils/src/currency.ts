/**
 * Money is stored as integer minor units (kuruş) to avoid floating-point drift.
 * 100 kuruş = 1 TL.
 */
export type Money = {
  readonly amountMinor: number;
  readonly currency: 'TRY';
};

const TRY_FORMATTER = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatTRY(input: Money | number): string {
  const amountMinor = typeof input === 'number' ? Math.round(input * 100) : input.amountMinor;
  return TRY_FORMATTER.format(amountMinor / 100);
}

export function parseTRY(value: string): Money {
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const major = Number.parseFloat(cleaned);
  if (!Number.isFinite(major)) {
    throw new Error(`Cannot parse "${value}" as TRY money`);
  }
  return { amountMinor: Math.round(major * 100), currency: 'TRY' };
}
