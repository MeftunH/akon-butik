import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type {
  HealthCheckService,
  PrismaHealthIndicator} from '@nestjs/terminus';
import {
  HealthCheck,
  type HealthCheckResult,
} from '@nestjs/terminus';

// NestJS DI requires the runtime class.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma/prisma.service';

import type { DiaHealthIndicator } from './dia.health';
import type { RedisHealthIndicator } from './redis.health';

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
