import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics/analytics.component';
import { routingPathConfig } from '@config/routing-path.config';

const routes: Routes = [
  {
    path: routingPathConfig.dashboards.default,
    redirectTo: routingPathConfig.dashboards.analytics,
    pathMatch: 'full',
  },
  {
    path: routingPathConfig.dashboards.analytics,
    component: AnalyticsComponent,
    data: {
      title: '分析页',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
