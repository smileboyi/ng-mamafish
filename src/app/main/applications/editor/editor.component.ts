import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked, Tokenizer } from 'marked';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { editor, Range, Selection, Position } from 'monaco-editor-core';
import FileSaver from 'file-saver';
import { throttle } from 'lodash-es';

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
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('preview') preview: ElementRef;
  iframeBody: HTMLBodyElement;
  markdownResult: HTMLDivElement;
  isFullScreen = false;
  isPreview = false;
  template = `
## 南中荣橘柚
#### 柳宗元 〔唐代〕

橘柚怀贞质，受命此炎方。

密林耀朱绿，晚岁有馀芳。

殊风限清汉，飞雪滞故乡。

攀条何所叹，北望熊与湘。

![mahua](http://localhost:4200/assets/images/avatar.jpg)
`;
  modelRef: editor.IModel;
  editorRef: editor.IStandaloneCodeEditor;
  editorSub$: Subject<void> = new Subject<void>();
  subs: Subscription;
  constructor(private sanitizer: DomSanitizer) {
    this.subs = this.editorSub$.pipe(debounceTime(50)).subscribe(() => {
      this.handleHtmlRender();
    });
  }

  ngOnInit(): void {
    console.log();
  }

  ngAfterViewInit(): void {
    this.initEditor();
    this.initIframe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.editorRef) {
      (this.editorRef.getModel() as editor.IModel).dispose();
      this.editorRef.dispose();
    }
  }

  initEditor() {
    const options: editor.IEditorOptions = {
      automaticLayout: true,
      readOnly: false,
      fontSize: 16,
      wordWrap: 'on',
    };
    editor.setTheme('vs');
    this.editorRef = editor.create(
      document.getElementById('monacoEditor')!,
      options
    );
    this.modelRef = this.editorRef.getModel() as editor.ITextModel;
    editor.setModelLanguage(this.modelRef, 'markdown');
    this.editorRef.setValue(this.template);
    this.editorRef.onDidChangeModelContent(
      throttle(() => {
        this.template = this.editorRef.getValue();
        this.editorSub$.next();
      }, 500)
    );
  }

  initIframe() {
    const iframe: HTMLIFrameElement = this.preview.nativeElement;
    // 等待iframe加载好后获取result容器
    iframe.onload = () => {
      this.iframeBody = (iframe.contentWindow as any).document.body;
      this.markdownResult = this.iframeBody.querySelector(
        '.markdown-result'
      ) as HTMLDivElement;
      this.handleHtmlRender();
    };
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
    this.selectionLineInlineReplace('[' + this.getSelectionValue() + ']()');
  }

  handleOrderedlist(): void {
    this.newLineInsert(`\n1. \n2. \n3. \n`);
  }

  handleUnorderedlist(): void {
    this.newLineInsert(`\n- \n- \n- \n`);
  }

  handleImage(): void {
    this.selectionLineInlineReplace('![' + this.getSelectionValue() + ']()');
  }

  handleTable(): void {
    this.newLineInsert(
      `\n| head1 | head1 |\n| ----- | ----- |\n| cell1 | cell2 |\n| cell4 | cell4 |\n`
    );
  }

  handleCode(): void {
    this.newLineInsert(`\n\`\`\`js\n  console.log('hello world!');\n\`\`\`\n`);
  }

  handleBlockquote(): void {
    this.selectionLineWholeReplace('> ' + this.getSelectionValue());
  }

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

  handlePreview(): void {
    this.isPreview = !this.isPreview;
    this.iframeBody.className = this.isPreview ? 'body--preview' : '';
  }

  handlePrint(): void {
    const iframe: HTMLIFrameElement = this.preview.nativeElement;
    (iframe.contentWindow as Window).postMessage('print', '*');
  }

  handleDownload(): void {
    const textBlob = new Blob([this.template], {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(textBlob, 'markdown_' + new Date().getTime() + '.md');
  }

  handleHtmlRender(): void {
    const html: any = this.sanitizer.bypassSecurityTrustHtml(
      marked.parse(this.template)
    );
    this.markdownResult.innerHTML = html.changingThisBreaksApplicationSecurity;
  }

  // 获取选中的值
  getSelectionValue(): string {
    return this.modelRef.getValueInRange(
      this.editorRef.getSelection() as Selection
    );
  }
  // 获取光标位置
  getCursorPosi(): Selection {
    return this.editorRef.getSelection() as Selection;
  }
  // 传入编辑的范围和内容进行编辑
  baseExecuteEdits(range: Range, text: string): void {
    const id = { major: 1, minor: 1 };
    const op = {
      text,
      range,
      identifier: id,
      forceMoveMarkers: true,
    };
    this.editorRef.executeEdits(null, [op]);
    this.editorRef.focus();
    this.handleHtmlRender();
  }
  // 在内容选中行里处理替换
  selectionLineInlineReplace(text: string): void {
    const selection = this.editorRef.getSelection() as Selection;
    const range = new Range(
      selection.startLineNumber,
      selection.startColumn,
      selection.endLineNumber,
      selection.endColumn
    );
    this.baseExecuteEdits(range, text);
  }
  // 在选中行整行处理替换
  selectionLineWholeReplace(text: string): void {
    const position = this.editorRef.getPosition() as Position;
    const range = new Range(position.lineNumber, 1, position.lineNumber, 1);
    this.baseExecuteEdits(range, text);
  }
  // 新增行插入内容
  newLineInsert(text: string): void {
    const position = this.editorRef.getPosition() as Position;
    const range = new Range(
      position.lineNumber + 1,
      1,
      position.lineNumber + 1,
      1
    );
    this.baseExecuteEdits(range, text);
  }
}
