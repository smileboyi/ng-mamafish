import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer2,
  HostListener,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';

import * as actions from '@actions/profile.action';
import { ProfileState } from '@reducers/profile.reducer';
import * as fromReducer from '@reducers/index';
import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';
import { Activitie } from '@declare';

@UntilDestroy()
@Component({
  selector: 'cat-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, AfterViewInit {
  index = 0;
  activities: Array<Activitie> = [];
  profiles: Array<Activitie> = [];
  messages: Array<Activitie> = [];
  backTopShow = true;
  isPageMini = false;
  showStatus: 'Show more' | 'Loading more' | 'No more' = 'Show more';
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
    private utils: UtilsService,
    private cdr: ChangeDetectorRef,
    private store: Store<ProfileState>,
    private mediaObserver: MediaObserver,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.isPageMini = this.utils.getMiniState();

    this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      // if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
      // } else {
      //   if (this.profile) {
      //     this.profile.nativeElement.scrollTo(0, 0);
      //   }
      // }
    });

    this.store.select(fromReducer.selectActivities).subscribe((res) => {
      if (this.activities.length) {
        const start = this.activities.length - 1;
        const end = res.length - 1;
        const activities = this.activities.concat();
        res.slice(start, end).forEach((item) => {
          activities.push(item);
        });
        this.activities = activities;
      } else {
        this.activities = res;
      }
      this.cdr.markForCheck();
    });
    this.store.select(fromReducer.selectProfiles).subscribe((res) => {
      this.profiles = res;
      this.cdr.markForCheck();
    });
    this.store.select(fromReducer.selectMessages).subscribe((res) => {
      this.messages = res;
      this.cdr.markForCheck();
    });

    this.handleFirstLoad(0);
  }

  ngAfterViewInit(): void {
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

  handleFirstLoad(index: number): void {
    // 模拟延迟
    const t = setTimeout(() => {
      if (index === 1 && !this.profiles.length) {
        this.store.dispatch(new actions.FetchProfileReq({ type: 'profiles' }));
      } else if (index === 2 && !this.messages.length) {
        this.store.dispatch(new actions.FetchProfileReq({ type: 'messages' }));
      } else if (!this.activities.length) {
        this.store.dispatch(
          new actions.FetchProfileReq({ type: 'activities' })
        );
      }
      clearTimeout(t);
    }, 300);

    if (!this.contentMain) {
      return;
    }

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
  }

  @UtilsService.debounce()
  reloadData(index: number): void {
    let type: actions.ProfileType;
    if (index === 1) {
      type = 'profiles';
    } else if (index === 2) {
      type = 'messages';
    } else {
      type = 'activities';
      this.showStatus = 'Show more';
    }
    this[type] = [];
    this.store.dispatch(new actions.ClearProfileDatas({ type }));
    const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      '.content-box .reload button'
    );
    const btn = btns[index];
    this.renderer2.setAttribute(btn, 'class', 'ac');
    this.handleFirstLoad(index);
    const t = setTimeout(() => {
      this.renderer2.removeAttribute(btn, 'class');
      clearTimeout(t);
    }, 500);
  }

  fetchMoreData(): void {
    this.showStatus = 'Loading more';
    const t = setTimeout(() => {
      // 加载5次，不再加载
      if (this.activities.length < 25) {
        const scrollTop = this.contentBox.nativeElement.scrollTop;
        this.showStatus = 'Show more';
        this.store.dispatch(
          new actions.FetchProfileReq({ type: 'activities' })
        );
        // 等列表渲染好了，调整列表滚动条的位置
        const t2 = setTimeout(() => {
          this.contentBox.nativeElement.scrollTo(0, scrollTop);
          clearTimeout(t2);
        }, 300);
      } else {
        this.showStatus = 'No more';
      }
      this.cdr.markForCheck();
      clearTimeout(t);
    }, 300);
  }

  @HostListener('window:resize')
  @UtilsService.throttle(200)
  onWindowResize(): void {
    // 如果在滑动时获取高度性能不好
    this.cardHeight = this.card.nativeElement.clientHeight | 0;
    this.isPageMini = this.utils.getMiniState();
  }
}
