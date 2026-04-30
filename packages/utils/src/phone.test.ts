import { describe, expect, it } from 'vitest';

import { formatTRPhone, isValidTRPhone, normalizeTRPhone } from './phone.js';

describe('TR phone helpers', () => {
  it('validates a TR mobile number with multiple input formats', () => {
    expect(isValidTRPhone('05551234567')).toBe(true);
    expect(isValidTRPhone('+905551234567')).toBe(true);
    expect(isValidTRPhone('5551234567')).toBe(true);
    expect(isValidTRPhone('+90 555 123 45 67')).toBe(true);
  });

  it('rejects non-mobile or malformed input', () => {
    expect(isValidTRPhone('1234567')).toBe(false);
    expect(isValidTRPhone('02121234567')).toBe(false);
    expect(isValidTRPhone('abcdefghij')).toBe(false);
  });

  it('normalizes to +90 prefix', () => {
    expect(normalizeTRPhone('05551234567')).toBe('+905551234567');
    expect(normalizeTRPhone('+90 555 123 45 67')).toBe('+905551234567');
  });

  it('formats with spaces', () => {
    expect(formatTRPhone('05551234567')).toBe('+90 555 123 45 67');
  });
});
