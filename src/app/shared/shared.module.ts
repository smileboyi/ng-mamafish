import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LAYOUT_CONFIG, PROFILE_INFO } from '@tokens';
import { ThrottleClickDirective } from './directives/throttle-click.directive';
import { BgHeaderComponent } from './components/bg-header/bg-header.component';

const APP_CORE_PROVIDERS = [
  {
    provide: LAYOUT_CONFIG,
    useValue: 'layout_config'
  },
  {
    provide: PROFILE_INFO,
    useValue: 'profile_info'
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    NgZorroAntdModule,
    NgxPermissionsModule
  ],
  declarations: [ThrottleClickDirective, BgHeaderComponent],
  providers: [...APP_CORE_PROVIDERS],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    NgZorroAntdModule,
    NgxPermissionsModule,
    ThrottleClickDirective,
    BgHeaderComponent
  ]
})
export class SharedModule {}
