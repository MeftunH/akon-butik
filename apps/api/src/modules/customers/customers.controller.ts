import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequiredUserId } from '../../common/decorators/current-user.decorator';
// NestJS DI requires the runtime class — `import type` would tree-shake.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CustomersService } from './customers.service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customers: CustomersService,
  ) {}

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
  addresses(@RequiredUserId() userId: string) {
    return this.customers.listAddresses(userId);
  }

  @Post('me/addresses')
  @ApiOperation({ summary: 'Create a new address for the current user' })
  createAddress(@RequiredUserId() userId: string, @Body() dto: CreateAddressDto) {
    return this.customers.createAddress(userId, dto);
  }

  @Patch('me/addresses/:id')
  @ApiOperation({ summary: 'Update one of the current user’s addresses' })
  updateAddress(
    @RequiredUserId() userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.customers.updateAddress(userId, id, dto);
  }

  @Delete('me/addresses/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete one of the current user’s addresses' })
  async deleteAddress(@RequiredUserId() userId: string, @Param('id') id: string): Promise<void> {
    await this.customers.deleteAddress(userId, id);
  }

  @Post('me/addresses/:id/default')
  @ApiOperation({
    summary:
      'Mark this address as the default for its type (clears the previous default in the same transaction)',
  })
  setDefaultAddress(@RequiredUserId() userId: string, @Param('id') id: string) {
    return this.customers.setDefaultAddress(userId, id);
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
  async order(@RequiredUserId() userId: string, @Param('orderNumber') orderNumber: string) {
    const order = await this.prisma.order.findFirst({
      where: { userId, orderNumber },
      include: { items: true, payments: true, shipments: true },
    });
    if (!order) throw new NotFoundException();
    return order;
  }
}
