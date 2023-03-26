import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "cat-form-design-config",
  templateUrl: "./form-design-config.component.html",
  styleUrls: ["./form-design-config.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDesignConfigComponent implements OnInit {
  formConfig = {
    labelPosi: "left",
    layout: "horizontal",
    compSize: "default",
    labelWidth: 6,
  };

  constructor() {}

  ngOnInit(): void {}
}
