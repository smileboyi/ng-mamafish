import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [CommonModule, DashboardsRoutingModule]
})
export class DashboardsModule {}
