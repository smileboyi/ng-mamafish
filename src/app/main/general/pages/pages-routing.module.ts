import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { ErrorsComponent } from './errors/errors.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { routingPathConfig } from '@config/routing-path.config';
import { AuthGuard } from '@guard/auth.guard';

const routes: Routes = [
  {
    path: routingPathConfig.pages.default,
    redirectTo: routingPathConfig.pages.profile,
    pathMatch: 'full',
  },
  {
    path: routingPathConfig.pages.profile,
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: '个人主页',
      keywords: '个人主页,profile',
      description: '展示个人信息，以及好友信息',
      icon: 'profile'
    },
  },
  {
    path: routingPathConfig.pages.errors,
    component: ErrorsComponent,
    data: {
      title: '错误页',
      isFullScreen: false,
      keywords: '错误页面,403,404,500',
      description: '不能访问时展示的错误页面',
      icon: 'error'
    },
  },
  {
    path: routingPathConfig.pages.login,
    component: LoginComponent,
    data: {
      title: '登录',
      isFullScreen: true,
      keywords: '登录',
      description: '用户登录进入网站，否则以匿名用户身份进入',
      icon: 'login'
    },
  },
  {
    path: routingPathConfig.pages.register,
    component: RegisterComponent,
    data: {
      title: '注册',
      isFullScreen: true,
      keywords: '注册',
      description: '用户注册，创建个人信息',
      icon: 'register'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
