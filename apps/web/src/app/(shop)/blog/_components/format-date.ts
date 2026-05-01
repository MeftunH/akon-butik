/**
 * Turkish-friendly long-form date formatter, "12 Mart 2026".
 *
 * Wraps `formatDateTR` from `@akonbutik/utils` so the blog inherits the
 * same Intl-locked output the rest of the storefront uses. Kept as a
 * one-line re-export so the blog folder reads as self-contained: any
 * future divergence (for example, dropping the year on same-year posts)
 * lives here, not in the shared util.
 */
import { formatDateTR } from '@akonbutik/utils';

export function formatBlogDate(value: string | Date | number): string {
  return formatDateTR(value);
}
