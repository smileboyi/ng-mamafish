import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@shared';
import { ProfileComponent } from './profile/profile.component';
import { ErrorsComponent } from './errors/errors.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ErrorsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [CommonModule, SharedModule, PagesRoutingModule]
})
export class PagesModule {}
