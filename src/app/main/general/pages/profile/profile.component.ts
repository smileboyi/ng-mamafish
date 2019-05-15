import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer2,
  HostListener
} from '@angular/core';
import * as _ from 'lodash';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
  CdkScrollable,
  ScrollDispatcher,
  ViewportRuler
} from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

import { UtilsService } from '@services/utils.service';
import { activities } from '@mock/data.mock';

@Component({
  selector: 'cat-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  index = 0;
  activities: Array<any> = [];
  profiles: Array<any> = [];
  messages: Array<any> = [];
  backTopShow = true;
  showStatus: 'Show more' | 'Loading more' | 'No more' = 'Show more';
  watcher: Subscription;
  activeMediaQuery = '';
  cardHeight = 0;
  oldScrollTop = 0;

  @ViewChild('card')
  card: ElementRef;

  @ViewChild('profile')
  profile: ElementRef;

  @ViewChild('inkBar')
  inkBar: ElementRef;

  @ViewChild('contentMain')
  contentMain: ElementRef;

  @ViewChild('contentBox')
  contentBox: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private viewPortRuler: ViewportRuler,
    private mediaObserver: MediaObserver,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit() {
    this.watcher = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
        } else {
          this.profile.nativeElement.scrollTo(0, 0);
        }
      }
    );

    // 模拟延迟
    const t = setTimeout(() => {
      this.activities = _.cloneDeep(activities);
      clearTimeout(t);
    }, 300);
  }

  ngAfterViewInit() {
    this.cardHeight = this.card.nativeElement.clientHeight;
    const profileDom: HTMLElement = this.profile.nativeElement;
    this.scrollDispatcher.ancestorScrolled(this.profile, 100).subscribe(() => {
      const scrollTop = profileDom.scrollTop | 0;
      if (this.oldScrollTop > scrollTop) {
        this.renderer2.setStyle(profileDom, 'padding', '15px');
      } else {
        if (this.cardHeight - scrollTop <= 45) {
          // 上下内边距15px
          profileDom.scrollTo(0, this.cardHeight + 30);
          this.renderer2.setStyle(profileDom, 'padding', '0');
        }
      }
      this.oldScrollTop = scrollTop;
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  handleFirstLoad(index: number): void {
    if (index) {
      this.backTopShow = false;
      this.renderer2.setAttribute(
        this.contentMain.nativeElement,
        'style',
        `transform: translateX(-${33.3333 * index}%)`
      );
    } else {
      this.backTopShow = true;
      // 含有transform时，影响nz-back-top组件显示
      this.renderer2.removeAttribute(this.contentMain.nativeElement, 'style');
    }

    this.renderer2.setAttribute(
      this.inkBar.nativeElement,
      'style',
      `transform: translateX(${100 * index}%)`
    );
    if (index === 1 && !this.profiles.length) {
      const t = setTimeout(() => {
        this.profiles = _.cloneDeep(activities).sort(() =>
          Math.random() > 0.5 ? -1 : 1
        );
        clearTimeout(t);
      }, 300);
    } else if (index === 2 && !this.messages.length) {
      const t = setTimeout(() => {
        this.messages = _.cloneDeep(activities).sort(() =>
          Math.random() > 0.5 ? -1 : 1
        );
        clearTimeout(t);
      }, 300);
    }
  }

  fetchMoreData() {
    this.showStatus = 'Loading more';
    // 加载5次，不再加载
    if (this.activities.length < activities.length * 5) {
      const scrollTop = this.contentBox.nativeElement.scrollTop;
      const t1 = setTimeout(() => {
        _.cloneDeep(activities)
          .sort(() => (Math.random() > 0.5 ? -1 : 1))
          .forEach(activitie => {
            this.activities.push(activitie);
          });
        this.showStatus = 'Show more';
        clearTimeout(t1);
      }, 300);
      // 等列表渲染好了，调整列表滚动条的位置
      const t2 = setTimeout(() => {
        this.contentBox.nativeElement.scrollTo(0, scrollTop);
        clearTimeout(t2);
      }, 300);
    } else {
      const t = setTimeout(() => {
        this.showStatus = 'No more';
        clearTimeout(t);
      }, 300);
    }
  }

  @HostListener('window:resize')
  @UtilsService.throttle(200)
  onWindowResize(): void {
    // 如果在滑动时获取高度性能不好
    this.cardHeight = this.card.nativeElement.clientHeight | 0;
  }
}
