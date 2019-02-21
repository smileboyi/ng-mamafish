import { Injectable } from '@angular/core';

import { UserRole } from '@declare';

/**
 * 存放全局变量的服务
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isMobile: boolean = false;
  moreHeaderState: boolean = false;
  userRole: UserRole = UserRole.Manager;

  constructor() {}
}
