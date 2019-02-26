import { Injectable, HostListener } from '@angular/core';

/**
 * 基础服务
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

  getMobileState(): boolean {
    return window.innerWidth <= 600;
  }
}
