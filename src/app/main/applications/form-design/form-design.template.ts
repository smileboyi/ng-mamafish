import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  ChangeDetectorRef,
  Renderer2,
  TemplateRef,
  Directive,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "cat-form-design-template",
  template: `
    <ng-template let-config #input>
      <cat-input [config]="config" catFormDesignTool></cat-input>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: "formDesignTemplate",
})
export class FormDesignTemplateComponent implements OnInit {
  @ViewChild("input", { static: true }) input: TemplateRef<any>;

  ngOnInit(): void {}
}
