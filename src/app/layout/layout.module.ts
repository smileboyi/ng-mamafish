import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from './toolbar/toolbar.module';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { ContentModule } from './content/content.module';

import { LayoutComponent } from './layout.component';

@NgModule({
  // 可以导入模块管道指令
  imports: [
    CommonModule,

    ToolbarModule,
    FooterModule,
    NavbarModule,
    ContentModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {}
