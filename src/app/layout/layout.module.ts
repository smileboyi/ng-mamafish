import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from './toolbar/toolbar.module';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { ContentModule } from './content/content.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { SharedModule } from '@shared';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    ToolbarModule,
    FooterModule,
    NavbarModule,
    ContentModule,
    SidebarModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
