import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QuillModule } from 'ngx-quill';

import { LAYOUT_CONFIG, PROFILE_INFO } from '@tokens';
import { ThrottleClickDirective } from './directives/throttle-click.directive';
import { ThemePanelComponent } from './components/theme-panel/theme-panel.component';
import { BgHeaderComponent } from './components/bg-header/bg-header.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { KeysPipe } from './pipes/keys.pipe';

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
    QuillModule.forRoot(),
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    NgZorroAntdModule,
    NgxPermissionsModule,
    ScrollingModule
  ],
  declarations: [
    ThrottleClickDirective,
    BgHeaderComponent,
    ThemePanelComponent,
    PaginatePipe,
    KeysPipe
  ],
  providers: [...APP_CORE_PROVIDERS],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    NgZorroAntdModule,
    ScrollingModule,
    NgxPermissionsModule,
    ThrottleClickDirective,
    BgHeaderComponent,
    ThemePanelComponent,
    PaginatePipe,
    KeysPipe
  ]
})
export class SharedModule {}
