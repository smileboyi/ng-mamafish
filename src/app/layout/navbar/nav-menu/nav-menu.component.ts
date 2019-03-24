import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
  ElementRef,
  Renderer2,
  ChangeDetectorRef
} from '@angular/core';

import { NavigationItem } from '@config/navigation.config';
import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';
import { pageIdmap } from '@config/navigation.config';

@Component({
  selector: 'cat-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed: boolean = false;
  position: string;
  timer: any;
  @Input() navData: Array<NavigationItem> = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public global: GlobalService,
    private layoutConfig: LayoutConfigService,
    private el: ElementRef,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.isCollapsed = config.navbar.collapsed;
      this.position = config.navbar.position;
    });
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
    this.addMenuItemClass('ant-menu-item-selected');
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

  // 如果刷新页面，通过页面地址查找到当前的menuItem，添加一个激活className
  addMenuItemClass(className: string): void {
    this.timer = setTimeout(() => {
      if (!this.global.pageRouteInfo) {
        this.addMenuItemClass(className);
      } else {
        const path = this.global.pageRouteInfo.path;
        const id = this.getMenuItemId(path);
        this.renderer2.addClass(
          this.el.nativeElement.querySelector('#' + id),
          className
        );
      }
    }, 100);
  }

  getMenuItemId(id: string): string {
    return id in pageIdmap ? pageIdmap[id] : id;
  }
}
