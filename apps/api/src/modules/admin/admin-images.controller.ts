import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
import type { FastifyRequest } from 'fastify';

import { AdminAuthGuard } from '../../common/guards/admin-auth.guard';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';
import { IMAGE_STORAGE, type ImageStorage } from '../storage/image-storage.port';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { RevalidationService } from '../storefront/revalidation.service';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;
const MAX_BYTES = 5 * 1024 * 1024;

class UpdateImageDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

interface ProductImageDto {
  id: string;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
  source: 'dia' | 'manual';
  createdAt: string;
}

// `@fastify/multipart` augments FastifyRequest with `file()` and
// `isMultipart()` at the type level, so we don't need to redeclare them.

@ApiTags('admin')
@UseGuards(AdminAuthGuard)
@Controller('admin/products/:productId/images')
export class AdminImagesController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(IMAGE_STORAGE) private readonly storage: ImageStorage,
    private readonly revalidation: RevalidationService,
  ) {}

  private async bustCache(productId: string): Promise<void> {
    const slug = await this.prisma.product
      .findUnique({ where: { id: productId }, select: { slug: true } })
      .then((p) => p?.slug);
    if (slug) {
      void this.revalidation.revalidate({
        paths: ['/shop', `/products/${slug}`],
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'List images for a product, ordered by sortOrder' })
  async list(@Param('productId') productId: string): Promise<ProductImageDto[]> {
    await this.requireProduct(productId);
    const rows = await this.prisma.productImage.findMany({
      where: { productId },
      orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
    return rows.map(toDto);
  }

  @Post()
  @ApiOperation({ summary: 'Upload a single image for a product (multipart)' })
  async upload(
    @Param('productId') productId: string,
    @Req() req: FastifyRequest,
  ): Promise<ProductImageDto> {
    const product = await this.requireProduct(productId);

    if (!req.isMultipart()) {
      throw new BadRequestException('multipart/form-data bekleniyor');
    }
    const file = await req.file();
    if (!file) {
      throw new BadRequestException('Dosya bulunamadı');
    }
    const mime = file.mimetype.toLowerCase();
    if (!ALLOWED_MIME.includes(mime as (typeof ALLOWED_MIME)[number])) {
      throw new BadRequestException(
        `Desteklenmeyen format: ${file.mimetype}. Kabul edilenler: ${ALLOWED_MIME.join(', ')}`,
      );
    }
    const bytes = await file.toBuffer();
    if (bytes.length > MAX_BYTES) {
      throw new BadRequestException(
        `Dosya çok büyük (${bytes.length.toString()}B > ${MAX_BYTES.toString()}B)`,
      );
    }

    const stored = await this.storage.save({
      productId: product.id,
      originalFilename: file.filename,
      mimeType: mime,
      bytes,
    });

    // New images go to the bottom of the order; first-ever image becomes primary.
    const existing = await this.prisma.productImage.count({ where: { productId } });
    const created = await this.prisma.productImage.create({
      data: {
        productId,
        url: stored.publicUrl,
        sortOrder: existing,
        isPrimary: existing === 0,
        source: 'manual',
      },
    });
    await this.bustCache(productId);
    return toDto(created);
  }

  @Patch(':imageId')
  @ApiOperation({
    summary: 'Update sortOrder or toggle isPrimary on a product image',
  })
  async update(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
    @Body() dto: UpdateImageDto,
  ): Promise<ProductImageDto> {
    await this.requireImage(productId, imageId);

    // Setting isPrimary=true must be a transactional swap so exactly
    // one row carries the flag.
    if (dto.isPrimary === true) {
      const updated = await this.prisma.$transaction(async (tx) => {
        await tx.productImage.updateMany({
          where: { productId, isPrimary: true, NOT: { id: imageId } },
          data: { isPrimary: false },
        });
        return tx.productImage.update({
          where: { id: imageId },
          data: {
            isPrimary: true,
            ...(dto.sortOrder !== undefined && { sortOrder: dto.sortOrder }),
          },
        });
      });
      await this.bustCache(productId);
      return toDto(updated);
    }

    const updated = await this.prisma.productImage.update({
      where: { id: imageId },
      data: {
        ...(dto.sortOrder !== undefined && { sortOrder: dto.sortOrder }),
        ...(dto.isPrimary === false && { isPrimary: false }),
      },
    });
    await this.bustCache(productId);
    return toDto(updated);
  }

  @Delete(':imageId')
  @ApiOperation({ summary: 'Remove an image (db row + storage object)' })
  async remove(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
  ): Promise<{ ok: true }> {
    const row = await this.requireImage(productId, imageId);
    const wasPrimary = row.isPrimary;

    await this.prisma.productImage.delete({ where: { id: imageId } });

    // Storage cleanup is best-effort — the DB row is the source of truth.
    // We extract the storage key from the public URL via the suffix after
    // IMAGE_PUBLIC_BASE_URL — but the URL was written directly so we can
    // derive the path under storage root via simple string ops.
    const storageKey = deriveStorageKey(row.url);
    if (storageKey) await this.storage.delete(storageKey);

    // If we removed the primary, promote the next one (lowest sortOrder).
    if (wasPrimary) {
      const next = await this.prisma.productImage.findFirst({
        where: { productId },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      });
      if (next) {
        await this.prisma.productImage.update({
          where: { id: next.id },
          data: { isPrimary: true },
        });
      }
    }
    await this.bustCache(productId);
    return { ok: true };
  }

  private async requireProduct(productId: string): Promise<{ id: string }> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    if (!product) throw new NotFoundException(`Ürün bulunamadı: ${productId}`);
    return product;
  }

  private async requireImage(productId: string, imageId: string) {
    const row = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });
    if (!row) {
      throw new NotFoundException('Görsel bulunamadı veya bu ürüne ait değil');
    }
    return row;
  }
}

function toDto(row: {
  id: string;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
  source: 'dia' | 'manual';
  createdAt: Date;
}): ProductImageDto {
  return {
    id: row.id,
    url: row.url,
    sortOrder: row.sortOrder,
    isPrimary: row.isPrimary,
    source: row.source,
    createdAt: row.createdAt.toISOString(),
  };
}

/**
 * Reverse the public URL into a storage key. We only attempt deletion when
 * the URL contains `/uploads/` (the only shape LocalImageStorage produces);
 * older `dia` rows that point at external CDN URLs are skipped — those
 * weren't uploaded by us in the first place.
 */
function deriveStorageKey(url: string): string | null {
  const idx = url.indexOf('/uploads/');
  if (idx === -1) return null;
  return url.slice(idx + '/uploads/'.length);
}
