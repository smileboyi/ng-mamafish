import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [DataTableComponent, ScreenshotComponent],
  imports: [CommonModule, SharedModule, ServicesRoutingModule],
})
export class ServicesModule {}
