import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Inject,
  ChangeDetectorRef,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { FormDesignState } from "@reducers/form-design.reducer";
import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FormDesignService } from "@services/form-design.service";
import { FdEleMeta, FdTemplateConfig } from "@declare";
import { FD_ELE_META } from "@tokens";

@Component({
  selector: "cat-input",
  template: `
    <nz-form-item>
      <nz-form-label [nzSpan]="labelWidth" nzFor="email">
        {{ labelName }}
        <span
          *ngIf="tooltip"
          nz-icon
          nz-tooltip
          nzType="question-circle"
          nzTheme="fill"
          [nzTooltipTitle]="tooltip"
          nzTooltipColor="blue"
        ></span>
      </nz-form-label>
      <nz-form-control [nzSpan]="14">
        <input
          nz-input
          [attr.name]="eleName"
          [attr.type]="nzType"
          [(ngModel)]="value"
          (ngModelChange)="writeValue($event)"
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
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild("target", { read: NzInputDirective, static: true })
  target: NzInputDirective;

  nzType = "text";

  constructor(
    @Inject(FD_ELE_META) protected fdEleMeta: FdEleMeta,
    protected store: Store<FormDesignState>,
    protected formDesign: FormDesignService,
    protected cdr: ChangeDetectorRef
  ) {
    super(fdEleMeta, store, formDesign, cdr);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  setInputConfig(config: FdTemplateConfig) {
    console.log(this.target);
  }
}
