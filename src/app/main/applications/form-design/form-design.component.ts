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
  ViewContainerRef,
  EmbeddedViewRef,
  TemplateRef
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
import { FormDesignTemplateComponent } from "./form-design.template";
import { DsignLayoutType, DsignEleNode, FdTemplateConfig } from "@declare";

@Component({
  selector: "cat-form-design",
  templateUrl: "./form-design.component.html",
  styleUrls: ["./form-design.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDesignComponent implements OnInit, AfterViewInit {
  layoutType: DsignLayoutType = "PC";
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

  column = 2;
  formConfig = {
    labelPosi: "left",
    layout: "horizontal",
    compSize: "default",
    labelWidth: 6,
  };

  get columns() {
    return new Array(this.column).fill(24 / this.column);
  }

  @ViewChild("choiceBox") choiceBox: ElementRef;
  @ViewChild("lastNzRow") lastNzRow: ElementRef;
  @ViewChild("form") form: ElementRef;
  @ViewChild("fdemplate", { read: FormDesignTemplateComponent })
  fdemplate: FormDesignTemplateComponent;
  @ViewChild("nzRowTemplate")
  nzRowTemplate: ElementRef<any>;
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
    private vcr: ViewContainerRef,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ["sdfsfd", []],
    });
  }

  ngAfterViewInit(): void {
    const mouseDown = fromEvent<MouseEvent>(
      this.choiceBox.nativeElement,
      "mousedown"
    );
    const mouseMove = fromEvent<MouseEvent>(this.document, "mousemove");
    const mouseUp = fromEvent<MouseEvent>(this.document, "mouseup");
    let cloneNode: HTMLDivElement | null;
    let focusBox: HTMLDivElement | null;

    const hoverSubs$ = fromEvent<MouseEvent>(
      this.form.nativeElement,
      "mousemove"
    )
      .pipe(
        debounceTime(10),
        filter(() => Boolean(cloneNode))
      )
      .subscribe((e: MouseEvent) => {
        let target = e.target as Element;
        if (target.classList.contains("drag-focus")) {
          return;
        }
        if (target.hasAttribute("nz-form") || target.hasAttribute("nz-row")) {
          return;
        }
        if (target.nodeName != "cat-div" && !target.hasAttribute("nz-col")) {
          while (
            target.nodeName == "cat-div" ||
            target.hasAttribute("nz-col")
          ) {
            target = target.parentNode as Element;
          }
        }
        if (target) {
          focusBox?.classList.remove("drag-focus");
          focusBox = target as HTMLDivElement;
          focusBox.classList.add("drag-focus");
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
          this.lastNzRow.nativeElement.classList.add("show");
        }),
        map(() =>
          mouseMove.pipe(
            takeUntil(
              mouseUp.pipe(
                // 还原
                tap((e) => {
                  this.document.body.classList.remove("darg-move");
                  this.document.body.removeChild(cloneNode!);
                  this.lastNzRow.nativeElement.classList.remove("show");
                  focusBox?.classList.remove("drag-focus");
                  this.inertEleNodeToForm(focusBox, cloneNode);
                  cloneNode = null;
                  focusBox = null;
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
    this.subscription.push(hoverSubs$);
  }

  switchLayout(type: DsignLayoutType) {
    this.layoutType = type;
  }

  genTreeDirectory(): DsignEleNode[] {
    const directory: DsignEleNode[] = [];
    (this.form.nativeElement as HTMLFormElement).childNodes.forEach(
      (rowMode: ChildNode, x: number) => {
        let children: DsignEleNode[] = [];
        rowMode.childNodes.forEach((colNode: ChildNode, y: number) => {
          let subChildren: DsignEleNode[] = [];
          colNode.childNodes.forEach((node: ChildNode, z: number) => {
            if (node.nodeType == 1) {
              const path = `${x}-${y}-${z}`;
              subChildren.push({
                title: node.nodeName,
                key: path,
                children: this.getDsignEleNode(node, path),
              });
            }
          });
          children.push({
            title: "col",
            key: `${x}-${y}`,
            children: subChildren,
          });
        });
        directory.push({
          title: "row",
          key: `${x}`,
          children: children,
        });
      }
    );
    return directory;
  }

  getDsignEleNode(node: ChildNode, path: string): DsignEleNode[] {
    if (node.nodeName == "cat-div") {
      const directory: DsignEleNode[] = [];
      node.childNodes.forEach((node: ChildNode, i: number) => {
        if (node.nodeType == 1) {
          directory.push({
            title: node.nodeName,
            key: `${path}-${i}`,
            children: this.getDsignEleNode(node, `${path}-${i}`),
          });
        }
      });
      return directory;
    } else {
      return [];
    }
  }

  getEleNodePosi() {}

  inertEleNodeToForm(focusBox: HTMLDivElement | null, node: any) {
    if (!focusBox) return;
    const nodetype = (node.getAttribute("nodetype") as string)
      .split("d-")[1]
      .replace("-", "");

    const ele = this.vcr.createEmbeddedView<{
      $implicit: FdTemplateConfig;
      // @ts-ignore
    }>(this.fdemplate[nodetype], {
      $implicit: {},
    });
    if ((focusBox.parentNode as Element).classList.contains("last-row")) {
      const nzRow = this.nzRowTemplate.nativeElement.cloneNode(
        true
      ) as HTMLDivElement;
      nzRow.classList.remove("dn");
      const nzCol = nzRow.querySelector("[nz-col]") as HTMLDivElement;
      nzCol.appendChild(ele.rootNodes[0]);
      this.form.nativeElement.insertBefore(nzRow, focusBox.parentNode);
    } else {
      focusBox.appendChild(ele.rootNodes[0]);
    }
  }

  handleTest2() {
    this.validateForm.patchValue({
      userName: "234234234",
    });
    this.column = 4;
  }
}
