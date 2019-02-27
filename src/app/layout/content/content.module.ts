import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';

import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ContentComponent],
  exports: [ContentComponent]
})
export class ContentModule {}
