import { Inject, Injectable } from '@nestjs/common';
import type { ProductFilterInput, ProductSummary } from '@akonbutik/types';

import { PRODUCT_REPOSITORY, type ProductRepository } from '../ports/product.repository';

@Injectable()
export class ListProductsUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly products: ProductRepository) {}

  async execute(
    filter: ProductFilterInput,
  ): Promise<{ items: readonly ProductSummary[]; total: number; page: number; pageSize: number }> {
    const result = await this.products.list(filter);
    return {
      ...result,
      page: filter.page ?? 1,
      pageSize: filter.pageSize ?? 24,
    };
  }
}
