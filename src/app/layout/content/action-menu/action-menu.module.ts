import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { ActionMenuComponent } from './action-menu.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ActionMenuComponent],
  exports: [ActionMenuComponent],
})
export class ActionMenuModule {}
