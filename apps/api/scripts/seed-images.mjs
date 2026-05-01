/* eslint-disable no-console, no-restricted-syntax */
// Seed product images by copying curated vendor fashion images into the api
// storage directory and writing one ProductImage row per product that has none.
//
// Idempotent: subsequent runs skip products that already have at least one
// ProductImage. Vendor images live under `vendor/ochaka-theme/...` and are
// licensed for use within this project (theme purchase).
//
// Usage:
//   node scripts/seed-images.mjs            # do the work
//   node scripts/seed-images.mjs --dry-run  # plan only; no copies, no DB writes

import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { PrismaClient } from '@akonbutik/database';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(SCRIPT_DIR, '..');
const REPO_ROOT = path.resolve(API_ROOT, '..', '..');
const VENDOR_IMAGES = path.join(REPO_ROOT, 'vendor', 'ochaka-theme', 'reactjs', 'public', 'images');

const TARGET_PRODUCT_COUNT = 50;
const BLOG_COUNT = 12;
const ABOUT_GALLERY_COUNT = 4;

const dryRun = process.argv.includes('--dry-run');

function log(msg) {
  console.log(msg);
}

function resolveStorageRoot() {
  const fromEnv = process.env.IMAGE_STORAGE_ROOT;
  const raw = fromEnv && fromEnv.length > 0 ? fromEnv : './storage';
  return path.isAbsolute(raw) ? raw : path.resolve(API_ROOT, raw);
}

async function pathExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir) {
  if (dryRun) return;
  await mkdir(dir, { recursive: true });
}

async function copy(src, dest) {
  if (dryRun) return;
  await copyFile(src, dest);
}

async function listJpgs(dir) {
  if (!(await pathExists(dir))) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => {
      // Sort numerically when names share a "<prefix>-<n>.jpg" shape.
      const re = /(\d+)/;
      const am = re.exec(a);
      const bm = re.exec(b);
      if (am && bm) return Number(am[1]) - Number(bm[1]);
      return a.localeCompare(b);
    });
}

async function copyProductImages(storageRoot) {
  const targetDir = path.join(storageRoot, 'seed', 'products');
  await ensureDir(targetDir);

  const fashionDir = path.join(VENDOR_IMAGES, 'products', 'fashion');
  const topLevelDir = path.join(VENDOR_IMAGES, 'products');

  const fashionFiles = await listJpgs(fashionDir);
  const picked = [];
  const seen = new Set();

  for (const name of fashionFiles) {
    if (picked.length >= TARGET_PRODUCT_COUNT) break;
    picked.push({ src: path.join(fashionDir, name), name });
    seen.add(name);
  }

  if (picked.length < TARGET_PRODUCT_COUNT) {
    const topLevelAll = await listJpgs(topLevelDir);
    const topLevelFiles = topLevelAll.filter((n) => /^product-\d+\.jpg$/i.test(n));
    for (const name of topLevelFiles) {
      if (picked.length >= TARGET_PRODUCT_COUNT) break;
      // Avoid name collisions between fashion/ and top-level/ when copying
      // into the same destination directory.
      const destName = seen.has(name) ? `top-${name}` : name;
      picked.push({ src: path.join(topLevelDir, name), name: destName });
      seen.add(destName);
    }
  }

  for (const { src, name } of picked) {
    await copy(src, path.join(targetDir, name));
  }

  return picked.map(({ name }) => name);
}

async function copyBlogImages(storageRoot) {
  const targetDir = path.join(storageRoot, 'seed');
  await ensureDir(targetDir);

  const blogDir = path.join(VENDOR_IMAGES, 'blog');
  let copied = 0;
  for (let i = 1; i <= BLOG_COUNT; i += 1) {
    const fileName = `blog-${String(i)}.jpg`;
    const src = path.join(blogDir, fileName);
    if (!(await pathExists(src))) continue;
    await copy(src, path.join(targetDir, fileName));
    copied += 1;
  }
  return copied;
}

async function copyAboutAndContactImages(storageRoot) {
  const targetDir = path.join(storageRoot, 'seed');
  await ensureDir(targetDir);

  const galleryDir = path.join(VENDOR_IMAGES, 'gallery');
  const sectionDir = path.join(VENDOR_IMAGES, 'section');
  let copied = 0;

  for (let i = 1; i <= ABOUT_GALLERY_COUNT; i += 1) {
    const fileName = `about-${String(i)}.jpg`;
    const src = path.join(galleryDir, fileName);
    if (!(await pathExists(src))) continue;
    await copy(src, path.join(targetDir, fileName));
    copied += 1;
  }

  for (const fileName of ['about-us.jpg', 'contact-information.jpg']) {
    const src = path.join(sectionDir, fileName);
    if (!(await pathExists(src))) continue;
    await copy(src, path.join(targetDir, fileName));
    copied += 1;
  }

  return copied;
}

async function writeProductImageRows(productImageFiles) {
  if (productImageFiles.length === 0) {
    log('no product images available to assign — skipping DB writes');
    return { written: 0, skipped: 0 };
  }

  const prisma = new PrismaClient();
  try {
    const productsWithoutImages = await prisma.product.findMany({
      where: { images: { none: {} } },
      select: { id: true },
      orderBy: { createdAt: 'asc' },
    });

    const totalProducts = await prisma.product.count();
    const skipped = totalProducts - productsWithoutImages.length;

    if (dryRun) {
      return { written: productsWithoutImages.length, skipped };
    }

    let written = 0;
    for (let i = 0; i < productsWithoutImages.length; i += 1) {
      const { id } = productsWithoutImages[i];
      const fileName = productImageFiles[i % productImageFiles.length];
      await prisma.productImage.create({
        data: {
          productId: id,
          url: `/uploads/seed/products/${fileName}`,
          sortOrder: 0,
          isPrimary: true,
          source: 'manual',
        },
      });
      written += 1;
    }

    return { written, skipped };
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const storageRoot = resolveStorageRoot();
  log(`mode: ${dryRun ? 'DRY-RUN' : 'WRITE'}`);
  log(`storage root: ${storageRoot}`);

  await ensureDir(path.join(storageRoot, 'seed', 'products'));

  const productFiles = await copyProductImages(storageRoot);
  log(`copied ${String(productFiles.length)} product images`);

  const blogCopied = await copyBlogImages(storageRoot);
  log(`copied ${String(blogCopied)} blog images`);

  const aboutCopied = await copyAboutAndContactImages(storageRoot);
  log(`copied ${String(aboutCopied)} about images`);

  const { written, skipped } = await writeProductImageRows(productFiles);
  log(`wrote ${String(written)} ProductImage rows for products without an image`);
  log(`skipped ${String(skipped)} products that already had images`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
