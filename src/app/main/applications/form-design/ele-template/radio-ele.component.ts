import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";

interface RadioDataSourceItem {
  value: string;
  label: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export declare type RadioDataSource = Array<
  RadioDataSourceItem | string | number
>;

@Component({
  selector: "cat-radio-ele",
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
        <nz-radio-group
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
          [nzDisabled]="config?.base?.nzDisabled"
          #target
        >
          <!-- <label
            nz-radio
            nzValue="d.value"
            [nzAutoFocus]="d.autoFocus"
            [nzDisabled]="d.disabled"
            *ngFor="let d of data"
            >{{ d.label }}</label
          > -->
        </nz-radio-group>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FD_ELE_META,
      useValue: { type: "radio", name: "单选框" },
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioEleComponent,
      multi: true,
    },
  ],
})
export class RadioEleComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @Input() data: string[] = [];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
