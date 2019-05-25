import { Component, OnInit, Input } from '@angular/core';

import {
  NavigationItem,
  equalLevelsubMenuInfo,
  relyLevelsubMenuInfo,
  menuIdPathSet
} from '@config/navigation.config';
import { GlobalService } from '@services/global.service';
import { UtilsService } from '@services/utils.service';

/**
 * 返回当前点击subMenu的层级位置
 * @param id - 点击的submenu的id
 */
const getClickSubMenuIdx = (id: string): number => {
  const paths: Array<string> = menuIdPathSet.filter((path: string) => {
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

  constructor(public global: GlobalService, private utils: UtilsService) {}

  ngOnInit() {}

  clickMenuItem(
    pathId: string,
    hashs: Array<number | string>,
    params: Object
  ): void {
    const h = hashs ? hashs : [];
    const p = params ? params : {};
    this.global.selectMenuItemId = pathId;
    this.utils.gotoOtherPage(pathId, h, p);
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
