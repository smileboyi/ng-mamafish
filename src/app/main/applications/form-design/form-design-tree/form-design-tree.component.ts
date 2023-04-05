import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { DsignEleNode } from "@declare";

@Component({
  selector: "cat-form-design-tree",
  templateUrl: "./form-design-tree.component.html",
  styleUrls: ["./form-design-tree.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDesignTreeComponent {
  @Input() nodes: DsignEleNode[] = [];

  nodeClick(e: any): void {
    console.log(e);
  }
}
