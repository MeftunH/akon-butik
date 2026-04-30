import { randomBytes } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { Injectable, Logger } from '@nestjs/common';
// NestJS DI reads constructor metadata at runtime — ConfigService MUST be
// a value import or the parameter binds to `Function` and DI fails at boot.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config';

import type { Env } from '../../config/env';

import type { ImageStorage, ImageWriteResult } from './image-storage.port';

/**
 * Filesystem adapter for ImageStorage.
 *
 * Layout under IMAGE_STORAGE_ROOT:
 *   products/<productId>/<random>-<sluggedOriginalName>.<ext>
 *
 * In dev, IMAGE_STORAGE_ROOT defaults to ./storage and IMAGE_PUBLIC_BASE_URL
 * to http://localhost:4000/uploads — Fastify serves the storage root at
 * /uploads (see ServeStaticModule wiring).
 *
 * In production on srv.csweb.com.tr, IMAGE_STORAGE_ROOT is
 * /home/akonbutik/public_html/uploads and IMAGE_PUBLIC_BASE_URL is
 * https://akonbutik.com/uploads — Apache serves the directory directly,
 * the Node process never has to handle GET requests for image bytes.
 *
 * Storage key shape: relative POSIX path under IMAGE_STORAGE_ROOT, e.g.
 *   products/cmokrygx30009atb41sy8b8js/6f3a-elbise.jpg
 * Used to compute both the disk path (for delete) and the public URL.
 */
@Injectable()
export class LocalImageStorage implements ImageStorage {
  private readonly logger = new Logger(LocalImageStorage.name);

  constructor(private readonly config: ConfigService<Env, true>) {}

  async save(args: {
    productId: string;
    originalFilename: string;
    mimeType: string;
    bytes: Buffer;
  }): Promise<ImageWriteResult> {
    const ext = pickExtension(args.mimeType, args.originalFilename);
    const baseName = sluggify(stripExt(args.originalFilename));
    const filename = `${randomBytes(4).toString('hex')}-${baseName}${ext}`;

    const root = this.absoluteRoot();
    const productDir = path.join(root, 'products', args.productId);
    const fullPath = path.join(productDir, filename);

    await mkdir(productDir, { recursive: true });
    await writeFile(fullPath, args.bytes);

    const storageKey = path.posix.join('products', args.productId, filename);
    const publicUrl = `${this.publicBase()}/${storageKey}`;

    this.logger.log(`wrote ${args.bytes.length.toString()} bytes to ${storageKey} → ${publicUrl}`);
    return { storageKey, publicUrl, filename };
  }

  async delete(storageKey: string): Promise<void> {
    if (!storageKey || storageKey.includes('..')) {
      this.logger.warn(`refusing to delete suspicious storage key: ${storageKey}`);
      return;
    }
    const fullPath = path.join(this.absoluteRoot(), storageKey);
    try {
      await rm(fullPath, { force: true });
      this.logger.log(`deleted ${storageKey}`);
    } catch (err) {
      this.logger.warn(
        `delete failed for ${storageKey}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  private absoluteRoot(): string {
    const root = this.config.get('IMAGE_STORAGE_ROOT', { infer: true });
    return path.isAbsolute(root) ? root : path.resolve(process.cwd(), root);
  }

  private publicBase(): string {
    return this.config.get('IMAGE_PUBLIC_BASE_URL', { infer: true }).replace(/\/+$/, '');
  }
}

const ALLOWED_EXTS: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/avif': '.avif',
};

function pickExtension(mimeType: string, filename: string): string {
  const fromMime = ALLOWED_EXTS[mimeType.toLowerCase()];
  if (fromMime) return fromMime;
  const ext = path.extname(filename).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
    return ext === '.jpeg' ? '.jpg' : ext;
  }
  // Fallback — admin layer should reject earlier, but never trust uploads.
  return '.bin';
}

function stripExt(filename: string): string {
  const ext = path.extname(filename);
  return ext ? filename.slice(0, -ext.length) : filename;
}

function sluggify(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'image'
  );
}
