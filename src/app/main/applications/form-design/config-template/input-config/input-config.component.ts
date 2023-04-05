import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "cat-input-config",
  templateUrl: "./input-config.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputConfigComponent implements OnInit {
  configFrom: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.configFrom = this.fb.group({
      base: this.fb.group({
        labelName: [null],
        labelWidth: [null],
        nzSize: [null],
        tooltip: [null],
        nzErrorTip: [null],
        nzDisabled: [null],
        nzRequired: [null],
      }),
      self: this.fb.group({
        type: ["text"],
        placeholder: [null],
        nzBorderless: [false],
        fdTextareaMode: [false],
        nzAutosize: [true],
        nzMaxCharacterCount: [null],
        nzComputeCharacterCount: [null],
      }),
      event: this.fb.group({}),
      other: this.fb.group({
        style: [null],
        className: [null],
        canShow: [null],
        ref: [null],
        extraAttr: [null],
      }),
    });
    // this.configFrom.controls["nzAutosize"].valueChanges.subscribe((v) => {
    //   console.log(v);
    // });
  }

  ngOnInit(): void {}
}
