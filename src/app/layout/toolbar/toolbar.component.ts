import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import screenfull from 'screenfull';
import { NgForage } from 'ngforage';
import { from } from 'rxjs';
import axios from 'axios';

import { Message, File, Schedule, UserRole } from '@declare';
import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';

interface UserMessage {
  messages: Array<Message>;
  files: Array<File>;
  schedules: Array<Schedule>;
}

@UntilDestroy()
@Component({
  selector: 'cat-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
})
export class ToolbarComponent implements OnInit {
  userMessage: UserMessage;
  searchBarState = false;
  isFullscreen = false;
  showInfoContent = false;
  isCollapsed = false;
  userRoles: Array<UserRole> = [
    UserRole.Visitor,
    UserRole.Lower,
    UserRole.User,
    UserRole.Manager,
    UserRole.Dictator,
  ];

  @ViewChild('serchIpt')
  serchIpt: ElementRef;

  @Output()
  toggleSetting: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private renderer2: Renderer2,
    private ngForage: NgForage,
    public utils: UtilsService,
    public global: GlobalService,
    private layoutConfig: LayoutConfigService
  ) {}

  ngOnInit(): void {
    if (!this.global.isMobile) {
      from(axios.get('/mockapi/user/message')).subscribe(
        (res) => (this.userMessage = res.data)
      );
    }
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.isCollapsed = config.navbar.collapsed;
    });
  }

  // 全屏切换
  toggleFullscreen(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  // 显示搜索框
  showSearchBar(): void {
    this.searchBarState = true;
    this.renderer2.setAttribute(
      this.serchIpt.nativeElement,
      'autofocus',
      'autofocus'
    );
  }

  // 隐藏TopInfo组件
  closeInfoContent(): void {
    this.showInfoContent = false;
    this.renderer2.removeAttribute(this.serchIpt.nativeElement, 'autofocus');
  }

  // 切换更多
  toggleMoreHeader(): void {
    this.global.moreHeaderState = !this.global.moreHeaderState;
  }

  toggleMenu(): void {
    if (this.global.isMobile) {
      this.isCollapsed = false;
      this.toggleSidebarHidden();
    } else {
      this.toggleSidebarCollapsed();
    }
  }

  // 折叠/展开导航菜单
  toggleSidebarCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.layoutConfig.config = {
      navbar: { collapsed: this.isCollapsed },
    };
  }

  // 隐藏/显示导航菜单
  toggleSidebarHidden(): void {
    this.global.sidebarHidden = !this.global.sidebarHidden;
  }

  // 切换设置
  handleToggleSetting(): void {
    this.toggleSetting.emit();
  }

  async handleLogout(): Promise<void> {
    await this.ngForage.clear();
    this.global.resetUserInfo();
    this.global.rsapubKey = '';
    this.global.userRole = UserRole.Visitor;
    this.utils.gotoOtherPage('login');
  }
}
