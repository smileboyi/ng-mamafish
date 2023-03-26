import {
  ChangeDetectionStrategy,
  Component,
  Output,
  Input,
  EventEmitter,
} from "@angular/core";

import { DsignLayoutType } from "@declare";

@Component({
  selector: "cat-form-design-header",
  templateUrl: "./form-design-header.component.html",
  styleUrls: ["./form-design-header.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDesignHeaderComponent {
  @Input() layoutType: DsignLayoutType = "PC";
  @Output() layoutTypeChange = new EventEmitter<DsignLayoutType>();
}
