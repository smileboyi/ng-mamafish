import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';

import { SharedModule } from '@shared';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, SharedModule],
  exports: [SidebarComponent]
})
export class SidebarModule {}
