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
    pathMatch: 'full',
  },
  {
    path: routingPathConfig.services.dataTable,
    component: DataTableComponent,
    canActivate: [AuthGuard],
    data: {
      title: '数据表',
      keywords: 'dataTable',
      description: '通过筛选数据列和行，导出数据到excel表格',
      icon: 'data-table'
    },
  },
  {
    path: routingPathConfig.services.screenshot,
    component: ScreenshotComponent,
    canActivate: [AuthGuard],
    data: {
      title: '屏幕截图',
      keywords: '屏幕截图',
      description: '一个便捷的屏幕截图工具',
      icon: 'screenshot'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
