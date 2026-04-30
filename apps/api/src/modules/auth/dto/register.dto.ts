import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 10 })
  @IsString()
  @Length(10, 128)
  password!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 120)
  adSoyad!: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(\+?90|0)?5\d{9}$/, { message: 'Geçerli bir Türk cep telefonu girin' })
  telefon!: string;

  @ApiProperty()
  @IsBoolean()
  kvkkAccepted!: boolean;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}
