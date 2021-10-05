import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Inject,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import {
  takeUntil,
  debounceTime,
  filter,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgForage } from 'ngforage';
import { NzIconService } from 'ng-zorro-antd/icon';

import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';
import { PROFILE_INFO, LAYOUT_CONFIG } from '@tokens';
import { appIcons } from './app.icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  private resize$: Subject<any> = new Subject<any>();
  private stop$: Subject<any> = new Subject<any>();
  private subscription: Subscription;
  // 页面是否全局展示
  public isFullScreen = false;

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private ngForage: NgForage,
    private utils: UtilsService,
    private global: GlobalService,
    private iconService: NzIconService,
    private activatedRoute: ActivatedRoute,
    private layoutConfig: LayoutConfigService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PROFILE_INFO) private profileInfoToken: string,
    @Inject(LAYOUT_CONFIG) public layoutConfigToken: string
  ) {
    this.iconService.addIcon(...appIcons);
  }

  ngOnInit(): void {
    // this.initConfig();
    this.onWindowPopstate();
    // 窗口重置
    this.toggleBodyMini();
    const isMobile = this.utils.getMobileState();
    this.global.isMobile = isMobile;
    this.subscription = this.resize$
      .pipe(debounceTime(200))
      .subscribe((state) => {
        if (this.global.isMobile !== state) {
          this.global.isMobile = state;
          this.global.moreHeaderState = false;
        }
        if (this.global.isMobile) {
          this.layoutConfig.config = {
            navbar: { collapsed: false },
            toolbar: { position: 'above-fixed' },
          };
        }
        this.toggleBodyMini();
      });

    // 布局设置
    this.layoutConfig.config
      .pipe(takeUntil(this.stop$))
      .subscribe((config: LayoutConfig) => {
        const bool = config.width === 'boxed';
        this.toggleBodyBoxed(bool);
      });

    // 路由导航
    this.router.events
      .pipe(
        takeUntil(this.stop$),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        tap((route) => {
          const arr = (route.url as any).value;
          this.global.pageRouteInfo = arr[arr.length - 1];
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.title.setTitle(data.title);
        this.meta.updateTag({
          name: 'description',
          content: data.description,
        });
        this.meta.updateTag({ name: 'keywords', content: data.keywords });
        this.isFullScreen = Boolean(data.isFullScreen);
        GlobalService.pageChange$.next({
          pageId: this.global.selectMenuItemId,
          icon: data.icon,
          title: data.title,
          hashs: this.global.urlData.hashs,
          params: this.global.urlData.params,
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.stop$.next();
    this.stop$.complete();
  }

  async initConfig(): Promise<any> {
    const profileInfo: any = await this.ngForage.getItem(this.profileInfoToken);
    if (profileInfo) {
      this.global.userRole = profileInfo.userRole;
      this.global.userInfo = profileInfo.userInfo;
      this.global.rsapubKey = profileInfo.rsapubKey;
      this.global.permissionList = profileInfo.permissionList;
    } else {
      this.utils.gotoOtherPage('login');
    }
    const layoutConfig: any = await this.ngForage.getItem(
      this.layoutConfigToken
    );
    if (layoutConfig) {
      const htmlROOT = document.querySelector(':root');
      htmlROOT?.setAttribute(
        'style',
        `
          --toolbarThemeFg: ${layoutConfig.toolbar.theme.selectedFg};
          --toolbarThemeBg: ${layoutConfig.toolbar.theme.selectedBg};
          --navbarThemeFg: ${layoutConfig.navbar.theme.selectedFg};
          --navbarThemeBg: ${layoutConfig.navbar.theme.selectedBg};
          --footerThemeFg: ${layoutConfig.footer.theme.selectedFg};
          --footerThemeBg: ${layoutConfig.footer.theme.selectedBg};
        `
      );
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    const isMobile = this.utils.getMobileState();
    this.resize$.next(isMobile);
  }

  private toggleBodyBoxed(bool: boolean): void {
    if (bool) {
      this.document.body.classList.add('boxed');
    } else {
      this.document.body.classList.remove('boxed');
    }
  }

  private toggleBodyMini(): void {
    if (window.innerWidth <= GlobalService.miniWidth) {
      this.global.isMini = true;
      this.document.body.classList.add('mini');
    } else {
      this.global.isMini = false;
      this.document.body.classList.remove('mini');
    }
  }

  // 监听popstate: https://www.cnblogs.com/mininice/p/4064901.html
  @HostListener('window:popstate')
  onWindowPopstate(): void {
    // 菜单定位
    this.global.selectMenuItemId = this.utils.getRouteId();
  }
}
