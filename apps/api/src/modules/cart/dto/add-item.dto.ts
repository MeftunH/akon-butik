import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class AddItemDto {
  @ApiProperty()
  @IsString()
  variantId!: string;

  @ApiProperty({ minimum: 1, maximum: 99, default: 1 })
  @IsInt()
  @Min(1)
  @Max(99)
  quantity!: number;
}

export class UpdateItemQuantityDto {
  @ApiProperty({ minimum: 0, maximum: 99 })
  @IsInt()
  @Min(0)
  @Max(99)
  quantity!: number;
}
