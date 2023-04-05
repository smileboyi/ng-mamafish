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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDesignHeaderComponent {
  @Input() layoutType: DsignLayoutType = "iPad";
  @Output() layoutTypeChange = new EventEmitter<DsignLayoutType>();
  @Output() triggerAction = new EventEmitter<string>();

  
  handle(type:string):void {
    if(type =="treeview") {


    }
    this.triggerAction.next(type)
  }
}
