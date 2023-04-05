import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { NzRateComponent } from "ng-zorro-antd/rate";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";

@Component({
  selector: "cat-rate-ele",
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
        <nz-rate
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
          [attr.disabled]="config?.base?.nzDisabled"
          #target
        ></nz-rate>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FD_ELE_META,
      useValue: { type: "rate", name: "评分" },
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RateEleComponent,
      multi: true,
    },
  ],
})
export class RateEleComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild("target") target: NzRateComponent;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
