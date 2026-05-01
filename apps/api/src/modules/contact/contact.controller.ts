import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { FastifyRequest } from 'fastify';

// NestJS DI requires the runtime class — `import type` would silently break startup.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ContactService } from './contact.service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ContactMessageDto } from './dto/contact-message.dto';

/**
 * Public contact-form endpoint. Validation runs through the global
 * ValidationPipe (whitelisting strips unexpected fields, length /
 * email / consent rules live on the DTO). The throttler caps each
 * source IP at five submissions per minute to deter form spam without
 * blocking legitimate retries.
 */
@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Submit a contact-form message; emails the configured inbox' })
  async submit(@Body() dto: ContactMessageDto, @Req() req: FastifyRequest): Promise<{ ok: true }> {
    await this.contact.submit(dto, {
      ip: req.ip,
      userAgent: req.headers['user-agent'] ?? 'unknown',
    });
    return { ok: true };
  }
}
