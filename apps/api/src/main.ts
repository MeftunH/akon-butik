import 'reflect-metadata';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import helmet from '@fastify/helmet';
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
  await app.register(helmet as never, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // tighten in Phase 6
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  app.enableCors({
    origin: config.get('CORS_ORIGINS', { infer: true }),
    credentials: true,
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
