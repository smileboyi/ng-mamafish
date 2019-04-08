import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';

const routes: Routes = [
  {
    path: routingPathConfig.app.default,
    redirectTo: routingPathConfig.app.general,
    pathMatch: 'full'
  },
  {
    path: routingPathConfig.app.general,
    loadChildren: './main/general/general.module#GeneralModule',
    data: { title: '常规' }
  },
  {
    path: routingPathConfig.app.applications,
    loadChildren: './main/applications/applications.module#ApplicationsModule',
    data: { title: '应用' }
  },
  {
    path: routingPathConfig.app.services,
    loadChildren: './main/services/services.module#ServicesModule',
    data: { title: '服务' }
  },
  {
    path: routingPathConfig.app.wildcard,
    redirectTo: 'general/pages/errors/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
