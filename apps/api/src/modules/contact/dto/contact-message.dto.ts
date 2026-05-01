import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsBoolean, IsEmail, IsString, Length } from 'class-validator';

/**
 * Inbound payload for the public contact form. Length bounds match the
 * front-end form validation; class-validator runs through the global
 * ValidationPipe so any deviation 400s before the controller is hit.
 *
 * `kvkkConsent` MUST be `true` — under Turkish data-protection rules the
 * form cannot be submitted without explicit consent. `Equals(true)` makes
 * "missing" and "false" both fail with the same friendly message.
 */
export class ContactMessageDto {
  @ApiProperty({ minLength: 2, maxLength: 80 })
  @IsString()
  @Length(2, 80, { message: 'Adınızı yazın (2-80 karakter)' })
  name!: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Geçerli bir e-posta girin' })
  email!: string;

  @ApiProperty({ minLength: 4, maxLength: 120 })
  @IsString()
  @Length(4, 120, { message: 'Konuyu yazın (4-120 karakter)' })
  subject!: string;

  @ApiProperty({ minLength: 10, maxLength: 2000 })
  @IsString()
  @Length(10, 2000, { message: 'Mesajınızı yazın (10-2000 karakter)' })
  message!: string;

  @ApiProperty()
  @IsBoolean()
  @Equals(true, { message: 'KVKK aydınlatma metnini onaylayın' })
  kvkkConsent!: boolean;
}
