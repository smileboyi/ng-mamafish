import { Injectable } from '@angular/core';
import { Router, Params } from '@angular/router';
import { throttle, debounce, cloneDeep } from 'lodash';
import { Observable, Observer } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs/Subject';

import {
  navigationConfig,
  menuIdPathSet,
  NavigationItem,
} from '@config/navigation.config';
import { GlobalService } from '@services/global.service';

/**
 * 基础服务
 */
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  static menuItemChange$: Subject<any> = new Subject<any>();

  constructor(private router: Router, private modal: NzModalService) {}

  // 节流装饰器
  static throttle(delay: number = 100): MethodDecorator {
    return (
      _target: any,
      _propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) => {
      const original = descriptor.value;
      descriptor.value = throttle(original, delay);
      return descriptor;
    };
  }

  // 防抖装饰器
  static debounce(delay: number = 100): MethodDecorator {
    return (
      _target: any,
      _propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) => {
      const original = descriptor.value;
      descriptor.value = debounce(original, delay);
      return descriptor;
    };
  }

  getMobileState(): boolean {
    return window.innerWidth <= GlobalService.mobileWidth;
  }

  getMiniState(): boolean {
    return window.innerWidth <= GlobalService.miniWidth;
  }

  // 根据页面id返回页面路径
  getPagePath(pageId: string): string {
    let idPathStr = '';
    menuIdPathSet.forEach((path) => {
      if (path.includes(pageId)) {
        idPathStr = path;
      }
    });
    let idPathArr = idPathStr.split('/');
    idPathArr = idPathArr.reverse();
    idPathArr.length = idPathArr.length - 1;
    idPathArr = idPathArr.reverse();
    let obj: any = cloneDeep(navigationConfig);
    const len = idPathArr.length;
    idPathArr.forEach((id: string, idx: number) => {
      const a: any = obj.find((item: NavigationItem) => item.id === id);
      obj = len - 1 > idx ? cloneDeep(a.children) : a;
    });
    return '/' + obj.url.join('/');
  }

  // 根据页面路径返回页面id
  getRouteId(): string {
    const routeId: string = location.pathname.split('/').reverse()[0];
    if (routeId === '403') {
      return 'error_403';
    } else if (routeId === '404') {
      return 'error_404';
    } else if (routeId === '500') {
      return 'error_500';
    } else {
      return routeId;
    }
  }

  /**
   * 页面跳转
   * @param pageId - 页面路由id
   * @param hashConfig - 地址哈希
   * @param paramConfig - 地址参数
   */
  gotoOtherPage(
    pageId: string,
    hashConfig?: Array<string | number>,
    paramConfig?: Params
  ): void {
    let path = this.getPagePath(pageId);
    // 去掉':code'类似的字符串
    path = path.split(':')[0];
    this.router.navigate([path, ...(hashConfig || [])], {
      queryParams: paramConfig,
    });
  }

  /**
   * 表单未保存或提交，离开页面时弹出确认框
   */
  canActivateModal(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.modal.confirm({
        nzTitle: '确认要离开这个页面吗？',
        nzContent:
          '这个页面有未提交的的信息，如果离开页面将丢失所有未提交的信息。确认要离开这个页面吗？',
        nzOkText: '确认',
        nzCancelText: '取消',
        nzOnOk: () => observer.next(true),
        nzOnCancel: () => {
          // 修正menuItem选中位置
          UtilsService.menuItemChange$.next();
          observer.next(false);
        },
      });
    });
  }
}
