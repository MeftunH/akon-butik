import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

/**
 * Patch DTO for `PATCH /admin/cms/posts/:id`. Every field optional; relation
 * fields use the same slug-based inputs as {@link CreatePostDto}. Pass
 * `publishedAt: null` (explicit) to unpublish.
 */
export class UpdatePostDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  titleTr?: string;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  @MaxLength(280)
  excerpt?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  bodyMd?: string;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  @MaxLength(500)
  coverUrl?: string | null;

  @ApiPropertyOptional({ description: 'Slug of category, or null to clear.' })
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  @MaxLength(160)
  categorySlug?: string | null;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  tagSlugs?: string[];

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsString()
  @MaxLength(320)
  metaDescription?: string | null;

  @ApiPropertyOptional({
    description: 'ISO timestamp; pass null to revert to draft.',
  })
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  publishedAt?: Date | null;
}
