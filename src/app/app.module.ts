import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { Driver, NgForageConfig, NgForageModule } from 'ngforage';
import en from '@angular/common/locales/en';
import { NgxPermissionsService, NgxPermissionsModule } from 'ngx-permissions';
import { NgForage } from 'ngforage';

import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(en);

const loadFactory = (forage: NgForage, ps: NgxPermissionsService) =>
  async function() {
    const profileInfo: any = await forage.getItem('profile_info');
    if (profileInfo) {
      ps.loadPermissions(profileInfo.permissionList);
    }
  };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgForageModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    LayoutModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: loadFactory,
      deps: [NgForage, NgxPermissionsService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngfConfig: NgForageConfig) {
    ngfConfig.configure({
      name: 'MaMaFish',
      driver: [
        // defaults to indexedDB -> webSQL -> localStorage -> sessionStorage
        Driver.INDEXED_DB,
        Driver.LOCAL_STORAGE
      ]
    });
  }
}
