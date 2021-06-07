import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { SharedModule } from '@shared';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    ChatComponent,
    UsersComponent,
    MailBoxComponent,
    UserDialogComponent,
  ],
  entryComponents: [UserDialogComponent],
  imports: [CommonModule, SharedModule, ApplicationsRoutingModule],
})
export class ApplicationsModule {}
