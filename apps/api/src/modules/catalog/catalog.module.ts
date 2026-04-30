import { Module } from '@nestjs/common';

import { CatalogController } from './catalog.controller';
import { ListProductsUseCase } from './use-cases/list-products.use-case';
import { GetProductBySlugUseCase } from './use-cases/get-product-by-slug.use-case';
import { PRODUCT_REPOSITORY } from './ports/product.repository';
import { PrismaProductRepository } from './adapters/prisma-product.repository';

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
