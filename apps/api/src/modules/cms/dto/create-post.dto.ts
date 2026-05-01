import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Body DTO for `POST /admin/cms/posts`. The shape mirrors `BlogPost` plus a
 * couple of relation conveniences (`categorySlug`, `tagSlugs`) so the admin
 * UI never has to know about the underlying record IDs.
 */
export class CreatePostDto {
  @ApiProperty({ description: 'URL-safe slug; must be unique' })
  @IsString()
  @MinLength(2)
  @MaxLength(160)
  slug!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  titleTr!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(280)
  excerpt?: string;

  @ApiProperty({ description: 'Markdown body' })
  @IsString()
  @MinLength(1)
  bodyMd!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  coverUrl?: string;

  @ApiPropertyOptional({ description: 'Slug of an existing BlogCategory' })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  categorySlug?: string;

  @ApiPropertyOptional({
    description: 'Tag slugs; missing tags are auto-created using the slug as the display name.',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  tagSlugs?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(320)
  metaDescription?: string;

  @ApiPropertyOptional({
    description: 'ISO timestamp; null/omitted = draft. Future dates schedule the post.',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  publishedAt?: Date;
}
