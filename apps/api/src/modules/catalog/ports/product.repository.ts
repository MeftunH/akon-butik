import type { ProductDetail, ProductFilterInput, ProductSummary } from '@akonbutik/types';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductRepository {
  list(filter: ProductFilterInput): Promise<{ items: readonly ProductSummary[]; total: number }>;
  findBySlug(slug: string): Promise<ProductDetail | null>;
}
