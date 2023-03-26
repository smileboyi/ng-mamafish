import {
  Injectable,
  EmbeddedViewRef,
  Directive,
  ComponentRef,
} from "@angular/core";
import { Subject } from "rxjs";

import { FdEleNodeInfo, FdTemplateConfig } from "@declare";
import { FormDesignToolDirective } from "../shared/directives/form-design-tool.directive";

@Injectable({
  providedIn: "root",
})
export class FormDesignService {
  fdlDirective?: FormDesignToolDirective;
  // 组件操作面板展示状态
  fdlPanelShow = false;
  // 组件操作面板里的操作订阅
  formDesignHandle$ = new Subject<string>();
  // 当前选中组件的key值，使用path作为key
  currFormDesignKey = "";
  // 每个组件的信息
  formDesignMap = new Map<string, FdEleNodeInfo>();

  constructor() {}
}
