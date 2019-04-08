import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { SharedModule } from '@shared';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { MailBoxComponent } from './mail-box/mail-box.component';

@NgModule({
  declarations: [ChatComponent, UsersComponent, MailBoxComponent],
  imports: [CommonModule, SharedModule, ApplicationsRoutingModule]
})
export class ApplicationsModule {}
