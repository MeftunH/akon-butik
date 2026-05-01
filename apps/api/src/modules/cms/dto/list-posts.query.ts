import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/**
 * Query DTO for the public `GET /cms/posts` endpoint. All fields optional;
 * defaults applied at the service layer.
 */
export class ListPostsQuery {
  @ApiPropertyOptional({ description: 'Filter by category slug' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Filter by tag slug' })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(60)
  pageSize?: number;
}
