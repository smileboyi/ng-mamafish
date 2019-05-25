import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { AuthGuard } from '@guard/auth.guard';
import { UnsaveGuard } from '@guard/unsave.guard';

const routes: Routes = [
  {
    path: routingPathConfig.applications.default,
    redirectTo: routingPathConfig.applications.users,
    pathMatch: 'full'
  },
  {
    path: routingPathConfig.applications.users,
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {
      title: '人员'
    }
  },
  {
    path: routingPathConfig.applications.mailBox,
    component: MailBoxComponent,
    canActivate: [AuthGuard],
    canDeactivate: [UnsaveGuard],
    data: {
      title: '邮箱'
    }
  },
  {
    path: routingPathConfig.applications.chat,
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: {
      title: '会话'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
