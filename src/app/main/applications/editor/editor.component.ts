import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked, Tokenizer } from 'marked';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import monaco from 'monaco-editor';

const rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  smartLists: true,
});

marked.use({
  renderer: rendererMD,
  gfm: true,
  smartLists: true,
});
@Component({
  selector: 'cat-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('preview') preview: ElementRef;
  markdownResult: HTMLDivElement;
  isFullScreen = false;
  template = `
## 南中荣橘柚
#### 柳宗元 〔唐代〕

橘柚怀贞质，受命此炎方。

密林耀朱绿，晚岁有馀芳。

殊风限清汉，飞雪滞故乡。

攀条何所叹，北望熊与湘。
`;
  options = {
    theme: 'vs',
    language: 'markdown',
    automaticLayout: true,
    readOnly: false,
    fontSize: 16,
  };

  editorSub$: Subject<string> = new Subject<string>();

  constructor(private sanitizer: DomSanitizer, private renderer2: Renderer2) {
    fromEvent(document, 'keyup')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.handleHtmlRender();
      });
  }

  ngOnInit(): void {
    console.log();
  }

  ngAfterViewInit(): void {
    // 等待iframe加载好后获取result容器
    let t = setTimeout(() => {
      clearTimeout(t);
      const iframe: HTMLIFrameElement = this.preview.nativeElement;
      this.markdownResult = (
        iframe.contentWindow as Window
      ).document.body.querySelector('.markdown-result') as HTMLDivElement;
      this.handleHtmlRender();
    }, 2000);
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

  handleEmoji(): void {
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

  handleDownload(): void {}

  handleHtmlRender(): void {
    const html: any = this.sanitizer.bypassSecurityTrustHtml(
      marked.parse(this.template)
    );
    this.markdownResult.innerHTML = html.changingThisBreaksApplicationSecurity;
  }
}
