import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";
import { forEach } from "lodash-es";

@Component({
  selector: "cat-input-number-ele",
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
        <nz-input-number
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
          [nzDisabled]="config?.base?.nzDisabled"
          [nzReadOnly]="nzReadOnly"
          [nzSize]="nzSize"
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
      useExisting: InputNumberEleComponent,
      multi: true,
    },
  ],
})
export class InputNumberEleComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild("target")
  target: NzInputNumberComponent;

  get nzReadOnly(): boolean {
    return this.config?.self?.["nzReadOnly"] || true;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    console.log(this as any);
  }

  bindingPropFromConfig(): void {
    if (!this.target) return;
    try {
      if (this.config?.self) {
        forEach(this.config?.self, (value, key) => {
          (this.target[key as WritableKeys<NzInputNumberComponent>] as ValueOf<
            NzInputNumberComponent
          >) = value;
        });
      }
      if (this.config?.event) {
        forEach(this.config?.event, (event, key) => {
          (this.target[
            key as ReadonlyKeys<NzInputNumberComponent>
          ] as EventEmitter<any>).subscribe(event);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
