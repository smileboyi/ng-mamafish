import {
  Directive,
  Component,
  ChangeDetectionStrategy,
  ComponentRef,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  ViewContainerRef,
  EmbeddedViewRef,
  Inject,
  Input,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { fromEvent, Subscription } from "rxjs";

@Directive({
  selector: "[catFormDesignTool]",
})
export class FormDesignToolDirective implements AfterViewInit, OnDestroy {
  panel: ComponentRef<FormDesignToolPanelComponent> | null;
  subs$: Subscription;

  @Input("catFormDesignTool") info:any = {};

  constructor(
    private elementRef: ElementRef,
    private vcf: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    console.log(this.info)
    this.subs$ = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      "click"
    ).subscribe((e) => {
      if (!this.panel) {
        this.panel = this.vcf.createComponent(FormDesignToolPanelComponent);
        this.panel.instance.eleName = "2342";
        const child = (this.panel.hostView as EmbeddedViewRef<
          FormDesignToolPanelComponent
        >).rootNodes[0].childNodes.item(0);
        this.elementRef.nativeElement.parentNode.appendChild(child);
        this.vcf.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}

@Component({
  selector: "cat-form-design-panel",
  template: `
    <div class="form-design-panel">
      <span class="move">*{{ eleName }}</span>
      <div class="tool">
        <span class="up" (click)="handleUp()">A</span>
        <span class="down" (click)="handleDown()">B</span>
        <span class="copy" (click)="handleCopy()">C</span>
        <span class="del" (click)="handleDel()">D</span>
      </div>
    </div>
  `,
  styles: [
    `
      .form-design-panel {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 500;
        box-sizing: border-box;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background-color: transparent;
        border: 2px solid #409eff;
      }
      .form-design-panel .move {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        height: 22px;
        line-height: 22px;
        font-size: 14px;
        font-style: normal;
        color: #fff;
        cursor: move;
        background-color: #409eff;
      }
      .form-design-panel .tool {
        display: inline-flex;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .form-design-panel .tool > span {
        width: 24px;
        height: 28px;
        line-height: 28px;
        color: #fff;
        text-align: center;
        background-color: #409eff;
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDesignToolPanelComponent {
  eleName = "";

  handleUp() {}

  handleDown() {}

  handleCopy() {}

  handleDel() {}
}
