import type { Prisma } from '@akonbutik/database';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min, ValidateIf } from 'class-validator';

import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';
// NestJS DI needs the runtime class — `import type` would tree-shake.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { RevalidationService } from '../storefront/revalidation.service';

const ORDER_STATUSES = [
  'pending',
  'paid',
  'fulfilling',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
] as const;
type OrderStatusLiteral = (typeof ORDER_STATUSES)[number];

const PRODUCT_STATUSES = ['visible', 'hidden', 'needs_review'] as const;
type ProductStatusLiteral = (typeof PRODUCT_STATUSES)[number];

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;

class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nameTr?: string;

  @IsOptional()
  @IsString()
  descriptionMd?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  defaultPriceMinor?: number;

  @IsOptional()
  @IsIn(PRODUCT_STATUSES)
  status?: ProductStatusLiteral;

  // Allow null to disconnect the relation, otherwise must be a non-empty string.
  @IsOptional()
  @ValidateIf((_, v) => v !== null)
  @IsString()
  brandId?: string | null;

  @IsOptional()
  @ValidateIf((_, v) => v !== null)
  @IsString()
  categoryId?: string | null;
}

@ApiTags('admin')
@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminCatalogController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly revalidation: RevalidationService,
  ) {}

  @Get('products')
  @ApiOperation({ summary: 'Paginated product list with DIA sync metadata' })
  async listProducts(
    @Query('page') pageParam?: string,
    @Query('pageSize') pageSizeParam?: string,
    @Query('q') q?: string,
  ): Promise<{
    items: unknown[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        Number.parseInt(pageSizeParam ?? String(DEFAULT_PAGE_SIZE), 10) || DEFAULT_PAGE_SIZE,
      ),
    );
    const where = q
      ? {
          OR: [
            { nameTr: { contains: q, mode: 'insensitive' as const } },
            { slug: { contains: q, mode: 'insensitive' as const } },
            { diaParentKey: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [total, items] = await this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          slug: true,
          nameTr: true,
          status: true,
          defaultPriceMinor: true,
          currency: true,
          diaParentKey: true,
          diaSyncedAt: true,
          updatedAt: true,
          brand: { select: { id: true, name: true } },
          category: { select: { id: true, nameTr: true } },
          _count: { select: { variants: true } },
        },
      }),
    ]);

    return { items, total, page, pageSize };
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Single product with full edit-relevant detail' })
  async getProduct(@Param('id') id: string): Promise<unknown> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
        nameTr: true,
        descriptionMd: true,
        defaultPriceMinor: true,
        currency: true,
        status: true,
        diaParentKey: true,
        diaSyncedAt: true,
        createdAt: true,
        updatedAt: true,
        brand: { select: { id: true, name: true } },
        category: { select: { id: true, nameTr: true } },
        variants: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            sku: true,
            diaStokkartkodu: true,
            size: true,
            color: true,
            stockQty: true,
            priceOverrideMinor: true,
          },
        },
        images: {
          orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          select: {
            id: true,
            url: true,
            sortOrder: true,
            isPrimary: true,
            source: true,
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Ürün bulunamadı: ${id}`);
    }
    return product;
  }

  @Patch('products/:id')
  @ApiOperation({
    summary:
      'Update editable fields on a product (status / price / description / brand / category)',
  })
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<unknown> {
    const data: Prisma.ProductUpdateInput = {};
    if (dto.nameTr !== undefined) data.nameTr = dto.nameTr;
    if (dto.descriptionMd !== undefined) data.descriptionMd = dto.descriptionMd;
    if (dto.defaultPriceMinor !== undefined) data.defaultPriceMinor = dto.defaultPriceMinor;
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.brandId !== undefined) {
      data.brand = dto.brandId === null ? { disconnect: true } : { connect: { id: dto.brandId } };
    }
    if (dto.categoryId !== undefined) {
      data.category =
        dto.categoryId === null ? { disconnect: true } : { connect: { id: dto.categoryId } };
    }

    try {
      const updated = await this.prisma.product.update({ where: { id }, data });
      // Bust the storefront cache so visitors see the change immediately.
      // Failures are swallowed by RevalidationService so a stale cache
      // never breaks the admin write path.
      void this.revalidation.revalidate({
        paths: ['/shop', `/products/${updated.slug}`],
      });
      return updated;
    } catch (err: unknown) {
      // Prisma throws P2025 for missing record, P2003 for FK violation
      // when brandId/categoryId points at a row that doesn't exist.
      if (err instanceof Error && 'code' in err) {
        const code = (err as { code: string }).code;
        if (code === 'P2025') {
          throw new NotFoundException(`Ürün bulunamadı: ${id}`);
        }
        if (code === 'P2003') {
          throw new BadRequestException('Belirtilen marka veya kategori bulunamadı');
        }
      }
      throw err;
    }
  }

  @Get('orders')
  @ApiOperation({ summary: 'Paginated order list, newest first' })
  async listOrders(
    @Query('page') pageParam?: string,
    @Query('pageSize') pageSizeParam?: string,
    @Query('status') status?: string,
  ): Promise<{
    items: unknown[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        Number.parseInt(pageSizeParam ?? String(DEFAULT_PAGE_SIZE), 10) || DEFAULT_PAGE_SIZE,
      ),
    );
    const where: Prisma.OrderWhereInput = {};
    if (status && ORDER_STATUSES.includes(status as OrderStatusLiteral)) {
      where.status = status as OrderStatusLiteral;
    }

    const [total, items] = await this.prisma.$transaction([
      this.prisma.order.count({ where }),
      this.prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          orderNumber: true,
          status: true,
          totalMinor: true,
          currency: true,
          customerName: true,
          customerEmail: true,
          diaSiparisKodu: true,
          createdAt: true,
          paidAt: true,
          _count: { select: { items: true } },
        },
      }),
    ]);

    return { items, total, page, pageSize };
  }
}
