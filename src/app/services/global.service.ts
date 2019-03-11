import { Injectable } from '@angular/core';

import { UserRole, UserInfo } from '@declare';

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
  userInfo: UserInfo = {
    name: '',
    token: ''
  };
  permissionList: Array<string> = [];
  // 所有subMenu展开状态量
  subMenuOpenState = {
    dashboards: false,
    pages: false,
    errors: false
  };

  constructor() {}
}
