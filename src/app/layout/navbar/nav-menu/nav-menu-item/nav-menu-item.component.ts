import { Component, OnInit, Input } from '@angular/core';

import {
  navigationConfig,
  NavigationItem,
  equalLevelsubMenuInfo,
  relyLevelsubMenuInfo
} from '@config/navigation.config';
import { GlobalService } from '@services/global.service';
import * as _ from 'lodash';

// 返回所有NavigationItem中id的集合
const getIdFromArr = (arr: Array<NavigationItem>): Array<any> => {
  return arr.map(item => {
    if (item.children) {
      return {
        [item.id]: getIdFromArr(item.children)
      };
    } else {
      return item.id;
    }
  });
};

// 返回所有NavigationItem中根节点到叶节点的path
const getMenuItemPath = (arr: Array<any>, path: string = ''): Array<any> => {
  return arr.map(item => {
    if (typeof item === 'object') {
      const keys: Array<string> = Object.keys(item);
      const id: string = keys[0];
      const a: Array<any> = item[id];
      return getMenuItemPath(a, path + `/${id}`);
    } else {
      return path + `/${item}`;
    }
  });
};

const menuIdSet: Array<any> = getIdFromArr(navigationConfig);
const menuPathSet: Array<string> = _.flattenDeep(getMenuItemPath(menuIdSet));

/**
 * 返回当前点击subMenu的层级位置
 * @param id - 点击的submenu的id
 */
const getClickSubMenuIdx = (id: string): number => {
  const paths: Array<string> = menuPathSet.filter((path: string) => {
    return path.indexOf(id) > -1;
  });
  let ids: Array<string> = paths[0].split('/').reverse();
  ids.length = ids.length - 1;
  ids = ids.reverse();
  return ids.indexOf(id);
};

@Component({
  selector: 'cat-nav-menu-item',
  templateUrl: './nav-menu-item.component.html',
  styleUrls: ['./nav-menu-item.component.less']
})
export class NavMenuItemComponent implements OnInit {
  private isOpen = false;

  @Input() item: NavigationItem;
  @Input() isCollapsed: boolean;
  @Input() position: string;

  constructor(public global: GlobalService) {}

  ngOnInit() {}

  clickMenuItem(urls: Array<string>, params: Object): void {
    const url: string = urls.reduce(
      (path: string, next: string) => path + '/' + next,
      ''
    );
    console.log(url);
  }

  openSubMenu(open: boolean): void {
    this.isOpen = open;
  }

  clickSubMenu(event: Event, subMenuId: string): void {
    event.preventDefault();
    event.stopPropagation();

    this.global.subMenuOpenState[subMenuId] = this.isOpen;
    if (this.isOpen) {
      const idx: number = getClickSubMenuIdx(subMenuId);
      const key: string = 'v' + idx;
      // 需要关闭的subMenu名单
      const ids = equalLevelsubMenuInfo[key].filter(
        (val: string) => val !== subMenuId
      );
      ids.forEach((id: string) => {
        this.global.subMenuOpenState[id] = false;
      });
    } else {
      // 关闭时把子subMenu也关闭掉
      const relyArr: Array<Array<string>> = relyLevelsubMenuInfo.filter(
        (arr: Array<string>) => arr.includes(subMenuId)
      );
      const relyIdx: number = relyArr[0].findIndex(item => item === subMenuId);
      relyArr[0].forEach((id: string, idx: number) => {
        if (idx > relyIdx) {
          this.global.subMenuOpenState[id] = false;
        }
      });
    }
  }
}
