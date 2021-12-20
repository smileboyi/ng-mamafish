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
import { EditorComponent as MonacoEditorComponent } from 'ngx-monaco-editor';
import { editor, Selection, Position } from 'monaco-editor';
import * as monaco from 'monaco-editor';

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

![mahua](http://localhost:4200/assets/images/avatar.jpg)
`;
  options = {
    theme: 'vs',
    language: 'markdown',
    automaticLayout: true,
    readOnly: false,
    fontSize: 16,
    wordWrap: 'on',
  };
  editorRef: any;
  modelRef: editor.IModel;
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

  onEditorInit(editorRef: any) {
    this.editorRef = editorRef;
    this.modelRef = this.editorRef.getModel();
  }

  handleTitle(marks: string): void {
    this.selectionLineWholeReplace(marks + this.getSelectionValue());
  }

  handleBold(): void {
    this.selectionLineInlineReplace('**' + this.getSelectionValue() + '**');
  }

  handleItalic(): void {
    this.selectionLineInlineReplace('*' + this.getSelectionValue() + '*');
  }

  handleStrike(): void {
    this.selectionLineInlineReplace('~' + this.getSelectionValue() + '~');
  }

  handleUnderline(): void {
    this.selectionLineInlineReplace('<u>' + this.getSelectionValue() + '</u>');
  }

  handleLink(): void {
    this.selectionLineInlineReplace('[' + this.getSelectionValue() + '](url)');
  }

  handleOrderedlist(): void {
    this.newLineInsert(`1. \n2. \n3. \n`);
  }

  handleUnorderedlist(): void {
    this.newLineInsert(`- \n- \n- \n`);
  }

  handleImage(): void {
    this.selectionLineInlineReplace('![' + this.getSelectionValue() + '](url)');
  }

  handleTable(): void {
    this.newLineInsert(
      `| head1 | head1 |\n| ----- | ----- |\n| cell1 | cell2 |\n| cell4 | cell4 |`
    );
  }

  handleCode(): void {
    this.newLineInsert(`\`\`\`js\n  console.log('hello world!');\n\`\`\`\n`);
  }

  handleBlockquote(): void {
    this.selectionLineWholeReplace('> ' + this.getSelectionValue());
  }

  handleFormat(): void {
    monaco.editor.colorizeElement(
      this.markdownResult.querySelector('code') as HTMLElement,
      {}
    );
  }

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

  // 获取选中的值
  getSelectionValue(): string {
    return this.modelRef.getValueInRange(this.editorRef.getSelection());
  }
  // 获取光标位置
  getCursorPosi(): string {
    return this.editorRef.getSelection();
  }
  // 在内容选中行里处理替换
  selectionLineInlineReplace(text: string): void {
    const selection: Selection = this.editorRef.getSelection();
    const range = new monaco.Range(
      selection.startLineNumber,
      selection.startColumn,
      selection.endLineNumber,
      selection.endColumn
    );
    const id = { major: 1, minor: 1 };
    const op = {
      identifier: id,
      range: range,
      text: text,
      forceMoveMarkers: true,
    };
    this.editorRef.executeEdits(null, [op]);
    this.editorRef.focus();
    this.handleHtmlRender();
  }
  // 在选中行整行处理替换
  selectionLineWholeReplace(text: string): void {
    const position: Position = this.editorRef.getPosition();
    const range = new monaco.Range(
      position.lineNumber,
      1,
      position.lineNumber,
      1
    );
    const id = { major: 1, minor: 1 };
    const op = {
      identifier: id,
      range: range,
      text: text,
      forceMoveMarkers: true,
    };
    this.editorRef.executeEdits(null, [op]);
    this.editorRef.focus();
    this.handleHtmlRender();
  }
  // 新增行插入内容
  newLineInsert(text: string): void {
    const position: Position = this.editorRef.getPosition();
    const range = new monaco.Range(
      position.lineNumber + 1,
      1,
      position.lineNumber + 1,
      1
    );
    const id = { major: 1, minor: 1 };
    const op = {
      identifier: id,
      range: range,
      text: text,
      forceMoveMarkers: true,
    };
    this.editorRef.executeEdits(null, [op]);
    this.editorRef.focus();
    this.handleHtmlRender();
  }
}
