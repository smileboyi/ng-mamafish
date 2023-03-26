import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { InputNumberComponent } from "./ele-template/input-number.component";
import { InputEleComponent } from "./ele-template/input.component";
import { WarpComponent } from "./ele-template/warp.component";

@Component({
  selector: "cat-form-design-template",
  template: `
    <ng-template let-config let-key="key" #input>
      <cat-input-ele
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-input-ele>
    </ng-template>
    <ng-template let-config let-key="key" #warp>
      <cat-warp [config]="config" [key]="key" catFormDesignTool></cat-warp>
    </ng-template>
    <ng-template let-config let-key="key" #inputnumber>
      <cat-input-number
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-input-number>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: "formDesignTemplate",
})
export class FormDesignTemplateComponent implements OnInit {
  @ViewChild("input", { static: true }) input: TemplateRef<InputEleComponent>;
  @ViewChild("warp", { static: true }) warp: TemplateRef<WarpComponent>;
  @ViewChild("inputnumber", { static: true }) inputnumber: TemplateRef<
    InputNumberComponent
  >;

  ngOnInit(): void {}
}
