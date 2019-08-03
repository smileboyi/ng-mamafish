import { Injectable } from '@angular/core';
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
    const accessToken = this.global.userInfo.token.access_token;
    const tokenReq = req.clone({ setHeaders: { Authorization: accessToken } });
    return next.handle(tokenReq);
  }
}
