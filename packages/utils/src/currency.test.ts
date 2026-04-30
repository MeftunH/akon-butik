import { describe, expect, it } from 'vitest';

import { formatTRY, parseTRY } from './currency.js';

describe('formatTRY', () => {
  it('formats minor units to localized TRY', () => {
    expect(formatTRY({ amountMinor: 12345, currency: 'TRY' })).toBe('₺123,45');
  });

  it('accepts a major-unit number', () => {
    expect(formatTRY(99.5)).toBe('₺99,50');
  });

  it('handles zero', () => {
    expect(formatTRY(0)).toBe('₺0,00');
  });
});

describe('parseTRY', () => {
  it('parses a localized TRY string', () => {
    expect(parseTRY('₺1.234,56')).toEqual({ amountMinor: 123456, currency: 'TRY' });
  });

  it('parses without thousands separator', () => {
    expect(parseTRY('99,50')).toEqual({ amountMinor: 9950, currency: 'TRY' });
  });

  it('throws on garbage', () => {
    expect(() => parseTRY('not a number')).toThrow();
  });
});
