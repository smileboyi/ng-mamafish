import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NzCheckboxGroupComponent } from "ng-zorro-antd/checkbox";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";

@Component({
  selector: "cat-checkbox-ele",
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
        <nz-checkbox-group
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
          [nzDisabled]="config?.base?.nzDisabled"
          #target
        >
        </nz-checkbox-group>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FD_ELE_META,
      useValue: { type: "checkbox", name: "复选框" },
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxEleComponent,
      multi: true,
    },
  ],
})
export class CheckboxEleComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  ngOnInit(): void {
    this.value = ([
      { label: "item1", value: 1 },
      { label: "item2", value: 2 },
    ] as any) as Event;
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
// [nzSize]="config?.self?.nzSize"
// [nzButtonStyle]="config?.self?.nzButtonStyle"
