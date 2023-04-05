import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NzCascaderComponent } from "ng-zorro-antd/cascader";
import { forEach } from "lodash-es";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";

@Component({
  selector: "cat-cascader-ele",
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
        <nz-cascader
          [attr.name]="eleName"
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
          [nzDisabled]="config?.base?.nzDisabled"
          [formControl]="formControl"
          #target
        ></nz-cascader>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FD_ELE_META,
      useValue: { type: "cascader", name: "级联选择" },
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CascaderEleComponent,
      multi: true,
    },
  ],
})
export class CascaderEleComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild("target") target: NzCascaderComponent;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.config?.base?.eleName;

    // console.log(this.target.nzAllowClear)
  }

  // bindingConfig(): void {
  //   if (!this.target) return
  //   try {
  //     if (this.config?.self) {
  //       forEach(this.config?.self, (value, key) => {
  //         type ValueOf<T, U extends keyof T = keyof T> = T[U]
  //         (this.target[key as WritableKeys<NzCascaderComponent>] as ValueOf<NzCascaderComponent>) = value;
  //       })
  //     }
  //     if (this.config?.event) {
  //       forEach(this.config?.event, (event, key) => {
  //         (this.target[key as ReadonlyKeys<NzCascaderComponent>] as EventEmitter<any>).subscribe(event)
  //       })
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}
