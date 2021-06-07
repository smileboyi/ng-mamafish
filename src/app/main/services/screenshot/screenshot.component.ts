import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ScreenshotService } from '@services/screenshot.service';
import { messageText } from '@config/message-text.config';

@Component({
  selector: 'cat-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenshotComponent implements OnDestroy {
  @ViewChild('screen') screen: ElementRef;

  constructor(
    private screenshot: ScreenshotService,
    private message: NzMessageService
  ) {}

  ngOnDestroy(): void {
    this.screenshot.saveImgState = false;
  }

  capture(): void {
    this.message.create('info', messageText.SCREEN_CAPTURE_START);
    this.screenshot.capture(this.screen.nativeElement);
  }
}
