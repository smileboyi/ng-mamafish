import { Injectable, ɵConsole } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { GlobalService } from '@services/global.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private global: GlobalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.global.userInfo.token.accessToken;
    if (accessToken) {
      const tokenReq = req.clone({
        setHeaders: { Authorization: 'bearer ' + accessToken }
      });
      return next.handle(tokenReq);
    } else {
      return next.handle(req);
    }
  }
}
