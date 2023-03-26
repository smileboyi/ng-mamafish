import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";

@Component({
  selector: "cat-input-number",
  template: `
    <nz-form-item>
      <nz-form-label
        [nzSpan]="labelWidth"
        [nzRequired]="config?.base?.nzRequired"
      >
        <span
          *ngIf="tooltip"
          nz-icon
          nz-tooltip
          nzType="question-circle"
          nzTheme="fill"
          [nzTooltipTitle]="tooltip"
        ></span>
      </nz-form-label>
      <nz-form-control [nzSpan]="14" nzErrorTip="Please input your password!">
        <nz-input-number
          [attr.name]="eleName"
          [attr.type]="nzType"
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
          [nzDisabled]="config?.base?.nzDisabled"
          [formControl]="formControl"
          #target
        ></nz-input-number>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FD_ELE_META,
      useValue: { type: "input-number", name: "数字输入框" },
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputNumberComponent,
      multi: true,
    },
  ],
})
export class InputNumberComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild("target")
  target: NzInputNumberComponent;

  nzType = "text";

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.config?.base?.eleName;
    console.log((this as any))
  }
}
