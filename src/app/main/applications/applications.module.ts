import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ApplicationsRoutingModule } from "./applications-routing.module";
import { SharedModule } from "@shared";
import { ChatComponent } from "./chat/chat.component";
import { UsersComponent } from "./users/users.component";
import { MailBoxComponent } from "./mail-box/mail-box.component";
import { UserDialogComponent } from "./users/user-dialog/user-dialog.component";
import { EditorComponent } from "./editor/editor.component";
import { FormDesignComponent } from "./form-design/form-design.component";
import { FormDesignHeaderComponent } from "./form-design/form-design-header/form-design-header.component";
import { FormDesignEleComponent } from "./form-design/form-design-ele/form-design-ele.component";
import { FormDesignConfigComponent } from "./form-design/form-design-config/form-design-config.component";
import { FormDesignTemplateComponent } from "./form-design/form-design.template";
import { InputEleComponent } from "./form-design/ele-template/input-ele.component";
import { WarpEleComponent } from "./form-design/ele-template/warp-ele.component";
import { InputNumberEleComponent } from "./form-design/ele-template/input-number-ele.component";
import { AutocompleteEleComponent } from "./form-design/ele-template/autocomplete-ele.component";
import { RateEleComponent } from "./form-design/ele-template/rate-ele.component";
import { CheckboxEleComponent } from "./form-design/ele-template/checkbox-ele.component";
import { CascaderEleComponent } from "./form-design/ele-template/cascader-ele.component";
import { RadioEleComponent } from "./form-design/ele-template/radio-ele.component";
import { InputConfigComponent } from "./form-design/config-template/input-config/input-config.component";
import { FormDesignTreeComponent } from "./form-design/form-design-tree/form-design-tree.component";

@NgModule({
  declarations: [
    ChatComponent,
    UsersComponent,
    MailBoxComponent,
    UserDialogComponent,
    EditorComponent,
    FormDesignComponent,
    FormDesignHeaderComponent,
    FormDesignEleComponent,
    FormDesignTreeComponent,
    FormDesignConfigComponent,
    FormDesignTemplateComponent,
    InputEleComponent,
    WarpEleComponent,
    AutocompleteEleComponent,
    InputNumberEleComponent,
    RateEleComponent,
    CheckboxEleComponent,
    CascaderEleComponent,
    RadioEleComponent,

    InputConfigComponent,

  ],
  entryComponents: [
    UserDialogComponent,
    FormDesignTemplateComponent,
    InputEleComponent,
    WarpEleComponent,
    InputNumberEleComponent,
  ],
  imports: [CommonModule, SharedModule, ApplicationsRoutingModule],
})
export class ApplicationsModule {}
