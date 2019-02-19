import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar.component';

import { SharedModule } from '@shared';
import { TopInfoComponent } from './top-info/top-info.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ToolbarComponent, TopInfoComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}
