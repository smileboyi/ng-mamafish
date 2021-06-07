import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [CommonModule, SharedModule, DashboardsRoutingModule],
})
export class DashboardsModule {}
