import {
  Component,
  OnInit,
  ElementRef,
  Renderer,
  TemplateRef,
  ViewChild
} from '@angular/core';
import * as screenfull from 'screenfull';

import { Message, File, Schedule } from '../../declare';
import { MessageService } from '@services/message.service';
import { GlobalService } from '@services/global.service';

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

  @ViewChild('serchIpt')
  serchIpt: ElementRef;

  constructor(
    private message: MessageService,
    private renderer: Renderer,
    public global: GlobalService
  ) {}

  ngOnInit() {
    if (!this.global.isMobile) {
      this.message
        .getMessages()
        .subscribe(res => (this.userMessage = res.data));
    }
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
    this.renderer.setElementAttribute(
      this.serchIpt.nativeElement,
      'autofocus',
      'autofocus'
    );
  }

  // 隐藏TopInfo组件
  closeInfoContent(): void {
    this.showInfoContent = false;
  }

  // 切换更多
  toggleMoreHeader(): void {
    this.global.moreHeaderState = !this.global.moreHeaderState;
  }
}
