import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  TemplateRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import * as screenfull from 'screenfull';

import { Message, File, Schedule } from '../../declare';
import { MessageService } from '@services/message.service';
import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';
import { UserRole } from '@declare';

interface UserMessage {
  messages: Array<Message>;
  file: Array<File>;
  schedule: Array<Schedule>;
}
@Component({
  selector: 'cat-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {
  userMessage: UserMessage;
  searchBarState: boolean = false;
  isFullscreen: boolean = false;
  showInfoContent: boolean = false;
  isCollapsed: boolean = false;
  userRoles: Array<UserRole> = [UserRole.Full, UserRole.User, UserRole.Manager];

  @ViewChild('serchIpt')
  serchIpt: ElementRef;

  @Output()
  openSetting: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private message: MessageService,
    private renderer2: Renderer2,
    public global: GlobalService,
    private layoutConfig: LayoutConfigService
  ) {}

  ngOnInit() {
    if (!this.global.isMobile) {
      this.message
        .getMessages()
        .subscribe(res => (this.userMessage = res.data));
    }
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.isCollapsed = config.navbar.collapsed;
    });
  }

  // 全屏切换
  toggleFullscreen(): void {
    if (screenfull.enabled) {
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

  // 折叠\显示导航菜单
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.layoutConfig.config = {
      navbar: {
        collapsed: this.isCollapsed
      }
    };
  }

  // 打开设置
  handleOpen(): void {
    this.showInfoContent = false;
    this.openSetting.emit();
  }
}
