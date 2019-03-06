import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from '@shared';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [DataTableComponent],
  imports: [CommonModule, SharedModule, ServicesRoutingModule]
})
export class ServicesModule {}
