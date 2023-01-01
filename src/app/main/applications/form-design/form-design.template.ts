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
    <ng-template let-config let-key="key" #input>
      <cat-input [config]="config" [key]="key" catFormDesignTool></cat-input>
    </ng-template>
    <ng-template let-config let-key="key" #warp>
      <cat-warp [config]="config" [key]="key" catFormDesignTool></cat-warp>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: "formDesignTemplate",
})
export class FormDesignTemplateComponent implements OnInit {
  @ViewChild("input", { static: true }) input: TemplateRef<any>;

  ngOnInit(): void {}
}
