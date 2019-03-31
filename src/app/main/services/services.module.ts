import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from '@shared';
import { DataTableComponent } from './data-table/data-table.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';

@NgModule({
  declarations: [DataTableComponent, ScreenshotComponent],
  imports: [CommonModule, SharedModule, ServicesRoutingModule]
})
export class ServicesModule {}
