import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';

@Component({
  selector: 'cat-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private resize$: Subject<any> = new Subject<any>();
  private subscription: Subscription;

  drawerVisible = false;
  configData: LayoutConfig;
  pageWithStyle: '1200px' | '100%';
  oldPageWith: '1200px' | '100%';

  constructor(
    public global: GlobalService,
    private layoutConfig: LayoutConfigService
  ) {}

  ngOnInit(): void {
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.configData = config;
      this.oldPageWith = this.pageWithStyle =
        config.width === 'fullwidth' ? '100%' : '1200px';
    });
    this.subscription = this.resize$
      .pipe(debounceTime(200))
      .subscribe((width) => {
        if (width < 1200) {
          this.pageWithStyle = '100%';
        } else {
          this.pageWithStyle = this.oldPageWith;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleSetting(): void {
    this.drawerVisible = !this.drawerVisible;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any): void {
    this.resize$.next(event.target.innerWidth);
  }
}
