import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { NavbarComponent } from './navbar.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavMenuItemComponent } from './nav-menu/nav-menu-item/nav-menu-item.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [NavbarComponent, NavMenuComponent, NavMenuItemComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
