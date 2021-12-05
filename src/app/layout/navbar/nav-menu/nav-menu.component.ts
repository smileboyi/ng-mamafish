import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';

import { NavigationItem } from '@config/navigation.config';
import { GlobalService } from '@services/global.service';
import { UtilsService } from '@services/utils.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';
import { pageIdMap } from '@config/navigation.config';

@Component({
  selector: 'cat-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less'],
})
export class NavMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  isPageMini = false;
  isCollapsed = false;
  position: string;
  timer: any;

  @Input() navData: Array<NavigationItem> = [];

  constructor(
    private el: ElementRef,
    public utils: UtilsService,
    public global: GlobalService,
    private renderer2: Renderer2,
    private cdr: ChangeDetectorRef,
    private layoutConfig: LayoutConfigService
  ) {}

  ngOnInit(): void {
    this.isPageMini = this.utils.getMiniState();

    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.isCollapsed = config.navbar.collapsed;
      this.position = config.navbar.position;
    });
    UtilsService.menuItemChange$.subscribe(() => {
      this.selectMenuItemLetActive();
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.selectMenuItemLetActive();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  // 如果刷新页面，通过页面地址查找到当前的menuItem，添加一个激活className
  selectMenuItemLetActive(): void {
    this.timer = setTimeout(() => {
      if (!this.global.pageRouteInfo) {
        this.selectMenuItemLetActive();
      } else {
        const path = this.global.pageRouteInfo.path;
        const id = this.getMenuItemId(path);
        const el = this.el.nativeElement.querySelector('#' + id);
        this.global.selectMenuItemId =
          this.global.selectMenuItemId || 'analytics';
        if (el) {
          if (
            this.el.nativeElement.querySelector(
              '#' + this.global.selectMenuItemId
            )
          ) {
            const actives = this.el.nativeElement.querySelectorAll(
              '.ant-menu-item-selected'
            );
            [...actives].forEach((active) => {
              this.renderer2.removeClass(active, 'ant-menu-item-selected');
            });

            this.renderer2.addClass(
              this.el.nativeElement.querySelector('#' + id),
              'ant-menu-item-selected'
            );
            this.global.selectMenuItemId = id;
          }
        }
      }
    }, 100);
  }

  getMenuItemId(id: string): string {
    return id in pageIdMap ? (pageIdMap as any)[id] : id;
  }

  @HostListener('window:resize')
  @UtilsService.throttle(200)
  onWindowResize(): void {
    this.isPageMini = this.utils.getMiniState();
  }
}
