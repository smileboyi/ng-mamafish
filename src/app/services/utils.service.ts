import { map } from 'rxjs/operators';
import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { navigationConfig, menuIdPathSet } from '@config/navigation.config';

/**
 * 基础服务
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private router: Router) {}

  getMobileState(): boolean {
    return window.innerWidth <= 600;
  }

  // 根据页面id返回页面路径
  getPagePath(pageId: string): string {
    let idPathStr = '';
    menuIdPathSet.forEach(path => {
      if (path.includes(pageId)) {
        idPathStr = path;
      }
    });
    let idPathArr = idPathStr.split('/');
    idPathArr = idPathArr.reverse();
    idPathArr.length = idPathArr.length - 1;
    idPathArr = idPathArr.reverse();
    let obj = _.cloneDeep(navigationConfig);
    const len = idPathArr.length;
    idPathArr.forEach((id: string, idx: number) => {
      const a = obj.find(item => item.id === id);
      obj = len - 1 > idx ? _.cloneDeep(a.children) : a;
    });
    return '/' + obj.url.join('/');
  }

  /**
   * 页面跳转
   * @param pageId - 页面路由id
   * @param hashConfig - 地址哈希
   * @param paramConfig - 地址参数
   */
  gotoOtherPage(
    pageId: string,
    hashConfig: Array<string | number> = [],
    paramConfig: Object = {}
  ): void {
    let path = this.getPagePath(pageId);
    // 去掉':code'类似的字符串
    path = path.split(':')[0];
    const pathArr = [path, ...hashConfig];
    this.router.navigate([path, ...hashConfig], {
      queryParams: paramConfig
    });
  }
}
