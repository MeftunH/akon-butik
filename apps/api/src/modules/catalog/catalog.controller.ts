import type { ProductDetail, ProductSummary } from '@akonbutik/types';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

// NestJS DI requires the runtime class — `import type` would tree-shake.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ListProductsQuery } from './dto/list-products.query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetProductBySlugUseCase } from './use-cases/get-product-by-slug.use-case';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ListProductsUseCase } from './use-cases/list-products.use-case';

interface TaxonomySummary {
  id: string;
  slug: string;
  name: string;
  productCount: number;
}

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly listProducts: ListProductsUseCase,
    private readonly getProductBySlug: GetProductBySlugUseCase,
    private readonly prisma: PrismaService,
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

  @Get('categories')
  @ApiOperation({
    summary: 'List all categories with visible-product counts (for /shop strip + filters)',
  })
  async categories(): Promise<readonly TaxonomySummary[]> {
    const rows = await this.prisma.category.findMany({
      orderBy: { nameTr: 'asc' },
      select: {
        id: true,
        slug: true,
        nameTr: true,
        _count: { select: { products: { where: { status: 'visible' } } } },
      },
    });
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.nameTr,
      productCount: r._count.products,
    }));
  }

  @Get('brands')
  @ApiOperation({
    summary: 'List all brands with visible-product counts (for /shop filter dropdown)',
  })
  async brands(): Promise<readonly TaxonomySummary[]> {
    const rows = await this.prisma.brand.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        slug: true,
        name: true,
        _count: { select: { products: { where: { status: 'visible' } } } },
      },
    });
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      productCount: r._count.products,
    }));
  }
}
