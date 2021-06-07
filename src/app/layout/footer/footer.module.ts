import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer.component';

import { SharedModule } from '@shared';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
