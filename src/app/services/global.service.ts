import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserRole, UserInfo } from '@declare';

/**
 * 存放全局变量的服务
 */
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  static resetThemeColor$: Subject<any> = new Subject<any>();
  static mobileWidth = 620;
  static miniWidth = 450;
  // < mobileWidth （页面状态可以使用rxjs,这样不用在多个页面去监听window resize获取状态）
  isMobile = false;
  isMini = false;
  moreHeaderState = false;
  userRole: UserRole = UserRole.Dictator;
  userInfo: Partial<UserInfo>;
  permissionList: Array<string> = [];
  rsapubKey: string;
  // 所有subMenu展开状态量
  subMenuOpenState = {
    dashboards: false,
    pages: false,
    errors: false,
  };
  pageRouteInfo: any;
  selectMenuItemId: string;

  constructor() {}

  resetUserInfo(): void {
    this.userInfo = {
      avatar: null,
      createdDate: '',
      email: '',
      id: 0,
      lastSignInAt: '',
      lastSignInIp: '',
      layoutConfig: null,
      signInCount: 0,
      token: {
        accessToken: '',
        expiresIn: 0,
      },
      userRole: {
        description: '',
        id: 0,
        role: '',
        value: '',
      },
      username: '',
    };
  }
}
