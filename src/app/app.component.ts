import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  private resize$: Subject<any> = new Subject<any>();
  private stop$: Subject<any> = new Subject<any>();
  private subscription: Subscription;

  constructor(
    private utils: UtilsService,
    private global: GlobalService,
    private layoutConfig: LayoutConfigService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
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
    this.layoutConfig.config
      .pipe(takeUntil(this.stop$))
      .subscribe((config: LayoutConfig) => {
        const bool = config.width === 'boxed';
        this.togglebodyClass(bool);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.stop$.next();
    this.stop$.complete();
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
