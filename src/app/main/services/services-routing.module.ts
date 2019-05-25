import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { DataTableComponent } from './data-table/data-table.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { AuthGuard } from '@guard/auth.guard';

const routes: Routes = [
  {
    path: routingPathConfig.services.default,
    redirectTo: routingPathConfig.services.dataTable,
    pathMatch: 'full'
  },
  {
    path: routingPathConfig.services.dataTable,
    component: DataTableComponent,
    canActivate: [AuthGuard],
    data: {
      title: '数据表'
    }
  },
  {
    path: routingPathConfig.services.screenshot,
    component: ScreenshotComponent,
    canActivate: [AuthGuard],
    data: {
      title: '屏幕截图'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
