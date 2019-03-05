import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Inject
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { takeUntil, debounceTime, filter, map, mergeMap } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgForage } from 'ngforage';

import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';
import { PROFILE_INFO } from '@tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  private resize$: Subject<any> = new Subject<any>();
  private stop$: Subject<any> = new Subject<any>();
  private subscription: Subscription;
  // 页面是否全局展示
  public isFullScreen = false;

  constructor(
    private title: Title,
    private router: Router,
    private ngForage: NgForage,
    private utils: UtilsService,
    private global: GlobalService,
    private activatedRoute: ActivatedRoute,
    private layoutConfig: LayoutConfigService,
    @Inject(DOCUMENT) private document: any,
    @Inject(PROFILE_INFO) private profileInfo: string
  ) {}

  ngOnInit() {
    this.initConfig();
    // 窗口重置
    const isMobile = this.utils.getMobileState();
    this.global.isMobile = isMobile;
    this.subscription = this.resize$
      .pipe(debounceTime(200))
      .subscribe(state => {
        if (this.global.isMobile !== state) {
          this.global.isMobile = state;
          this.global.moreHeaderState = false;
        }
      });

    // 布局设置
    this.layoutConfig.config
      .pipe(takeUntil(this.stop$))
      .subscribe((config: LayoutConfig) => {
        const bool = config.width === 'boxed';
        this.togglebodyClass(bool);
      });

    // 路由导航
    this.router.events
      .pipe(
        takeUntil(this.stop$),
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        this.title.setTitle(data.title);
        this.isFullScreen = Boolean(data.isFullScreen);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.stop$.next();
    this.stop$.complete();
  }

  async initConfig() {
    const profileInfo: any = await this.ngForage.getItem(this.profileInfo);
    if (profileInfo) {
      this.global.userRole = profileInfo.userRole;
      this.global.userInfo = profileInfo.userInfo;
      this.global.permissionList = profileInfo.permissionList;
    } else {
      this.utils.gotoOtherPage('login');
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    const isMobile = this.utils.getMobileState();
    this.resize$.next(isMobile);
  }

  private togglebodyClass(bool: boolean): void {
    if (bool) {
      this.document.body.classList.add('boxed');
    } else {
      this.document.body.classList.remove('boxed');
    }
  }
}
