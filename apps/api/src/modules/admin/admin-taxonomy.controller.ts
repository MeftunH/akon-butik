import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';
// NestJS DI needs the runtime class.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

class CreateBrandDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  logoUrl?: string;
}

class UpdateBrandDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  logoUrl?: string;
}

class CreateCategoryDto {
  @IsString()
  @MaxLength(120)
  nameTr!: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  slug?: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}

class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  nameTr?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  slug?: string;

  @IsOptional()
  @IsString()
  parentId?: string | null;
}

/**
 * Brand + Category master-data CRUD for the admin app. Needed because the
 * akonbutik DIA tenant doesn't expose marka/kategori master tables — the
 * team curates them by hand from the admin panel and assigns them to
 * products via the product-edit form (see admin-catalog.controller).
 */
@ApiTags('admin')
@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminTaxonomyController {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Brands ───────────────────────────────────────────────────────────

  @Get('brands')
  @ApiOperation({ summary: 'List all brands (alphabetic)' })
  async listBrands(): Promise<unknown[]> {
    return this.prisma.brand.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        slug: true,
        name: true,
        logoUrl: true,
        diaMarkaKodu: true,
        _count: { select: { products: true } },
      },
    });
  }

  @Post('brands')
  @ApiOperation({ summary: 'Create a brand' })
  async createBrand(@Body() dto: CreateBrandDto): Promise<unknown> {
    const slug = dto.slug ?? slugify(dto.name);
    if (!slug) throw new BadRequestException('Slug üretilemedi');
    try {
      return await this.prisma.brand.create({
        data: { name: dto.name, slug, logoUrl: dto.logoUrl ?? null },
      });
    } catch (err) {
      throw rethrowConflict(err, 'Marka', 'slug');
    }
  }

  @Patch('brands/:id')
  @ApiOperation({ summary: 'Update a brand' })
  async updateBrand(@Param('id') id: string, @Body() dto: UpdateBrandDto): Promise<unknown> {
    try {
      return await this.prisma.brand.update({
        where: { id },
        data: {
          ...(dto.name !== undefined && { name: dto.name }),
          ...(dto.slug !== undefined && { slug: dto.slug }),
          ...(dto.logoUrl !== undefined && { logoUrl: dto.logoUrl }),
        },
      });
    } catch (err) {
      throw rethrowNotFound(err, `Marka bulunamadı: ${id}`);
    }
  }

  @Delete('brands/:id')
  @ApiOperation({ summary: 'Delete a brand (products lose the brand relation)' })
  async deleteBrand(@Param('id') id: string): Promise<{ ok: true }> {
    try {
      await this.prisma.brand.delete({ where: { id } });
      return { ok: true };
    } catch (err) {
      throw rethrowNotFound(err, `Marka bulunamadı: ${id}`);
    }
  }

  // ─── Categories ───────────────────────────────────────────────────────

  @Get('categories')
  @ApiOperation({ summary: 'List all categories (sortOrder then name)' })
  async listCategories(): Promise<unknown[]> {
    return this.prisma.category.findMany({
      orderBy: [{ sortOrder: 'asc' }, { nameTr: 'asc' }],
      select: {
        id: true,
        slug: true,
        nameTr: true,
        parentId: true,
        sortOrder: true,
        diaKategoriKodu: true,
        _count: { select: { products: true } },
      },
    });
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create a category' })
  async createCategory(@Body() dto: CreateCategoryDto): Promise<unknown> {
    const slug = dto.slug ?? slugify(dto.nameTr);
    if (!slug) throw new BadRequestException('Slug üretilemedi');
    try {
      return await this.prisma.category.create({
        data: {
          nameTr: dto.nameTr,
          slug,
          ...(dto.parentId && { parent: { connect: { id: dto.parentId } } }),
        },
      });
    } catch (err) {
      throw rethrowConflict(err, 'Kategori', 'slug');
    }
  }

  @Patch('categories/:id')
  @ApiOperation({ summary: 'Update a category' })
  async updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<unknown> {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: {
          ...(dto.nameTr !== undefined && { nameTr: dto.nameTr }),
          ...(dto.slug !== undefined && { slug: dto.slug }),
          ...(dto.parentId !== undefined && {
            parent:
              dto.parentId === null ? { disconnect: true } : { connect: { id: dto.parentId } },
          }),
        },
      });
    } catch (err) {
      throw rethrowNotFound(err, `Kategori bulunamadı: ${id}`);
    }
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete a category (products + children unlinked)' })
  async deleteCategory(@Param('id') id: string): Promise<{ ok: true }> {
    try {
      await this.prisma.category.delete({ where: { id } });
      return { ok: true };
    } catch (err) {
      throw rethrowNotFound(err, `Kategori bulunamadı: ${id}`);
    }
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function rethrowConflict(err: unknown, entity: string, field: string): Error {
  if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2002') {
    return new ConflictException(`${entity} ${field} zaten kullanılıyor`);
  }
  return err instanceof Error ? err : new Error(String(err));
}

function rethrowNotFound(err: unknown, message: string): Error {
  if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
    return new NotFoundException(message);
  }
  return err instanceof Error ? err : new Error(String(err));
}
