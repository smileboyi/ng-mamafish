import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  {
    path: routingPathConfig.services.default,
    redirectTo: routingPathConfig.services.dataTable,
    pathMatch: 'full'
  },
  {
    path: routingPathConfig.services.dataTable,
    component: DataTableComponent,
    data: {
      title: '数据表'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
