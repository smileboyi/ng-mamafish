import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxPermissionsModule } from "ngx-permissions";
import { QuillModule } from "ngx-quill";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzResultModule } from "ng-zorro-antd/result";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzBackTopModule } from "ng-zorro-antd/back-top";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzAutocompleteModule } from "ng-zorro-antd/auto-complete";
import { NzCascaderModule } from "ng-zorro-antd/cascader";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzMentionModule } from "ng-zorro-antd/mention";
import { NzRateModule } from "ng-zorro-antd/rate";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzTransferModule } from "ng-zorro-antd/transfer";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzListModule } from "ng-zorro-antd/list";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { ThrottleClickDirective } from "./directives/throttle-click.directive";
import {
  FormDesignToolDirective,
  FormDesignToolPanelComponent,
} from "./directives/form-design-tool.directive";
import { ThemePanelComponent } from "./components/theme-panel/theme-panel.component";
import { BgHeaderComponent } from "./components/bg-header/bg-header.component";
import { PaginatePipe } from "./pipes/paginate.pipe";
import { KeysPipe } from "./pipes/keys.pipe";
import {
  LAYOUT_CONFIG,
  PROFILE_INFO,
  MUSIC_INFO,
  PAGE_TABS_DATA,
} from "@tokens";

const APP_CORE_PROVIDERS = [
  {
    provide: LAYOUT_CONFIG,
    useValue: "layout_config",
  },
  {
    provide: PROFILE_INFO,
    useValue: "profile_info",
  },
  {
    provide: MUSIC_INFO,
    useValue: "music_info",
  },
  {
    provide: PAGE_TABS_DATA,
    useValue: "page_tabs_data",
  },
];

const NZ_MODULES = [
  NzButtonModule,
  NzDropDownModule,
  NzMenuModule,
  NzSelectModule,
  NzAvatarModule,
  NzFormModule,
  NzModalModule,
  NzInputModule,
  NzTableModule,
  NzSpinModule,
  NzResultModule,
  NzTabsModule,
  NzSkeletonModule,
  NzBackTopModule,
  NzPaginationModule,
  NzDividerModule,
  NzCheckboxModule,
  NzProgressModule,
  NzToolTipModule,
  NzPopoverModule,
  NzRadioModule,
  NzSwitchModule,
  NzIconModule,
  NzMessageModule,
  NzDatePickerModule,
  NzAutocompleteModule,
  NzCascaderModule,
  NzInputNumberModule,
  NzMentionModule,
  NzRateModule,
  NzSliderModule,
  NzTimePickerModule,
  NzTransferModule,
  NzTreeSelectModule,
  NzUploadModule,
  NzListModule,
  NzCollapseModule,
  NzTreeModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    NgxPermissionsModule,
    ScrollingModule,
    DragDropModule,
    ...NZ_MODULES,
  ],
  declarations: [
    ThemePanelComponent,
    BgHeaderComponent,
    FormDesignToolPanelComponent,
    ThrottleClickDirective,
    FormDesignToolDirective,
    PaginatePipe,
    KeysPipe,
  ],
  providers: [...APP_CORE_PROVIDERS],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    ScrollingModule,
    DragDropModule,
    NgxPermissionsModule,
    ...NZ_MODULES,
    ThemePanelComponent,
    BgHeaderComponent,
    ThrottleClickDirective,
    FormDesignToolDirective,
    PaginatePipe,
    KeysPipe,
  ],
  entryComponents: [FormDesignToolPanelComponent],
})
export class SharedModule {}
