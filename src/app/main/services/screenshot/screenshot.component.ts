import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ScreenshotService } from '@services/screenshot.service';
import { messageText } from '@config/message-text.config';

@Component({
  selector: 'cat-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.less']
})
export class ScreenshotComponent implements OnInit, OnDestroy {
  @ViewChild('screen', null) screen: ElementRef;

  constructor(
    private screenshot: ScreenshotService,
    private message: NzMessageService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.screenshot.saveImgState = false;
  }

  capture(): void {
    this.message.create('info', messageText.SCREEN_CAPTURE_START);
    this.screenshot.capture(this.screen.nativeElement);
  }
}
