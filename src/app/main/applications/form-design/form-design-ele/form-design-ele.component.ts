import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

interface FormDesignEle {
  icon: string;
  name: string;
}

const formDesignEles: FormDesignEle[] = [
  {
    icon: "d-input",
    name: "输入框",
  },
  {
    icon: "d-input-number",
    name: "数字输入框",
  },
  {
    icon: "d-radio",
    name: "单选框",
  },
  {
    icon: "d-checkbox",
    name: "多选框",
  },
  {
    icon: "d-autocomplete",
    name: "自动完成",
  },
  {
    icon: "d-cascader",
    name: "级联选择",
  },
  {
    icon: "d-time-picker",
    name: "时间选择框",
  },
  {
    icon: "d-date-picker",
    name: "日期选择框",
  },
  {
    icon: "d-mention",
    name: "提及",
  },
  {
    icon: "d-rate",
    name: "评分",
  },
  {
    icon: "d-select",
    name: "选择器",
  },
  {
    icon: "d-slider",
    name: "滑动输入条",
  },
  {
    icon: "d-switch",
    name: "开关",
  },
  {
    icon: "d-transfer",
    name: "穿梭框",
  },
  {
    icon: "d-tree-select",
    name: "树选择",
  },
  {
    icon: "d-upload",
    name: "上传",
  },
  {
    icon: "d-button",
    name: "按钮",
  },
  {
    icon: "d-divider",
    name: "分割线",
  },
  {
    icon: "d-warp",
    name: "容器",
  },
];

@Component({
  selector: "cat-form-design-ele",
  templateUrl: "./form-design-ele.component.html",
  styleUrls: ["./form-design-ele.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDesignEleComponent implements OnInit {
  choiceEles: FormDesignEle[] = formDesignEles;

  constructor() {}

  ngOnInit(): void {}
}
