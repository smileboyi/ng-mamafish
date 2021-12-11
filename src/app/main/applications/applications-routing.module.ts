import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { EditorComponent } from './editor/editor.component';
import { AuthGuard } from '@guard/auth.guard';
import { UnsaveGuard } from '@guard/unsave.guard';

const routes: Routes = [
  {
    path: routingPathConfig.applications.default,
    redirectTo: routingPathConfig.applications.users,
    pathMatch: 'full',
  },
  {
    path: routingPathConfig.applications.users,
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {
      title: '人员',
      keywords: '人员,人员管理',
      description: '提供人员的新增、修改、删除和查询',
      icon: 'users'
    },
  },
  {
    path: routingPathConfig.applications.mailBox,
    component: MailBoxComponent,
    canActivate: [AuthGuard],
    canDeactivate: [UnsaveGuard],
    data: {
      title: '邮箱',
      keywords: '邮箱,inbox,email',
      description: '一个简单实用的邮箱管理',
      icon: 'mail'
    },
  },
  {
    path: routingPathConfig.applications.chat,
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: {
      title: '会话',
      keywords: '会话,聊天,chat',
      description: '选择一个好友来分享你最近遇到的快乐的事',
      icon: 'message'
    },
  },
  {
    path: routingPathConfig.applications.editor,
    component: EditorComponent,
    canActivate: [AuthGuard],
    data: {
      title: '编辑器',
      keywords: '编辑器,editor,Monaco Editor,MarkDown',
      description: 'Monaco Editor是一款强大的现代编辑器，支持多种语言的语法高亮和代码提示，以及code diff。',
      icon: 'editor'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
