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
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { OverlayRef, Overlay } from "@angular/cdk/overlay";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
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
import { last, startsWith, replace, clone } from "lodash-es";

import { FormDesignTemplateComponent } from "./form-design.template";
import {
  DsignLayoutType,
  DsignEleNode,
  FdTemplateConfig,
  FdEleNodeInfo,
} from "@declare";
import { FormDesignService } from "@services/form-design.service";
import { elePrefix, warpNodeName } from "@config/app.config";

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

  validateForm!: UntypedFormGroup;
  subscription: Subscription[] = [];

  column = 2;
  contextMenuVar = {
    canLeftMerge: false,
    canRightMerge: false,
  };

  get columns() {
    return new Array(this.column).fill(24 / this.column);
  }

  get eleNode(): Element {
    return this.document.querySelector(
      `[posi='${this.formDesign.currFormDesignKey}']`
    )!;
  }

  @ViewChild("choiceBox", { read: ElementRef }) choiceBox: ElementRef;
  @ViewChild("lastNzRow") lastNzRow: ElementRef;
  @ViewChild("form") form: ElementRef;
  @ViewChild("fdemplate", { read: FormDesignTemplateComponent })
  fdemplate: FormDesignTemplateComponent;
  @ViewChild("nzRowTemplate")
  nzRowTemplate: ElementRef<any>;
  @ViewChild("contextMenu")
  contextMenu: TemplateRef<any>;

  constructor(
    private fb: UntypedFormBuilder,
    private ele: ElementRef,
    private cdr: ChangeDetectorRef,
    private vcr: ViewContainerRef,
    private renderer2: Renderer2,
    private overlay: Overlay,
    private formDesign: FormDesignService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.subscription.push(
      formDesign.formDesignHandle$.subscribe((v) => {
        const posi = this.formDesign.currFormDesignKey;
        if (v == "top") {
          this.handleEleNodeTop(posi);
        } else if (v == "bottom") {
          this.handleEleNodeBottom(posi);
        } else if (v == "left") {
          this.handleELeNodwLeft();
        } else if (v == "right") {
          this.handleELeNodeRight();
        } else if (v == "copy") {
          this.handleEleNodeCopy(posi);
        } else if (v == "del") {
          this.handleEleNodeDel(posi);
        }
      })
    );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ["", [Validators.required]],
      userName2: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    const mouseDown = fromEvent<MouseEvent>(
      this.choiceBox.nativeElement,
      "mousedown"
    );
    const contextMenu = fromEvent<PointerEvent>(
      this.form.nativeElement,
      "contextmenu"
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
          target.nodeName.toLowerCase() != warpNodeName &&
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

    const menuSubs = contextMenu
      .pipe(
        tap((e) => e.preventDefault()),
        filter((e) => (e.target as Element).nodeName.toLowerCase() !== "form")
      )
      .subscribe((e) => {
        let target = e.target as Element;
        const posi = this.getEleNodePosi(target);
        const rowNode = this.form.nativeElement.querySelector(
          `[nz-row]:nth-of-type(${posi[0] + 1})`
        );
        const currColNode = rowNode?.querySelector(
          `[nz-col]:nth-of-type(${+posi[1] + 1})`
        );
        const nextColNode = rowNode?.querySelector(
          `[nz-col]:nth-of-type(${+posi[1] + 2})`
        );

        this.contextMenuVar = {
          canLeftMerge: posi[1] > 0,
          canRightMerge: !!nextColNode,
        };

        const portal = new TemplatePortal(this.contextMenu, this.vcr);
        const strategy = this.overlay
          .position()
          .global()
          .left(`${e.pageX}px`)
          .top(`${e.pageY}px`);
        const overlayRef = this.overlay.create({
          positionStrategy: strategy,
          hasBackdrop: true,
        });
        overlayRef.backdropClick().subscribe(() => {
          overlayRef.detach();
        });
        overlayRef.attach(portal);
        if (overlayRef.backdropElement) {
          overlayRef.backdropElement.oncontextmenu = function () {
            return false;
          };
        }
        this.cdr.markForCheck();
      });

    this.subscription = this.subscription.concat([
      dargSubs,
      hoverSubs,
      menuSubs,
    ]);
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
    if (node.nodeName.toLowerCase() == warpNodeName) {
      const directory: DsignEleNode[] = [];
      node.childNodes.forEach((node: ChildNode, i: number) => {
        if (
          node.nodeType == 1 &&
          node.nodeName.toLowerCase().includes(elePrefix)
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
          nodeName.includes(elePrefix) ||
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
        child.nodeName.toLowerCase().includes(elePrefix)
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

  // 更新
  createEleNodeByOwnInfo(fromPosi: string): Element {
    const infoMap = this.formDesign.formDesignMap;
    const posis: string[] = [];
    for (let k of infoMap.keys()) {
      if (startsWith(k, fromPosi) && k != fromPosi) {
        posis.push(k);
      }
    }
    const info = infoMap.get(fromPosi)!;
    const nodetype = (info.eleType as string).split("-").join("");
    // 更新组件引用
    const ele = this.vcr.createEmbeddedView(
      // @ts-ignore
      this.fdemplate[nodetype],
      {
        $implicit: info.config as FdTemplateConfig,
        key: fromPosi,
      }
    );
    infoMap.set(fromPosi, { ...info, ele });
    const child = ele.rootNodes[0];
    posis.forEach((p) => {
      child.appendChild(this.createEleNodeByOwnInfo(p));
    });
    return child;
  }

  // 复制
  createEleNodeByOtherInfo(fromPosi: string, toPosi: string): Element {
    const infoMap = this.formDesign.formDesignMap;
    const posis: string[] = [];
    for (let k of infoMap.keys()) {
      if (startsWith(k, fromPosi) && k != fromPosi) {
        posis.push(k);
      }
    }
    const info = infoMap.get(fromPosi)!;
    const nodetype = (info.eleType as string).split("-").join("");
    const ele = this.vcr.createEmbeddedView(
      // @ts-ignore
      this.fdemplate[nodetype],
      {
        $implicit: info.config as FdTemplateConfig,
      }
    );

    const child = ele.rootNodes[0];
    posis.forEach((p) => {
      child.appendChild(
        this.createEleNodeByOtherInfo(p, replace(p, fromPosi, toPosi))
      );
    });
    return child;
  }

  exchangeEleNodeInfo(posi1: string, posi2: string) {
    const infoMap = this.formDesign.formDesignMap;
    let posis1: string[] = [];
    let posis2: string[] = [];
    const infos1: FdEleNodeInfo[] = [];
    const infos2: FdEleNodeInfo[] = [];
    for (const [k, v] of infoMap) {
      if (startsWith(k, posi1)) {
        posis1.push(k);
        infos1.push({ ...v });
      } else if (startsWith(k, posi2)) {
        posis2.push(k);
        infos2.push({ ...v });
      }
    }
    [...posis1, ...posis2].forEach((p) => infoMap.delete(p));
    posis1
      .map((p) => replace(p, posi1, posi2))
      .forEach((p, i) => infoMap.set(p, infos1[i]));
    posis2
      .map((p) => replace(p, posi2, posi1))
      .forEach((p, i) => infoMap.set(p, infos2[i]));
  }

  moveEleNodeInfo(currentPosi: string, targetPosi: string) {
    const infoMap = this.formDesign.formDesignMap;
    const posis: string[] = [];
    const infos: FdEleNodeInfo[] = [];
    for (const [k, v] of infoMap) {
      if (startsWith(k, currentPosi)) {
        posis.push(k);
        infos.push(v);
      }
    }
    posis
      .map((p) => replace(p, currentPosi, targetPosi))
      .forEach((p, i) => infoMap.set(p, infos[i]));
    posis.forEach((p) => infoMap.delete(p));
  }

  updateElePosiAttr(ele: Element | ChildNode, posi: string): void {
    // @ts-ignore
    ele.setAttribute("posi", posi);
    if (ele.nodeName.toLowerCase() == warpNodeName) {
      let childNodes: ChildNode[] = [];
      ele.childNodes.forEach((child: ChildNode) => {
        if (
          child.nodeType == 1 &&
          child.nodeName.toLowerCase().includes(elePrefix)
        ) {
          childNodes.push(child);
        }
      });
      childNodes.forEach((child: ChildNode, i: number) => {
        this.updateElePosiAttr(child, posi + "-" + i);
      });
    }
  }

  moveColPosi(type: "left" | "right"): void {}

  moveRowPosi(type: "top" | "bottom"): void {
    const currentPosi = this.formDesign.currFormDesignKey;
    const indexs: number[] = currentPosi.split("-").map((i) => +i);
    indexs[0] = type == "top" ? indexs[0] - 1 : indexs[0] + 1;
    const rowNode = this.form.nativeElement.querySelector(
      `[nz-row]:nth-of-type(${indexs[0] + 1})`
    );
    const colNode = rowNode?.querySelector(
      `[nz-col]:nth-of-type(${+indexs[1] + 1})`
    );
    if (!colNode) return;

    const currNode = this.document.querySelector(`[posi='${currentPosi}']`)!;
    const parentNode = currNode.parentNode!;
    parentNode.removeChild(currNode);

    indexs[2] = colNode.childElementCount;
    const targetPosi = indexs.join("-");
    this.moveEleNodeInfo(currentPosi, targetPosi);

    const newNode = this.createEleNodeByOwnInfo(targetPosi);
    this.updateElePosiAttr(newNode, targetPosi);
    colNode.appendChild(newNode);

    if (type == "top") {
      // 更新兄弟节点信息
      let isFirst = true;
      const fn = (arr: Element[]) => {
        arr.forEach((e: Element, i: number) => {
          const oldPosi = e.getAttribute("posi");
          if (oldPosi) {
            const indexs: StrOrNum[] = oldPosi.split("-");
            indexs[2] = i;
            const newPosi = indexs.join("-");
            isFirst && this.moveEleNodeInfo(oldPosi, newPosi);
            isFirst = true;
            e.setAttribute("posi", newPosi);
            fn(Array.from(e.children));
          }
        });
      };
      fn(Array.from(parentNode.children));
    }
    console.log(this.formDesign.formDesignMap);
  }

  moveInlinePosi(type: "top" | "bottom"): void {
    const currentPosi = this.formDesign.currFormDesignKey;
    const arr = currentPosi.split("-");
    let idx = Number(arr.pop());
    idx = type == "top" ? idx - 1 : idx + 1;
    const targetPosi = [...arr, idx].join("-");
    let eleNode1 = this.document.querySelector(`[posi='${currentPosi}']`)!;
    let eleNode2 = this.document.querySelector(`[posi='${targetPosi}']`)!;
    if (type == "top") {
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
      eleNode1 = this.createEleNodeByOwnInfo(currentPosi);
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
      eleNode2 = this.createEleNodeByOwnInfo(targetPosi);
      this.updateElePosiAttr(eleNode2, currentPosi);
      parent.insertBefore(eleNode2, eleNode1);
    }
    this.exchangeEleNodeInfo(currentPosi, targetPosi);
    this.formDesign.currFormDesignKey = targetPosi;
  }

  moveBlockPosi(type: "left" | "right"): void {}

  handleEleNodeTop(currentPosi: string): void {
    if (this.formDesign.fdlDirective) {
      this.formDesign.fdlDirective.handleDestroy();
    }
    const indexs: string[] = currentPosi.split("-");
    if (indexs.length == 3 && indexs[0] != "0" && indexs[2] == "0") {
      this.moveRowPosi("top");
    } else {
      if (last(indexs) != "0") {
        this.moveInlinePosi("top");
      }
    }
  }

  handleEleNodeBottom(currentPosi: string): void {
    if (this.formDesign.fdlDirective) {
      this.formDesign.fdlDirective.handleDestroy();
    }
    const indexs: string[] = currentPosi.split("-");
    const next = this.eleNode.nextElementSibling;
    if (indexs.length == 3) {
      if (!next) {
        const rowNum =
          this.form.nativeElement.querySelectorAll("[nz-row]").length - 2;
        if (rowNum > parseInt(indexs[0])) {
          this.moveRowPosi("bottom");
          return;
        }
      }
    }
    if (next && next.nodeName.toLowerCase().includes(elePrefix)) {
      this.moveInlinePosi("bottom");
    }
  }

  handleELeNodwLeft(): void {}

  handleELeNodeRight(): void {}

  handleEleNodeCopy(currP: string): void {
    const parts = currP.split("-");
    const diffIdx = parts.length - 1;
    const diffNum = Number(parts.pop());
    const posi = parts.join("-");
    let parent = this.document.querySelector(`[posi='${posi}']`);
    const infoMap = this.formDesign.formDesignMap;
    let posis: string[] = [];
    for (const [k, v] of infoMap) {
      if (startsWith(k, posi)) {
        posis.push(k);
      }
    }
    // posis.forEach((p, i) => {
    //   const arr: StrOrNum[] = p.split("-");
    //   if (Number(arr[diffIdx]) >= diffNum) {
    //     arr[diffIdx] = Number(arr[diffIdx]) + 1;
    //     const p2 = arr.join("-");
    //     infoMap.set(p2, infoMap.get(p)!);
    //     infoMap.delete(p);
    //   }
    // });
    posis = [];
    for (const [k, v] of infoMap) {
      if (startsWith(k, currP)) {
        posis.push(k);
      }
    }
    if (parent) {
      this.updateElePosiAttr(parent, posi);
    } else {
    }
  }

  handleEleNodeDel(posi: string): void {
    const infoMap = this.formDesign.formDesignMap;
    let posis: string[] = [];
    for (const [k, v] of infoMap) {
      if (startsWith(k, posi)) {
        posis.push(k);
      }
    }
    posis.forEach((p) => {
      // 销毁组件实例和组件信息
      infoMap.get(p)?.ele?.destroy();
      infoMap.delete(p);
    });
    this.formDesign.currFormDesignKey = "";
  }

  handleTest2() {
    // console.log(this.validateForm.valid);

    if (this.validateForm.valid) {
      console.log("submit", this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          // debugger
          console.log(11);
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: false });
        }
      });
    }

    // this.validateForm.patchValue({
    //   userName: "234234234",
    // });
    // this.column = 4;
    // console.log(this.genTreeDirectory());
  }
}
