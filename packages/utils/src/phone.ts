const TR_MOBILE_REGEX = /^(\+?90|0)?(5\d{9})$/;

export function isValidTRPhone(input: string): boolean {
  return TR_MOBILE_REGEX.test(input.replace(/[\s()-]/g, ''));
}

export function normalizeTRPhone(input: string): string {
  const stripped = input.replace(/[\s()-]/g, '');
  const match = TR_MOBILE_REGEX.exec(stripped);
  if (!match?.[2]) {
    throw new Error(`Not a valid TR mobile number: ${input}`);
  }
  return `+90${match[2]}`;
}

export function formatTRPhone(input: string): string {
  const normalized = normalizeTRPhone(input);
  // +90 5XX XXX XX XX
  const digits = normalized.slice(3);
  return `+90 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
}
