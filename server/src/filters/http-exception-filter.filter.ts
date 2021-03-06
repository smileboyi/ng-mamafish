import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Logger } from 'winston';

import { HttpExceptionResponse } from '@declares/response.declare';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject('mamafish') private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message.message;
    const error = exception.message.error;
    message = message || error;

    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    const errorResponse: HttpExceptionResponse = {
      message,
      data: null,
      statusCode: status,
      method: request.method,
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
    };

    const account = request.session.account || 'anonymous';
    this.logger.error({
      errorMessage: message,
      statusCode: status,
      account,
    });

    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
