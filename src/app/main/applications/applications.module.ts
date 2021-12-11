import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { SharedModule } from '@shared';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    ChatComponent,
    UsersComponent,
    MailBoxComponent,
    UserDialogComponent,
    EditorComponent,
  ],
  entryComponents: [UserDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutingModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class ApplicationsModule {}
