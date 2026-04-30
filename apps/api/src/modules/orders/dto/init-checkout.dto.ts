import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @ApiProperty({ enum: ['fatura', 'teslimat'] })
  @IsEnum(['fatura', 'teslimat'])
  type!: 'fatura' | 'teslimat';

  @ApiProperty()
  @IsString()
  @Length(2, 120)
  adSoyad!: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(\+?90|0)?5\d{9}$/, { message: 'Geçerli bir Türk cep telefonu girin' })
  telefon!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 40)
  il!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 60)
  ilce!: string;

  @ApiProperty()
  @IsString()
  @Length(10, 500)
  acikAdres!: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d{5}$/, { message: '5 haneli posta kodu girin' })
  postaKodu!: string;
}

export class InitCheckoutDto {
  @ApiProperty()
  @IsEmail()
  customerEmail!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 120)
  customerName!: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(\+?90|0)?5\d{9}$/, { message: 'Geçerli bir Türk cep telefonu girin' })
  customerPhone!: string;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  billingAddress!: AddressDto;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  shippingAddress!: AddressDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
