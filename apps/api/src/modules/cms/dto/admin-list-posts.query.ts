import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/**
 * Admin-side query for `/admin/cms/posts`. Adds a `status` filter so editors
 * can scope to drafts only, published only, or both.
 */
export class AdminListPostsQuery {
  @ApiPropertyOptional({ enum: ['all', 'draft', 'published'], default: 'all' })
  @IsOptional()
  @IsEnum(['all', 'draft', 'published'])
  status?: 'all' | 'draft' | 'published';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => value === 'true' || value === true)
  @IsBoolean()
  includeBody?: boolean;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;
}
