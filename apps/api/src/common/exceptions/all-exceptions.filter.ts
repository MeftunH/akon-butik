import {
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  type ArgumentsHost,
  type ExceptionFilter,
} from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

interface ErrorBody {
  statusCode: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  requestId?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<FastifyRequest>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const baseMessage = isHttp ? exception.message : 'Internal server error';

    const body: ErrorBody = {
      statusCode: status,
      error: isHttp ? exception.name : 'InternalServerError',
      message: baseMessage,
      path: req.url,
      timestamp: new Date().toISOString(),
      requestId: req.id as string | undefined,
    };

    if (status >= 500) {
      this.logger.error(
        { err: exception, path: req.url, requestId: body.requestId },
        baseMessage,
      );
    }

    void reply.status(status).send(body);
  }
}
