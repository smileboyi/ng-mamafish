import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  ChangeDetectorRef,
  Renderer2,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";
import { fromEvent, Subscription } from "rxjs";
import {
  switchMap,
  switchAll,
  map,
  takeUntil,
  concatAll,
  skipWhile,
  tap,
  filter,
  debounceTime,
  throttleTime,
} from "rxjs/operators";

import { FormDesignEle, formDesignEles } from "./form-design.data";

type LayoutType = "PC" | "iPad" | "H5";

@Component({
  selector: "cat-form-design",
  templateUrl: "./form-design.component.html",
  styleUrls: ["./form-design.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDesignComponent implements OnInit, AfterViewInit {
  layoutType: LayoutType = "PC";
  get layoutClass() {
    return {
      PC: "desktop",
      iPad: "ipadpro",
      H5: "iphonex",
    }[this.layoutType];
  }

  choiceEles: FormDesignEle[] = formDesignEles;
  validateForm!: UntypedFormGroup;
  subscription: Subscription[] = [];

  formConfig = {
    labelPosi:'left',
    layout:"horizontal",
    compSize:'default'
  }

  @ViewChild("choiceBox") choiceBox: ElementRef;
  @ViewChild("lastNzRow") lastNzRow: ElementRef;
  @ViewChild("form") form: ElementRef;

  nodes = [
    {
      title: "parent 1",
      key: "100",
      children: [
        {
          title: "parent 1-0",
          key: "1001",
          children: [
            { title: "leaf 1-0-0", key: "10010", isLeaf: true },
            { title: "leaf 1-0-1", key: "10011", isLeaf: true },
          ],
        },
        {
          title: "parent 1-1",
          key: "1002",
          children: [{ title: "leaf 1-1-0", key: "10020", isLeaf: true }],
        },
      ],
    },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
  }

  ngAfterViewInit(): void {
    const mouseDown = fromEvent<MouseEvent>(
      this.choiceBox.nativeElement,
      "mousedown"
    );
    const mouseOver = fromEvent<MouseEvent>(
      this.form.nativeElement,
      "mousemove"
    );
    const mouseMove = fromEvent<MouseEvent>(this.document, "mousemove");
    const mouseUp = fromEvent<MouseEvent>(this.document, "mouseup");
    let cloneNode: HTMLDivElement | null;
    let focusCol: HTMLDivElement;

    const formSubs$ = mouseOver
      .pipe(
        debounceTime(50),
        filter(() => Boolean(cloneNode))
      )
      .subscribe((e: MouseEvent) => {
        let target = e.target as Element;

        if (target.hasAttribute("nz-form") || target.hasAttribute("nz-row")) {
          return;
        }
        if (!target.hasAttribute("nz-col")) {
          while (!target.hasAttribute("nz-col")) {
            target = target.parentNode as Element;
          }
        }

        if (!target || !target.classList.contains("drag-focus")) {
          focusCol?.classList.remove("drag-focus");
          focusCol = target as HTMLDivElement;
          focusCol.classList.add("drag-focus");
        }
      });

    const dargSubs$ = mouseDown
      .pipe(
        filter((e) => {
          const classStr = (e.target as Element).getAttribute("class") || "";
          return classStr.includes("choice-item");
        }),
        tap((e) => {
          this.document.body.classList.add("darg-move");
          cloneNode = (e.target as Element).cloneNode(true) as HTMLDivElement;
          cloneNode.classList.add("darg-move-block");
          this.document.body.appendChild(cloneNode);
          this.renderer2.setStyle(
            this.lastNzRow.nativeElement,
            "visibility",
            "visible"
          );
        }),
        map(() =>
          mouseMove.pipe(
            takeUntil(
              mouseUp.pipe(
                // 还原
                tap((e) => {
                  this.document.body.classList.remove("darg-move");
                  this.document.body.removeChild(cloneNode!);
                  this.renderer2.setStyle(
                    this.lastNzRow.nativeElement,
                    "visibility",
                    "hidden"
                  );
                  focusCol?.classList.remove("drag-focus");
                  cloneNode = null;
                })
              )
            ),
            throttleTime(50),
            tap((e) => {
              // cloneNode移动
              cloneNode!.style.top = `${e.clientY - 25}px`;
              cloneNode!.style.left = `${e.clientX - 58}px`;
            })
          )
        ),
        concatAll()
      )
      .subscribe((e: MouseEvent) => {});

    this.subscription.push(dargSubs$);
    this.subscription.push(formSubs$);
  }

  switchLayout(type: LayoutType) {
    this.layoutType = type;
  }
}
