import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionMenuModule } from './action-menu/action-menu.module';
import { SharedModule } from '@shared';

import { MusicPlayerComponent } from './music-player/music-player.component';
import { PageTabsComponent } from './page-tabs/page-tabs.component';
import { ContentComponent } from './content.component';

@NgModule({
  imports: [CommonModule, SharedModule, ActionMenuModule],
  declarations: [ContentComponent, MusicPlayerComponent, PageTabsComponent],
  exports: [ContentComponent],
})
export class ContentModule {}
