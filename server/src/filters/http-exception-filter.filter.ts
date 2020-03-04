import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { HttpExceptionResponse } from '@beans/response.bean';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
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
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
