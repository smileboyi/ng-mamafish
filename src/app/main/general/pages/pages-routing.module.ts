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
    pathMatch: 'full'
  },
  {
    path: routingPathConfig.pages.profile,
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: '个人主页'
    }
  },
  {
    path: routingPathConfig.pages.errors,
    component: ErrorsComponent,
    data: {
      title: '错误页',
      isFullScreen: true
    }
  },
  {
    path: routingPathConfig.pages.login,
    component: LoginComponent,
    data: {
      title: '登录',
      isFullScreen: true
    }
  },
  {
    path: routingPathConfig.pages.register,
    component: RegisterComponent,
    data: {
      title: '注册',
      isFullScreen: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
