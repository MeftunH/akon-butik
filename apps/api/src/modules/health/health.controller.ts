import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// NestJS DI requires runtime classes — `import type` would tree-shake the
// constructor parameter metadata reflect-metadata reads at boot.
/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
  type HealthCheckResult,
} from '@nestjs/terminus';

import { PrismaService } from '../prisma/prisma.service';

import { DiaHealthIndicator } from './dia.health';
import { RedisHealthIndicator } from './redis.health';
/* eslint-enable @typescript-eslint/consistent-type-imports */

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
    private readonly redis: RedisHealthIndicator,
    private readonly dia: DiaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Shallow check — Postgres only (used by load balancer)' })
  check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('database', this.prisma)]);
  }

  @Get('full')
  @HealthCheck()
  @ApiOperation({
    summary: 'Deep check — Postgres + Redis + DIA (returns 503 if any dependency is down)',
  })
  full(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.db.pingCheck('database', this.prisma),
      () => this.redis.ping('redis'),
      () => this.dia.ping('dia'),
    ]);
  }

  @Get('live')
  @ApiOperation({ summary: 'Liveness probe — process is up (no dependency checks)' })
  live(): { status: 'ok' } {
    return { status: 'ok' };
  }
}
