import { Module } from '@nestjs/common';

import { CatalogController } from './catalog.controller.js';
import { ListProductsUseCase } from './use-cases/list-products.use-case.js';
import { GetProductBySlugUseCase } from './use-cases/get-product-by-slug.use-case.js';
import { PRODUCT_REPOSITORY } from './ports/product.repository.js';
import { PrismaProductRepository } from './adapters/prisma-product.repository.js';

/**
 * Catalog bounded context — exposes the public product/category endpoints.
 *
 * Architecture (hexagonal):
 *   HTTP controller  →  use case  →  repository port  →  Prisma adapter
 *
 * Use cases hold the business rules; they depend only on the port (interface),
 * never on Prisma. The adapter binds the port to PrismaService.
 */
@Module({
  controllers: [CatalogController],
  providers: [
    ListProductsUseCase,
    GetProductBySlugUseCase,
    { provide: PRODUCT_REPOSITORY, useClass: PrismaProductRepository },
  ],
})
export class CatalogModule {}
