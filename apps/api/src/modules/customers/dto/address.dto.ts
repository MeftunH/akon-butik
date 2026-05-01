import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const phoneRegex = /^(\+?90|0)?5\d{9}$/;
const postalRegex = /^\d{5}$/;

export enum AddressType {
  Fatura = 'fatura',
  Teslimat = 'teslimat',
}

/**
 * Validation matches the storefront `addressSchema` zod definition. TR
 * mobile phone regex is the same single source of truth used in the
 * checkout flow + auth registration. Postal code is the 5-digit TR PTT
 * standard.
 */
export class CreateAddressDto {
  @ApiProperty({ enum: AddressType })
  @IsEnum(AddressType)
  type!: AddressType;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  adSoyad!: string;

  @ApiProperty({ description: 'TR mobile in any of: +90/0/-leading or bare 5xxxxxxxxx' })
  @IsString()
  @Matches(phoneRegex, { message: 'Geçerli bir Türk cep telefonu girin' })
  telefon!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  il!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  ilce!: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  acikAdres!: string;

  @ApiProperty({ description: '5-digit Turkish postal code' })
  @IsString()
  @Matches(postalRegex, { message: '5 haneli posta kodu girin' })
  postaKodu!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(40)
  label?: string;

  @ApiPropertyOptional({ description: 'Mark as the default for this type on creation' })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
