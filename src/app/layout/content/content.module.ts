import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { ActionMenuModule } from './action-menu/action-menu.module';

import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, SharedModule, ActionMenuModule],
  declarations: [ContentComponent],
  exports: [ContentComponent],
})
export class ContentModule {}
