import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import monaco from 'monaco-editor';
import { marked } from 'marked';

@Component({
  selector: 'cat-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
  isFullScreen = false;
  template: string = 'function x() {\nconsole.log("Hello world!");\n}';
  options = {
    theme: 'vs',
    language: 'markdown',
    automaticLayout: true,
    readOnly: false,
    fontSize: 16,
  };

  constructor() {

  }

  ngOnInit(): void {
    console.log();
  }

  handleBold(): void {}

  handleItalic(): void {}

  handleStrike(): void {}

  handleUnderline(): void {}

  handleLink(): void {}

  handleOrderedlist(): void {}

  handleUnorderedlist(): void {}

  handleImage(): void {}

  handleTable(): void {}

  handleCode(): void {}

  handleBlockquote(): void {}

  handleFormat(): void {}

  handleExpression(): void {
    window.open('https://emojixd.com/', '_blank');
  }

  handleFullscreen(): void {
    this.isFullScreen = true;
  }

  handleExitFullscreen(): void {
    this.isFullScreen = false;
  }

  handlePreview(): void {}

  handlePrint(): void {}

  handleUpload(): void {}
}
