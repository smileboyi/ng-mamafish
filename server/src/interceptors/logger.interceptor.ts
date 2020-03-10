import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('mamafish') private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { ip, method, originalUrl, query, params, body } = req;
    const infos = {
      method,
      body,
      query,
      params,
      from: ip,
      path: originalUrl,
    };
    this.logger.http(infos);

    return next.handle();
  }
}
