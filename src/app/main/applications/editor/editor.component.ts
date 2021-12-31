import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked, Tokenizer } from 'marked';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  editor,
  Range,
  Selection,
  Position,
  languages,
  KeyCode,
  KeyMod,
} from 'monaco-editor-core';
import FileSaver from 'file-saver';
import { throttle, merge } from 'lodash-es';

import { helpTemplate, createSuggestions, resetRenderer } from './editor.data';

const rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  smartLists: true,
});
let renderer = new marked.Renderer();
renderer = merge(renderer, resetRenderer);
@Component({
  selector: 'cat-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  isFullScreen = false;
  isPreview = false;
  isVisible = false;
  helpShow = false;
  template = '';
  themeStyle = '';
  @ViewChild('preview') preview: ElementRef;
  iframeBody: HTMLBodyElement;
  markdownResult: HTMLDivElement;
  modelRef: editor.IModel;
  editorRef: editor.IStandaloneCodeEditor;
  editorSub$: Subject<void> = new Subject<void>();
  subs: Subscription;

  constructor(private sanitizer: DomSanitizer) {
    this.subs = this.editorSub$.pipe(debounceTime(50)).subscribe(() => {
      this.iframeBody && this.handleHtmlRender();
    });
  }

  ngOnInit(): void {
    this.template = helpTemplate;
  }

  ngAfterViewInit(): void {
    this.initEditor();
    this.initIframe();
    this.bindingKeyEvent();
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
    languages.register({ id: 'markdown' });
    languages.registerCompletionItemProvider('markdown', {
      provideCompletionItems: function (model, position) {
        const range = new Range(position.lineNumber, 1, position.lineNumber, 1);
        return {
          suggestions: createSuggestions(range),
          triggerCharacters: ['@'],
        };
      },
    });
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
    iframe.onload = () => {
      this.iframeBody = (iframe.contentWindow as any).document.body;
      this.markdownResult = this.iframeBody.querySelector(
        '.markdown-result'
      ) as HTMLDivElement;
      this.handleHtmlRender();
    };
  }

  bindingKeyEvent(): void {
    this.editorRef.addCommand(KeyMod.CtrlCmd | KeyCode.KeyB, (v) => {
      this.handleBold();
    });
    this.editorRef.addCommand(KeyMod.CtrlCmd | KeyCode.KeyI, (v) => {
      this.handleItalic();
    });
    this.editorRef.addCommand(KeyMod.CtrlCmd | KeyCode.KeyD, (v) => {
      this.handleStrike();
    });
    this.editorRef.addCommand(KeyMod.CtrlCmd | KeyCode.KeyU, (v) => {
      this.handleUnderline();
    });
    this.editorRef.addCommand(KeyMod.CtrlCmd | KeyCode.KeyL, (v) => {
      this.handleLink();
    });
    this.editorRef.addCommand(KeyMod.CtrlCmd | KeyCode.KeyP, (v) => {
      this.handleImage();
    });
    this.editorRef.addCommand(KeyMod.CtrlCmd | KeyCode.KeyO, (v) => {
      this.handleCode(true);
    });
    this.editorRef.addCommand(KeyMod.CtrlCmd | KeyCode.KeyQ, (v) => {
      this.handleBlockquote();
    });
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

  handleImage(): void {
    this.selectionLineInlineReplace('![' + this.getSelectionValue() + ']()');
  }

  handleBlockquote(): void {
    this.selectionLineWholeReplace('> ' + this.getSelectionValue());
  }

  handleOrderedlist(): void {
    this.newLineInsert(`\n1. \n2. \n3. \n`);
  }

  handleUnorderedlist(): void {
    this.newLineInsert(`\n- \n- \n- \n`);
  }

  handleTable(): void {
    this.newLineInsert(
      `\n| head1 | head1 |\n| ----- | ----- |\n| cell1 | cell2 |\n| cell4 | cell4 |\n`
    );
  }

  handleCode(inline = false): void {
    if (inline) {
      this.selectionLineInlineReplace('`' + this.getSelectionValue() + '`');
    } else {
      this.newLineInsert(
        `\n\`\`\`js\n  console.log('hello world!');\n\`\`\`\n`
      );
    }
  }

  handleAudio(): void {
    const src = 'https://www.w3school.com.cn/i/horse.ogg';
    this.newLineInsert(`\n<audio controls="" src="${src}"></audio>\n`);
  }

  handleVideo(): void {
    const src = 'https://www.w3school.com.cn/i/movie.ogg';
    this.newLineInsert(`\n<video controls="" src="${src}"></video>\n`);
  }

  handleHelp(): void {
    // 不要使用setValue，因为不能Undo
    const fullRange = (
      this.editorRef.getModel() as editor.IModel
    ).getFullModelRange();
    this.editorRef.executeEdits(null, [
      {
        text: helpTemplate,
        range: fullRange,
      },
    ]);
  }

  handleFormat(): void {}

  handleEmoji(): void {
    window.open('https://emojixd.com/', '_blank');
  }

  handlePreview(): void {
    this.isPreview = !this.isPreview;
    this.iframeBody.className = this.isPreview ? 'body--preview' : '';
  }

  handlePrint(): void {
    const iframe: HTMLIFrameElement = this.preview.nativeElement;
    (iframe.contentWindow as Window).postMessage({ type: 'print' }, '*');
  }

  handleDownload(): void {
    const textBlob = new Blob([this.template], {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(textBlob, 'markdown_' + new Date().getTime() + '.md');
  }

  insertCustomStyle(): void {
    const iframe: HTMLIFrameElement = this.preview.nativeElement;
    (iframe.contentWindow as Window).postMessage(
      { type: 'theme', data: this.themeStyle },
      '*'
    );
    this.isVisible = false;
  }

  handleHtmlRender(): void {
    const html: any = this.sanitizer.bypassSecurityTrustHtml(
      marked.parse(this.template, { renderer: renderer })
    );
    this.markdownResult.innerHTML = html.changingThisBreaksApplicationSecurity;
  }

  // 获取选中的文本
  getSelectionValue(): string {
    return this.modelRef.getValueInRange(
      this.editorRef.getSelection() as Selection
    );
  }
  // 获取文本选中位置
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
