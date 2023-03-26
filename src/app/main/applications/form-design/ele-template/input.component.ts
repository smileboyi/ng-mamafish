import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";

@Component({
  selector: "cat-input-ele",
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
          nzType="question-circle"
          nzTheme="fill"
          [nzTooltipTitle]="tooltip"
        ></span>
      </nz-form-label>
      <nz-form-control [nzSpan]="14">
        <input
          nz-input
          [attr.name]="eleName"
          [attr.type]="nzType"
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
          [attr.disabled]="config?.base?.nzDisabled"
          #target
        />
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FD_ELE_META,
      useValue: { type: "input", name: "输入框" },
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputEleComponent,
      multi: true,
    },
  ],
})
export class InputEleComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild("target", { read: NzInputDirective, static: false })
  target: NzInputDirective;

  nzType = "text";

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
