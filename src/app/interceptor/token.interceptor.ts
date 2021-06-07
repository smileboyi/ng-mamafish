import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { GlobalService } from '@services/global.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private global: GlobalService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
    const accessToken = this.global.userInfo.token?.accessToken;
    if (accessToken) {
      const tokenReq = req.clone({
        setHeaders: { Authorization: 'bearer ' + accessToken },
      });
      return next.handle(tokenReq);
    } else {
      return next.handle(req);
    }
  }
}
