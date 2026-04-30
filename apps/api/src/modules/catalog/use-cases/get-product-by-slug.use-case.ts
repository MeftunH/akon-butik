import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ProductDetail } from '@akonbutik/types';

import { PRODUCT_REPOSITORY, type ProductRepository } from '../ports/product.repository.js';

@Injectable()
export class GetProductBySlugUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly products: ProductRepository) {}

  async execute(slug: string): Promise<ProductDetail> {
    const product = await this.products.findBySlug(slug);
    if (!product) {
      throw new NotFoundException(`Product not found: ${slug}`);
    }
    return product;
  }
}
