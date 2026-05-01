import type { AddressType } from '@akonbutik/database';
import { type Address } from '@akonbutik/database';
import { Injectable, NotFoundException } from '@nestjs/common';

// NestJS DI requires the runtime class — `import type` would tree-shake.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

import type { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';

/**
 * Customer self-service — address CRUD. Every method takes a `userId`
 * (extracted from the JWT cookie via `@RequiredUserId()`) and enforces
 * ownership before touching the row, so a malicious caller can't PATCH
 * or DELETE someone else's address by guessing ids.
 *
 * Default flip is transactional: when the customer marks an address as
 * the default for a type, we clear the previous default in the same
 * transaction so the DB never has two defaults of the same type.
 */
@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  listAddresses(userId: string): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async createAddress(userId: string, dto: CreateAddressDto): Promise<Address> {
    return this.prisma.$transaction(async (tx) => {
      if (dto.isDefault === true) {
        await tx.address.updateMany({
          where: { userId, type: dto.type as AddressType, isDefault: true },
          data: { isDefault: false },
        });
      }
      const data: {
        userId: string;
        type: AddressType;
        adSoyad: string;
        telefon: string;
        il: string;
        ilce: string;
        acikAdres: string;
        postaKodu: string;
        isDefault: boolean;
        label?: string;
      } = {
        userId,
        type: dto.type as AddressType,
        adSoyad: dto.adSoyad,
        telefon: dto.telefon,
        il: dto.il,
        ilce: dto.ilce,
        acikAdres: dto.acikAdres,
        postaKodu: dto.postaKodu,
        isDefault: dto.isDefault ?? false,
      };
      if (dto.label !== undefined) data.label = dto.label;
      return tx.address.create({ data });
    });
  }

  async updateAddress(userId: string, id: string, dto: UpdateAddressDto): Promise<Address> {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.address.findUnique({ where: { id } });
      if (!existing || existing.userId !== userId) {
        throw new NotFoundException();
      }
      if (dto.isDefault === true) {
        const targetType = (dto.type ?? existing.type) as AddressType;
        await tx.address.updateMany({
          where: {
            userId,
            type: targetType,
            isDefault: true,
            NOT: { id },
          },
          data: { isDefault: false },
        });
      }
      const data: {
        type?: AddressType;
        adSoyad?: string;
        telefon?: string;
        il?: string;
        ilce?: string;
        acikAdres?: string;
        postaKodu?: string;
        isDefault?: boolean;
        label?: string;
      } = {};
      if (dto.type !== undefined) data.type = dto.type as AddressType;
      if (dto.adSoyad !== undefined) data.adSoyad = dto.adSoyad;
      if (dto.telefon !== undefined) data.telefon = dto.telefon;
      if (dto.il !== undefined) data.il = dto.il;
      if (dto.ilce !== undefined) data.ilce = dto.ilce;
      if (dto.acikAdres !== undefined) data.acikAdres = dto.acikAdres;
      if (dto.postaKodu !== undefined) data.postaKodu = dto.postaKodu;
      if (dto.isDefault !== undefined) data.isDefault = dto.isDefault;
      if (dto.label !== undefined) data.label = dto.label;
      return tx.address.update({ where: { id }, data });
    });
  }

  async deleteAddress(userId: string, id: string): Promise<void> {
    const existing = await this.prisma.address.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      throw new NotFoundException();
    }
    await this.prisma.address.delete({ where: { id } });
  }

  async setDefaultAddress(userId: string, id: string): Promise<Address> {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.address.findUnique({ where: { id } });
      if (!existing || existing.userId !== userId) {
        throw new NotFoundException();
      }
      await tx.address.updateMany({
        where: {
          userId,
          type: existing.type,
          isDefault: true,
          NOT: { id },
        },
        data: { isDefault: false },
      });
      return tx.address.update({
        where: { id },
        data: { isDefault: true },
      });
    });
  }
}
