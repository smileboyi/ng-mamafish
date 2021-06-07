import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { NgForage } from 'ngforage';
import { cloneDeep } from 'lodash';

import { navigationConfig, NavigationItem } from '@config/navigation.config';
import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';
import { UserRole } from '@declare';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userRole: UserRole;

  constructor(
    private ngForage: NgForage,
    private utils: UtilsService,
    public global: GlobalService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return true;
    const profileInfo: any = await this.ngForage.getItem('profile_info');
    if (!profileInfo) {
      // 未登录状态
      this.handleLogout();
      history.pushState(null, '', document.URL);
      const pathIds = state.url.split('/').reverse();
      this.utils.gotoOtherPage('login', [], {
        redirectUrl: pathIds[0],
      });
      return false;
    }
    this.userRole = profileInfo.userRole;
    const urlPathArr = state.url.split('/');
    urlPathArr.shift();
    const pathId = urlPathArr.shift();
    const navConfig = cloneDeep(navigationConfig);
    let navConfigItem: NavigationItem;
    if (pathId === 'general') {
      navConfigItem = navConfig[0];
    } else if (pathId === 'applications') {
      navConfigItem = navConfig[1];
    } else {
      navConfigItem = navConfig[2];
    }
    const bool = this.checkAuth(urlPathArr, navConfigItem);
    if (!bool) {
      // 通过菜单切换路由是有auth的，但是通过登录后重定向或者浏览器地址栏输入时会出现没有auth的情况
      this.utils.gotoOtherPage('errors', ['403']);
    }
    return bool;
  }

  /**
   * 在切换路由前，判断当前角色能否进入下一个路由
   */
  checkAuth(urlPathArr: Array<string>, navConfig: NavigationItem): boolean {
    if (navConfig.childrenIds) {
      const index = navConfig.childrenIds.indexOf(urlPathArr.shift() as string);
      navConfig = (navConfig as any).children[index];
      return this.checkAuth(urlPathArr, navConfig);
    } else {
      return this.userRole >= navConfig.role;
    }
  }

  handleLogout(): void {
    this.ngForage.clear();
    this.global.resetUserInfo();
    this.global.rsapubKey = '';
    this.global.userRole = UserRole.Visitor;
  }
}
