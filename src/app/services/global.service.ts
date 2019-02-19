import { Injectable } from '@angular/core';

/**
 * 存放全局变量的服务
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isMobile: boolean = false;

  constructor() {}
}
