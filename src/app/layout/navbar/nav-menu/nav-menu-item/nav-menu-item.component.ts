import { Component, OnInit, Input } from '@angular/core';

import {
  NavigationItem,
  equalLevelsubMenuInfo,
  relyLevelsubMenuInfo,
  menuIdPathSet,
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

// 项目升级后菜单selected类切换不了，这里手动更新
const fixMenuItemSelected = (id: string): void => {
  if (document.querySelector('.ant-menu-item-selected')) {
    document
      .querySelector('.ant-menu-item-selected')
      ?.classList.remove('ant-menu-item-selected');
  }
  if (document.getElementById(id)) {
    document.getElementById(id)?.classList.add('ant-menu-item-selected');
  }
};

@Component({
  selector: 'cat-nav-menu-item',
  templateUrl: './nav-menu-item.component.html',
  styleUrls: ['./nav-menu-item.component.less'],
})
export class NavMenuItemComponent implements OnInit {
  private isOpen = false;
  private errorsEle: Element;

  @Input() isPageMini: boolean;
  @Input() item: NavigationItem;
  @Input() isCollapsed: boolean;
  @Input() position: string;

  constructor(public global: GlobalService, private utils: UtilsService) {}

  ngOnInit(): void {}

  clickMenuItem(
    pathId: string,
    hashs?: Array<number | string>,
    params?: { [k: string]: StrOrNum }
  ): void {
    const h = hashs ? hashs : [];
    const p = params ? params : {};
    this.global.selectMenuItemId = pathId;
    fixMenuItemSelected(pathId);
    // 页面切换
    this.utils.gotoOtherPage(pathId, h, p);
    // 保存页面地址数据
    this.global.urlData.hashs = h;
    this.global.urlData.params = p;
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
      ids.forEach((id) => {
        this.global.subMenuOpenState[id] = false;
      });
    } else {
      // 关闭时把子subMenu也关闭掉
      const relyArr: Array<Array<string>> = relyLevelsubMenuInfo.filter(
        (arr: Array<string>) => arr.includes(subMenuId)
      );
      const relyIdx: number = relyArr[0].findIndex(
        (item) => item === subMenuId
      );
      relyArr[0].forEach((id, idx) => {
        if (idx > relyIdx) {
          this.global.subMenuOpenState[id] = false;
        }
      });
    }
  }

  /**
   * 下面都是菜单bug修复代码：菜单折叠后的子菜单没有及时隐藏起来
   * 可能是使用ant-menu的姿势不对以及项目升级后，导致有些menu切换效果不再生效
   * 解决方式：通过css覆盖使子菜单默认隐藏，再通过js控制显示
   * 折叠后的菜单的子菜单是由Angular cdk控制的，所以在cdk dom box里修复
   * 还有一些已知bug不再解决
   */

  // 控制一级子菜单的显示
  mouseenterSubMenu(id: string): void {
    // 需等待渲染好了进行操作
    const t = setTimeout(() => {
      const submenuEles: NodeListOf<HTMLElement> = document.querySelectorAll(
        '.cdk-overlay-container .ant-menu-submenu'
      );
      submenuEles.forEach((submenuEle) => {
        if (!submenuEle.hasAttribute('data-id')) {
          const itemEle = submenuEle.querySelector(
            '.ant-menu-item'
          ) as HTMLElement;
          if (itemEle) {
            if (id === this.getParentId(itemEle.getAttribute('id') as string)) {
              submenuEle.setAttribute('data-id', id);
              submenuEle.setAttribute('style', 'position: relative');
              const itemEles: NodeListOf<HTMLElement> =
                submenuEle.querySelectorAll('.ant-menu-item');
              const currId = this.global.selectMenuItemId;
              // 不会自动切换selected类，需手动控制
              itemEles.forEach((item) => {
                if (currId === item.getAttribute('id')) {
                  item.classList.add('ant-menu-item-selected');
                } else {
                  item.classList.remove('ant-menu-item-selected');
                }
              });
            }
          }
        }
      });
      clearTimeout(t);
    }, 170);
  }

  // 控制二级errors子菜单的显示
  private hoverErrorSubMenu(): void {
    const t = setTimeout(() => {
      clearTimeout(t);
      const box: NodeListOf<HTMLElement> = document.querySelectorAll(
        '.cdk-overlay-connected-position-bounding-box'
      );
      const last = box[box.length - 1];
      const errorsSubMenuEle = last.querySelector(
        '.cdk-overlay-container .ant-menu-submenu'
      );
      errorsSubMenuEle?.setAttribute('style', 'position: relative');
    }, 170);
  }

  private getParentId(childId: string): any {
    if (childId === 'analytics') {
      return 'dashboards';
    } else if (childId === 'profile') {
      this.errorsEle = document.getElementsByName('cdk-submenu--errors')[0];
      this.errorsEle.removeEventListener(
        'mouseover',
        this.hoverErrorSubMenu,
        false
      );
      this.errorsEle.addEventListener(
        'mouseover',
        this.hoverErrorSubMenu,
        false
      );
      return 'pages';
    }
  }
}
