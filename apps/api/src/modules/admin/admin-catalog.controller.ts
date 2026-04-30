import type { Prisma } from '@akonbutik/database';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';
// NestJS DI needs the runtime class — `import type` would tree-shake.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

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

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;

@ApiTags('admin')
@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminCatalogController {
  constructor(private readonly prisma: PrismaService) {}

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
