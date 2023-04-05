import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
} from "@angular/core";

import { AutocompleteEleComponent } from "./ele-template/autocomplete-ele.component";
import { CascaderEleComponent } from "./ele-template/cascader-ele.component";
import { CheckboxEleComponent } from "./ele-template/checkbox-ele.component";
import { InputNumberEleComponent } from "./ele-template/input-number-ele.component";
import { InputEleComponent } from "./ele-template/input-ele.component";
import { RadioEleComponent } from "./ele-template/radio-ele.component";
import { RateEleComponent } from "./ele-template/rate-ele.component";
import { WarpEleComponent } from "./ele-template/warp-ele.component";

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
      <cat-warp-ele
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-warp-ele>
    </ng-template>
    <ng-template let-config let-key="key" #inputnumber>
      <cat-input-number-ele
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-input-number-ele>
    </ng-template>
    <ng-template let-config let-key="key" #rate>
      <cat-rate-ele
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-rate-ele>
    </ng-template>
    <ng-template let-config let-key="key" #autocomplete>
      <cat-autocomplete-ele
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-autocomplete-ele>
    </ng-template>
    <ng-template let-config let-key="key" #checkbox>
      <cat-checkbox-ele
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-checkbox-ele>
    </ng-template>
    <ng-template let-config let-key="key" #cascader>
      <cat-cascader-ele
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-cascader-ele>
    </ng-template>
    <ng-template let-config let-key="key" #cascader>
      <cat-cascader-ele
        [config]="config"
        [key]="key"
        catFormDesignTool
      ></cat-cascader-ele>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: "formDesignTemplate",
})
export class FormDesignTemplateComponent implements OnInit {
  @ViewChild("input", { static: true }) input: TemplateRef<InputEleComponent>;
  @ViewChild("warp", { static: true }) warp: TemplateRef<WarpEleComponent>;
  @ViewChild("inputnumber", { static: true }) inputnumber: TemplateRef<
    InputNumberEleComponent
  >;
  @ViewChild("rate", { static: true }) rate: TemplateRef<RateEleComponent>;
  @ViewChild("autocomplete", { static: true }) autocomplete: TemplateRef<
    AutocompleteEleComponent
  >;
  @ViewChild("checkbox", { static: true }) checkbox: TemplateRef<
    CheckboxEleComponent
  >;
  @ViewChild("cascader", { static: true }) cascader: TemplateRef<
    CascaderEleComponent
  >;
  @ViewChild("radio", { static: true }) radio: TemplateRef<RadioEleComponent>;

  ngOnInit(): void {}
}
