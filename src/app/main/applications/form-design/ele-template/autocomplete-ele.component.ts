import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
} from "@angular/core";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzAutocompleteComponent } from "ng-zorro-antd/auto-complete";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";
import { forEach } from "lodash-es";

interface AutocompleteDataSourceItem {
  value: string;
  label: string;
}
declare type AutocompleteDataSource = Array<
  AutocompleteDataSourceItem | string | number
>;

@Component({
  selector: "cat-autocomplete-ele",
  template: `
    <nz-form-item>
      <nz-form-label
        [nzSpan]="labelWidth"
        [nzRequired]="config?.base?.nzRequired"
      >
        {{ eleName }}
        <span
          *ngIf="tooltip"
          nz-icon
          nz-tooltip
          nzTheme="fill"
          nzType="question-circle"
          [nzTooltipTitle]="tooltip"
        ></span>
      </nz-form-label>
      <nz-form-control [nzSpan]="14" [nzErrorTip]="config?.base?.nzErrorTip">
        <input
          nz-input
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
          [attr.disabled]="config?.base?.nzDisabled"
          [nzAutocomplete]="target"
          #input
        />
        <nz-autocomplete [nzDataSource]="data" #target></nz-autocomplete>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FD_ELE_META,
      useValue: { type: "autocomplete", name: "自动完成" },
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteEleComponent,
      multi: true,
    },
  ],
})
export class AutocompleteEleComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild("input", { read: NzInputDirective }) input: NzInputDirective;
  @ViewChild("target") target: NzAutocompleteComponent;

  @Input() data: AutocompleteDataSource = ["item1", "item2"];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  bindingConfig(): void {
    if (!this.target) return;
    try {
      if (this.config?.self) {
        forEach(this.config?.self, (value, key) => {
          // @ts-ignore
          this.target[key] = value;
        });
      }
      if (this.config?.event) {
        forEach(this.config?.event, (value, key) => {
          // @ts-ignore
          this.target[key] = value;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
