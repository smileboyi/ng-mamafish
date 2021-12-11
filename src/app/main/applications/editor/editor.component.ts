import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'cat-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  @Input() template: string | null =
    'function x() {\nconsole.log("Hello world!");\n}';
  @Input() options = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true,
    readOnly: false,
    fontSize: 16,
  };

  constructor() {}

  ngOnInit(): void {
    console.log()
  }
}
