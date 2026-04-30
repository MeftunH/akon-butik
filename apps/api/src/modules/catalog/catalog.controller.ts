import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import type { ProductDetail, ProductSummary } from '@akonbutik/types';

import { ListProductsQuery } from './dto/list-products.query';
import { GetProductBySlugUseCase } from './use-cases/get-product-by-slug.use-case';
import { ListProductsUseCase } from './use-cases/list-products.use-case';

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly listProducts: ListProductsUseCase,
    private readonly getProductBySlug: GetProductBySlugUseCase,
  ) {}

  @Get('products')
  @ApiOperation({ summary: 'List visible products with filters, sort and paging' })
  async list(
    @Query() query: ListProductsQuery,
  ): Promise<{ items: readonly ProductSummary[]; total: number; page: number; pageSize: number }> {
    return this.listProducts.execute(query);
  }

  @Get('products/:slug')
  @ApiOperation({ summary: 'Get a single product by slug' })
  @ApiParam({ name: 'slug' })
  async detail(@Param('slug') slug: string): Promise<ProductDetail> {
    return this.getProductBySlug.execute(slug);
  }
}
