import 'reflect-metadata';

import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import type { Env } from './config/env';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true, // we sit behind Apache mod_proxy in production
      bodyLimit: 5 * 1024 * 1024, // 5 MB — admin image upload
    }),
    { bufferLogs: true },
  );

  const config = app.get(ConfigService<Env, true>);
  const logger = app.get(Logger);
  app.useLogger(logger);

  // @fastify/helmet ships types for a slightly different Fastify version than
  // @nestjs/platform-fastify carries; the runtime contract is identical.
  // CSP keeps 'unsafe-inline' on script/style because Swagger UI bundles
  // its renderer as inline scripts at /api/docs; the storefront and
  // admin apps set their own (stricter) CSP via next.config.ts headers.
  await app.register(helmet as never, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
        formAction: ["'self'"],
        baseUri: ["'self'"],
      },
    },
    strictTransportSecurity: {
      maxAge: 31_536_000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  });

  app.enableCors({
    origin: config.get('CORS_ORIGINS', { infer: true }),
    credentials: true,
  });

  // Multipart upload — admin product image upload (Phase 5b).
  // 5 MB per file matches the ValidationPipe / Fastify body limit; the
  // controller layer enforces image-only mime types.
  await app.register(multipart as never, {
    limits: {
      fileSize: 5 * 1024 * 1024,
      files: 10,
    },
  });

  // Static asset serving for /uploads in development. In production the
  // images live under ~akonbutik/public_html/uploads and Apache serves
  // them directly — Node never sees the GET requests. Registering here
  // anyway is harmless when prod has IMAGE_PUBLIC_BASE_URL pointing at
  // akonbutik.com (Apache wins by being upstream of the Node process).
  const storageRoot = config.get('IMAGE_STORAGE_ROOT', { infer: true });
  const absoluteStorageRoot = path.isAbsolute(storageRoot)
    ? storageRoot
    : path.resolve(process.cwd(), storageRoot);
  await mkdir(absoluteStorageRoot, { recursive: true });
  await app.register(fastifyStatic as never, {
    root: absoluteStorageRoot,
    prefix: '/uploads/',
    decorateReply: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix('api');

  setupSwagger(app);

  const port = config.get('PORT', { infer: true });
  await app.listen(port, '0.0.0.0');
  logger.log(`API listening on http://localhost:${port.toString()} (docs at /api/docs)`);
}

function setupSwagger(app: INestApplication): void {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Akon Butik API')
      .setDescription('Backend API for the Akon Butik storefront and admin panel')
      .setVersion('0.0.0')
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup('api/docs', app, document);
}

void bootstrap();
