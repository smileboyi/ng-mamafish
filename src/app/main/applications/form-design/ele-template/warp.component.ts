import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewContainerRef,
  Input,
} from "@angular/core";

import { FdEleBaseComponent } from "./fd-ele-base.component";
import { FD_ELE_META } from "@tokens";

@Component({
  selector: "cat-warp",
  template: `
    <span>{{ frontText }}</span>
    <ng-content></ng-content>
    <span>{{ behindText }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flex;
        position: relative;
        flex-wrap: wrap;
        width: 100%;
        height: auto;
        min-height: 40px;
        padding: 5px;
      }
    `,
  ],
  providers: [
    {
      provide: FD_ELE_META,
      useValue: { type: "warp", name: "容器" },
    },
  ],
})
export class WarpComponent extends FdEleBaseComponent
  implements OnInit, AfterViewInit {
  @Input() frontText = "";
  @Input() behindText = "";
  target: ViewContainerRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
