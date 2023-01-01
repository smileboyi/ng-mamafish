import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Inject,
  Input,
  ElementRef,
  ViewContainerRef,
  ChangeDetectorRef,
} from "@angular/core";
import { Store } from "@ngrx/store";

import { FormDesignState } from "@reducers/form-design.reducer";
import { FdEleBaseComponent } from "./fd-ele-base.component";
import { GlobalService } from "@services/global.service";
import { FormDesignService } from "@services/form-design.service";
import { FdEleMeta, FdTemplateConfig } from "@declare";
import { FD_ELE_META } from "@tokens";

@Component({
  selector: "cat-warp",
  template: `
    <span *ngIf="frontText">{{ frontText }}</span>
    <ng-content></ng-content>
    <span *ngIf="behindText">{{ behindText }}</span>
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

  constructor(
    @Inject(FD_ELE_META) protected fdEleMeta: FdEleMeta,
    protected store: Store<FormDesignState>,
    protected formDesign: FormDesignService,
    protected cdr: ChangeDetectorRef,
    private vcf: ViewContainerRef
  ) {
    super(fdEleMeta, store, formDesign, cdr);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  setInputConfig(config: FdTemplateConfig) {
    // console.log(this.target);
  }
}
