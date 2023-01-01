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
  ViewChild,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { BehaviorSubject, fromEvent, Subject, Subscription } from "rxjs";
import {
  map,
  takeUntil,
  concatAll,
  tap,
  skip,
  throttleTime,
} from "rxjs/operators";

import { FormDesignService } from "@services/form-design.service";

@Directive({
  selector: "[catFormDesignTool]",
})
export class FormDesignToolDirective implements AfterViewInit, OnDestroy {
  panel: ComponentRef<FormDesignToolPanelComponent> | null;
  subs: Subscription;
  child: Element | null;
  constructor(
    private elementRef: ElementRef,
    private vcf: ViewContainerRef,
    private formDesign: FormDesignService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    const obser$ = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      "click"
    );
    this.subs = obser$.subscribe((e) => {
      e.stopPropagation();
      e.preventDefault();
      if (this.formDesign.fdlDirective) {
        this.formDesign.fdlDirective.handleDestroy();
      }

      if (!this.panel) {
        const destroy$ = new BehaviorSubject<void>(void 0);
        const posi = this.elementRef.nativeElement.getAttribute("posi");
        this.formDesign.currFormDesignKey = posi;
        this.panel = this.vcf.createComponent(FormDesignToolPanelComponent);
        this.panel.instance.destroy$ = destroy$;
        this.panel.instance.posi = posi;
        this.formDesign.fdlDirective = this;
        this.child = (this.panel.hostView as EmbeddedViewRef<
          FormDesignToolPanelComponent
        >).rootNodes[0].childNodes.item(0);
        this.elementRef.nativeElement.parentNode.appendChild(this.child);
        destroy$.pipe(takeUntil(obser$), skip(1)).subscribe(() => {
          this.handleDestroy();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.handleDestroy();
  }

  handleDestroy(): void {
    this.vcf.clear();
    this.panel?.destroy();
    this.panel = null;
    if (this.child) {
      this.elementRef.nativeElement.parentNode.removeChild(this.child);
      this.child = null;
    }
  }
}

@Component({
  selector: "cat-form-design-panel",
  template: `
    <div class="form-design-panel">
      <span class="move" #move>{{ eleName }}</span>
      <div class="tool" *ngIf="handle$">
        <span class="up" (click)="operate($event, 'up')">A</span>
        <span class="down" (click)="operate($event, 'down')">B</span>
        <span class="copy" (click)="operate($event, 'copy')">C</span>
        <span class="del" (click)="operate($event, 'del')">D</span>
      </div>
    </div>
  `,
  styles: [
    `
      .form-design-panel {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 500;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 2px solid #409eff;
        pointer-events: none;
      }
      .form-design-panel .move {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        height: 22px;
        line-height: 22px;
        padding-right: 5px;
        font-size: 14px;
        font-style: normal;
        color: #fff;
        cursor: move;
        background-color: #409eff;
        pointer-events: auto;
        cursor: move;
      }
      .form-design-panel .tool {
        display: inline-flex;
        position: absolute;
        bottom: -2px;
        right: 0;
        z-index: 100;
        pointer-events: auto;
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
export class FormDesignToolPanelComponent implements AfterViewInit, OnDestroy {
  posi = "";
  eleName = "";
  handle$: Subject<string>;
  destroy$: BehaviorSubject<void>;
  dargSubs: Subscription;
  @ViewChild("move") move: ElementRef;

  constructor(
    private formDesign: FormDesignService,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.handle$ = formDesign.formDesignHandle$;
    const info = this.formDesign.formDesignMap.get(
      this.formDesign.currFormDesignKey
    )!;
    this.eleName = info.eleName!;
  }

  ngAfterViewInit(): void {
    const moveNode = this.move.nativeElement;
    const mouseDown = fromEvent<MouseEvent>(moveNode, "mousedown");
    const mouseMove = fromEvent<MouseEvent>(this.document, "mousemove");
    const mouseUp = fromEvent<MouseEvent>(this.document, "mouseup");
    let cloneNode: HTMLDivElement | null;
    this.dargSubs = mouseDown
      .pipe(
        tap((e) => {
          this.formDesign.fdlPanelShow = true;
          this.document.body.classList.add("darg-move");
          const parentNode = (e as any).target.parentNode;
          cloneNode = parentNode.cloneNode(true) as HTMLDivElement;
          this.document.body.appendChild(cloneNode);
          const width = Math.round(parentNode.getBoundingClientRect().width);
          const height = Math.round(parentNode.getBoundingClientRect().height);
          cloneNode.style.width = width + "px";
          cloneNode.style.height = height + "px";
          let ele = this.document.querySelector(`[posi='${this.posi}']`);
          cloneNode.appendChild(ele?.cloneNode(true) as Element);
        }),
        map(() =>
          mouseMove.pipe(
            takeUntil(
              mouseUp.pipe(
                tap((e) => {
                  this.formDesign.fdlPanelShow = false;
                  this.document.body.classList.remove("darg-move");
                  this.document.body.removeChild(cloneNode!);
                })
              )
            ),
            throttleTime(50),
            tap((e) => {
              cloneNode!.style.top = `${e.clientY - 5}px`;
              cloneNode!.style.left = `${e.clientX - 15}px`;
            })
          )
        ),
        concatAll()
      )
      .subscribe((e: MouseEvent) => {});
  }

  ngOnDestroy(): void {
    this.dargSubs.unsubscribe();
  }

  operate(e: Event, type: string): void {
    e.stopPropagation();
    e.preventDefault();
    if (type == "del") {
      this.destroy$.next();
    }
    this.handle$.next(type);
  }
}
