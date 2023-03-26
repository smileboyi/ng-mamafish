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
import { FormDesignTemplateComponent } from "./form-design/form-design.template";
import { InputEleComponent } from "./form-design/ele-template/input.component";
import { WarpComponent } from "./form-design/ele-template/warp.component";
import { InputNumberComponent } from "./form-design/ele-template/input-number.component";
import { FormDesignHeaderComponent } from './form-design/form-design-header/form-design-header.component';
import { FormDesignEleComponent } from './form-design/form-design-ele/form-design-ele.component';
import { FormDesignConfigComponent } from './form-design/form-design-config/form-design-config.component';

@NgModule({
  declarations: [
    ChatComponent,
    UsersComponent,
    MailBoxComponent,
    UserDialogComponent,
    EditorComponent,
    FormDesignComponent,
    FormDesignTemplateComponent,
    InputEleComponent,
    WarpComponent,
    InputNumberComponent,
    FormDesignHeaderComponent,
    FormDesignEleComponent,
    FormDesignConfigComponent
  ],
  entryComponents: [
    UserDialogComponent,
    FormDesignTemplateComponent,
    InputEleComponent,
    WarpComponent,
    InputNumberComponent
  ],
  imports: [CommonModule, SharedModule, ApplicationsRoutingModule],
})
export class ApplicationsModule {}
