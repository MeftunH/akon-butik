import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

import { CurrentAdmin, type AdminPrincipal } from '../../common/decorators/current-admin.decorator';
import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';
// NestJS DI needs the runtime class.
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
type OrderStatus = (typeof ORDER_STATUSES)[number];

/**
 * Allowed status transitions. Linear forward flow with two cancel paths.
 * Refund only after the order has been paid.
 */
const ALLOWED_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['fulfilling', 'shipped', 'cancelled', 'refunded'],
  fulfilling: ['shipped', 'cancelled'],
  shipped: ['delivered', 'refunded'],
  delivered: ['refunded'],
  cancelled: [],
  refunded: [],
};

class TransitionOrderDto {
  @IsIn(ORDER_STATUSES)
  status!: OrderStatus;

  /** Free-form note about the transition (carrier name, refund reason, etc.). */
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}

@ApiTags('admin')
@UseGuards(AdminAuthGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Single order with items + payments + audit history' })
  async getOrder(@Param('id') id: string): Promise<unknown> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { orderBy: { id: 'asc' } },
        payments: { orderBy: { createdAt: 'desc' } },
        shipments: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!order) throw new NotFoundException(`Sipariş bulunamadı: ${id}`);

    const audit = await this.prisma.adminAuditLog.findMany({
      where: { entity: 'order', entityId: id },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        adminUser: { select: { id: true, name: true, email: true } },
      },
    });

    return { ...order, audit };
  }

  @Patch(':id/status')
  @ApiOperation({
    summary:
      'Move an order to a new status; only allowed transitions accepted. Writes an AdminAuditLog row.',
  })
  async transition(
    @Param('id') id: string,
    @Body() dto: TransitionOrderDto,
    @CurrentAdmin() admin: AdminPrincipal | null,
  ): Promise<unknown> {
    if (!admin) throw new BadRequestException('Admin oturumu okunamadı');

    const current = await this.prisma.order.findUnique({
      where: { id },
      select: { id: true, status: true, orderNumber: true },
    });
    if (!current) throw new NotFoundException(`Sipariş bulunamadı: ${id}`);

    const allowed = ALLOWED_TRANSITIONS[current.status];
    if (current.status === dto.status) {
      throw new BadRequestException(`Sipariş zaten "${dto.status}" durumunda`);
    }
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `"${current.status}" → "${dto.status}" geçişi geçersiz. ` +
          `İzin verilenler: ${allowed.length > 0 ? allowed.join(', ') : '(terminal)'}`,
      );
    }

    // Bookkeeping fields tracked alongside status changes.
    const now = new Date();
    const data: Record<string, unknown> = { status: dto.status };
    if (dto.status === 'paid') data.paidAt = now;
    if (dto.status === 'cancelled') data.cancelledAt = now;
    if (dto.status === 'refunded') data.refundedAt = now;

    const [updated] = await this.prisma.$transaction([
      this.prisma.order.update({ where: { id }, data }),
      this.prisma.adminAuditLog.create({
        data: {
          adminUserId: admin.id,
          action: 'order.status_change',
          entity: 'order',
          entityId: id,
          payload: {
            from: current.status,
            to: dto.status,
            orderNumber: current.orderNumber,
            note: dto.note ?? null,
          },
        },
      }),
    ]);

    return updated;
  }
}
