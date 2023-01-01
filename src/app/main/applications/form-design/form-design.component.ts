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
  TemplateRef,
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
import { last, startsWith, replace } from "lodash-es";

import { FormDesignEle, formDesignEles } from "./form-design.data";
import { FormDesignTemplateComponent } from "./form-design.template";
import { DsignLayoutType, DsignEleNode, FdTemplateConfig } from "@declare";
import { FormDesignService } from "@services/form-design.service";

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

  get eleNode(): Element {
    return this.document.querySelector(
      `[posi='${this.formDesign.currFormDesignKey}']`
    )!;
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
    private formDesign: FormDesignService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.subscription.push(
      formDesign.formDesignHandle$.subscribe((v) => {
        if (v == "up") {
          this.handleEleNodeUp();
        } else if (v == "down") {
          this.handleEleNodeDown();
        } else if (v == "left") {
          this.handleELeNodwLeft();
        } else if (v == "right") {
          this.handleELeNodeRight();
        } else if (v == "copy") {
          this.handleEleNodeCopy();
        } else if (v == "del") {
          this.handleEleNodeDel();
        }
      })
    );
  }

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

    const hoverSubs = fromEvent<MouseEvent>(
      this.form.nativeElement,
      "mousemove"
    )
      .pipe(
        debounceTime(10),
        filter(() => Boolean(cloneNode) || this.formDesign.fdlPanelShow)
      )
      .subscribe((e: MouseEvent) => {
        let target = e.target as Element;
        if (target.classList.contains("drag-focus")) {
          return;
        }
        if (target.hasAttribute("nz-form") || target.hasAttribute("nz-row")) {
          return;
        }
        while (
          target.nodeName.toLowerCase() != "cat-warp" &&
          !target.hasAttribute("nz-col")
        ) {
          target = target.parentNode as Element;
        }
        if (target) {
          focusBox?.classList.remove("drag-focus");
          focusBox = target as HTMLDivElement;
          focusBox.classList.add("drag-focus");
        }
      });

    const dargSubs = mouseDown
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
          if (this.formDesign.fdlDirective) {
            this.formDesign.fdlDirective.handleDestroy();
          }
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
                  this.inertEleNodeToForm(focusBox, cloneNode!);
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

    this.subscription.push(dargSubs);
    this.subscription.push(hoverSubs);
  }

  switchLayout(type: DsignLayoutType): void {
    this.layoutType = type;
  }

  genTreeDirectory(): DsignEleNode[] {
    const directory: DsignEleNode[] = [];
    (this.form.nativeElement as HTMLFormElement).childNodes.forEach(
      (rowMode: ChildNode, x: number) => {
        if (rowMode.nodeType == 1) {
          let children: DsignEleNode[] = [];
          rowMode.childNodes.forEach((colNode: ChildNode, y: number) => {
            if (colNode.nodeType == 1) {
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
            }
          });
          directory.push({
            title: "row",
            key: `${x}`,
            children: children,
          });
        }
      }
    );
    directory.pop();
    return directory;
  }

  getDsignEleNode(node: ChildNode, path: string): DsignEleNode[] {
    if (node.nodeName.toLowerCase() == "cat-warp") {
      const directory: DsignEleNode[] = [];
      node.childNodes.forEach((node: ChildNode, i: number) => {
        if (
          node.nodeType == 1 &&
          node.nodeName.toLowerCase().includes("cat-")
        ) {
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

  // 那行那列，从第几个开始
  getEleNodePosi(child: Element): number[] {
    const arr: number[] = [];
    while (child.nodeName.toLowerCase() != "form") {
      let idx = 0;
      let prev = child.previousElementSibling;
      while (prev) {
        const nodeName = prev.nodeName.toLowerCase();
        if (
          nodeName.includes("cat-") ||
          prev.hasAttribute("nz-row") ||
          prev.hasAttribute("nz-col")
        ) {
          idx += 1;
        }
        prev = prev.previousElementSibling;
      }
      arr.push(idx);
      child = child.parentNode as Element;
    }
    return arr.reverse();
  }

  inertEleNodeToForm(focusBox: HTMLDivElement | null, node: Element): void {
    if (!focusBox) return;
    const nodetype = (node.getAttribute("nodetype") as string)
      .split("d-")[1]
      .replace("-", "");

    let parent!: Element;
    if ((focusBox.parentNode as Element).classList.contains("last-row")) {
      const nzRow = this.nzRowTemplate.nativeElement.cloneNode(
        true
      ) as HTMLDivElement;
      nzRow.classList.remove("dn");
      const nzCol = nzRow.querySelector("[nz-col]") as HTMLDivElement;
      this.form.nativeElement.insertBefore(nzRow, focusBox.parentNode);
      parent = nzCol;
    } else {
      parent = focusBox;
    }
    let lastIdx = 0;
    parent.childNodes.forEach((child: ChildNode) => {
      if (
        child.nodeType == 1 &&
        child.nodeName.toLowerCase().includes("cat-")
      ) {
        lastIdx++;
      }
    });
    let posi = this.getEleNodePosi(parent).join("-") + "-" + lastIdx;
    this.formDesign.currFormDesignKey = posi;
    const ele = this.vcr.createEmbeddedView<{
      $implicit: FdTemplateConfig;
      // @ts-ignore
    }>(this.fdemplate[nodetype], {
      $implicit: {},
    });
    const child: Element = ele.rootNodes[0];
    child.setAttribute("posi", posi);
    parent.appendChild(child);
    const info = this.formDesign.formDesignMap.get(posi) || {};
    this.formDesign.formDesignMap.set(posi, { ...info, ele });
  }

  removeEleNodeToForm(node: Element): void {}

  createEleByConfig(
    nodetype: string,
    config: FdTemplateConfig = {},
    posi: string
  ): EmbeddedViewRef<any> {
    const ele = this.vcr.createEmbeddedView<{
      $implicit: FdTemplateConfig;
      key: string;
      // @ts-ignore
    }>(this.fdemplate[nodetype], {
      $implicit: config,
      key: posi,
    });
    return ele;
  }

  createEleNodeByInfoMap(infoPosi: string): Element {
    const infoMap = this.formDesign.formDesignMap;
    const posis: string[] = [];
    for (let k of infoMap.keys()) {
      if (startsWith(k, infoPosi) && k != infoPosi) {
        posis.push(k);
      }
    }
    const info = infoMap.get(infoPosi)!;
    const nodetype = (info.eleType as string).split("-").join("");
    // 更新组件引用
    info.ele = this.createEleByConfig(nodetype, info.config, infoPosi);
    infoMap.set(infoPosi, info);
    const child = info.ele.rootNodes[0];
    posis.forEach((p) => {
      child.appendChild(this.createEleNodeByInfoMap(p));
    });
    return child;
  }

  exchangeEleNodeInfo(posi1: string, posi2: string) {
    const infoMap = this.formDesign.formDesignMap;
    let posis1: string[] = [];
    let posis2: string[] = [];
    const infos1: any[] = [];
    const infos2: any[] = [];
    for (const [k, v] of infoMap) {
      if (startsWith(k, posi1)) {
        posis1.push(k);
        infos1.push({ ...v });
      } else if (startsWith(k, posi2)) {
        posis2.push(k);
        infos2.push({ ...v });
      }
    }
    [...posis1, ...posis2].forEach((p) => {
      infoMap.delete(p);
    });
    posis1
      .map((p) => replace(p, posi1, posi2))
      .forEach((p, i) => {
        infoMap.set(p, infos1[i]);
      });
    posis2
      .map((p) => replace(p, posi2, posi1))
      .forEach((p, i) => {
        infoMap.set(p, infos2[i]);
      });
  }

  updateElePosiAttr(ele: Element | ChildNode, posi: string): void {
    // @ts-ignore
    ele.setAttribute("posi", posi);
    if (ele.nodeName.toLowerCase() == "cat-warp") {
      let childNodes: ChildNode[] = [];
      ele.childNodes.forEach((child: ChildNode) => {
        if (
          child.nodeType == 1 &&
          child.nodeName.toLowerCase().includes("cat-")
        ) {
          childNodes.push(child);
        }
      });
      childNodes.forEach((child: ChildNode, i: number) => {
        this.updateElePosiAttr(child, posi + "-" + i);
      });
    }
  }

  moveInlinePosi(type: "up" | "down"): void {
    if (this.formDesign.fdlDirective) {
      this.formDesign.fdlDirective.handleDestroy();
    }
    const currentPosi = this.formDesign.currFormDesignKey;
    const arr = currentPosi.split("-");
    let idx = Number(arr.pop());
    idx = type == "up" ? idx - 1 : idx + 1;
    const targetPosi = [...arr, idx].join("-");
    let eleNode1 = this.document.querySelector(`[posi='${currentPosi}']`)!;
    let eleNode2 = this.document.querySelector(`[posi='${targetPosi}']`)!;
    if (type == "up") {
      const parent = eleNode2.parentNode!;
      const nodes = this.document.querySelectorAll(`[posi^='${targetPosi}']`);
      nodes.forEach((node) => {
        const posi = replace(
          node.getAttribute("posi")!,
          targetPosi,
          currentPosi
        );
        node.setAttribute("posi", posi);
      });
      parent.removeChild(eleNode1);
      eleNode1 = this.createEleNodeByInfoMap(currentPosi);
      this.updateElePosiAttr(eleNode1, targetPosi);
      parent.insertBefore(eleNode1, eleNode2);
    } else {
      const parent = eleNode1.parentNode!;
      const nodes = this.document.querySelectorAll(`[posi^='${currentPosi}']`);
      nodes.forEach((node) => {
        const posi = replace(
          node.getAttribute("posi")!,
          currentPosi,
          targetPosi
        );
        node.setAttribute("posi", posi);
      });
      parent.removeChild(eleNode2);
      eleNode2 = this.createEleNodeByInfoMap(targetPosi);
      this.updateElePosiAttr(eleNode2, currentPosi);
      parent.insertBefore(eleNode2, eleNode1);
    }
    this.exchangeEleNodeInfo(currentPosi, targetPosi);
    this.formDesign.currFormDesignKey = targetPosi;
    console.log(targetPosi);
  }

  moveBlockPosi(type: "left" | "right"): void {}

  handleEleNodeUp(): void {
    this.moveInlinePosi("up");
  }

  handleEleNodeDown(): void {
    const next = this.eleNode.nextElementSibling;
    if (next && next.nodeName.toLowerCase().includes("cat-")) {
      this.moveInlinePosi("down");
    }
  }

  handleELeNodwLeft(): void {}

  handleELeNodeRight(): void {}

  handleEleNodeCopy(): void {}

  handleEleNodeDel(): void {}

  handleTest2() {
    this.validateForm.patchValue({
      userName: "234234234",
    });
    this.column = 4;
    console.log(this.genTreeDirectory());
  }
}
