import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
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
          nzTheme="fill"
          nzType="question-circle"
          [nzTooltipTitle]="tooltip"
        ></span>
      </nz-form-label>
      <nz-form-control [nzSpan]="14" [nzErrorTip]="config?.base?.nzErrorTip">
        <input
          *ngIf="!fdTextareaMode"
          nz-input
          [attr.type]="type"
          [(ngModel)]="value"
          [nzSize]="nzSize"
          (ngModelChange)="writeValue($event)"
          [attr.disabled]="config?.base?.nzDisabled"
        />
        <nz-textarea-count
          *ngIf="fdTextareaMode"
          [class.noaf]="nzMaxCharacterCount == 0"
          [nzMaxCharacterCount]="nzMaxCharacterCount"
          [nzComputeCharacterCount]="nzComputeCharacterCount"
        >
          <textarea
            nz-input
            rows="4"
            [(ngModel)]="value"
            [nzSize]="nzSize"
            (ngModelChange)="writeValue($event)"
            [attr.disabled]="config?.base?.nzDisabled"
            [nzAutosize]="nzAutosize"
          ></textarea>
        </nz-textarea-count>
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
export class InputEleComponent extends FdEleBaseComponent implements OnInit {
  get type(): "text" | "password" {
    return this.config?.self?.["type"] || "text";
  }

  get nzMaxCharacterCount(): number {
    return this.config?.self?.["nzMaxCharacterCount"] || 0;
  }

  get nzComputeCharacterCount(): (v: string) => number {
    return this.config?.self?.["nzComputeCharacterCount"] || ((s) => s.length);
  }

  get nzAutosize(): boolean | { minRows: number; maxRows: number } {
    return this.config?.self?.["nzAutosize"] || false;
  }

  get nzBorderless(): boolean {
    return this.config?.self?.["nzBorderless"] || false;
  }

  get fdTextareaMode(): boolean {
    return this.config?.self?.["fdTextareaMode"] || false;
  }

  ngOnInit(): void {}
}
