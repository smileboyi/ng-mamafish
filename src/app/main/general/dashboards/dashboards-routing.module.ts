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
      keywords: '数据分析,指标,analytics',
      description: '展示数据，通过指标来分析数据',
      icon: 'analytics'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
