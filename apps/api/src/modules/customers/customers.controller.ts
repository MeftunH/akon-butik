import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequiredUserId } from '../../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('me')
  @ApiOperation({ summary: 'Read the current user profile' })
  async me(@RequiredUserId() userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        adSoyad: true,
        telefon: true,
        diaCarikartKodu: true,
        emailVerifiedAt: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  @Get('me/addresses')
  @ApiOperation({ summary: 'List the current user’s addresses' })
  async addresses(@RequiredUserId() userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  @Get('me/orders')
  @ApiOperation({ summary: 'List the current user’s orders, newest first' })
  async orders(@RequiredUserId() userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalMinor: true,
        currency: true,
        diaSiparisKodu: true,
        createdAt: true,
        items: { select: { quantity: true } },
      },
    });
    return orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      status: o.status,
      totalMinor: o.totalMinor,
      currency: o.currency,
      diaSiparisKodu: o.diaSiparisKodu,
      itemCount: o.items.reduce((acc, i) => acc + i.quantity, 0),
      createdAt: o.createdAt.toISOString(),
    }));
  }

  @Get('me/orders/:orderNumber')
  @ApiOperation({ summary: 'Read one of the current user’s orders by order number' })
  async order(
    @RequiredUserId() userId: string,
    @Param('orderNumber') orderNumber: string,
  ) {
    const order = await this.prisma.order.findFirst({
      where: { userId, orderNumber },
      include: { items: true, payments: true, shipments: true },
    });
    if (!order) throw new NotFoundException();
    return order;
  }
}
