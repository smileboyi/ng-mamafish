import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LAYOUT_CONFIG } from '@tokens';


const APP_CORE_PROVIDERS = [
  {
    provide: LAYOUT_CONFIG,
    useValue: 'layout_config'
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
    NgZorroAntdModule
  ],
  declarations: [],
  providers: [...APP_CORE_PROVIDERS],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    NgZorroAntdModule
  ]
})
export class SharedModule {}
