import { messages } from './../../mock/data.mock';
import {
  Component,
  OnInit,
  ElementRef,
  Renderer,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import * as screenfull from 'screenfull';

import { Message, File, Schedule } from '../../declare';
import { MessageService } from '../../services/message.service';

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
  drawerVisible: boolean = false;
  searchBarState: boolean = false;
  isFullscreen: boolean = false;

  @ViewChild('serchIpt')
  serchIpt: ElementRef;

  constructor(private message: MessageService, private renderer: Renderer) {}

  ngOnInit() {
    this.message.getMessages().subscribe(res => (this.userMessage = res.data));
  }

  openSetting(): void {
    this.drawerVisible = true;
  }
  handleDrawerClose(): void {
    this.drawerVisible = false;
  }

  // 全屏切换
  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  // 显示搜索框
  showSearchBar() {
    this.searchBarState = true;
    this.renderer.setElementAttribute(
      this.serchIpt.nativeElement,
      'autofocus',
      'autofocus'
    );
  }
}
