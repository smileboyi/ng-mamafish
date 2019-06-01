import { Injectable } from '@angular/core';

import { UserRole, UserInfo } from '@declare';

/**
 * 存放全局变量的服务
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // < 620px （页面状态可以使用rxjs,这样不用在多个页面去监听window resize获取状态）
  isMobile = false;
  // < 450px
  isMini = false;
  moreHeaderState = false;
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
  pageRouteInfo: any;
  selectMenuItemId: string;

  constructor() {}
}
