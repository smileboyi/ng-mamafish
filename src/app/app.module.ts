import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { NZ_I18N, en_US, NZ_ICONS } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { Driver, NgForageConfig, NgForageModule } from 'ngforage';
import en from '@angular/common/locales/en';
import { NgForage } from 'ngforage';
import { NgxPermissionsService, NgxPermissionsModule } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { UsersData } from './main/applications/users/users.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '@reducers/index';
import { effects } from '@effects/index';
import icons from './app.icon';

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
    InMemoryWebApiModule.forRoot(UsersData, { delay: 500 }),
    LayoutModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: loadFactory,
      deps: [NgForage, NgxPermissionsService],
      multi: true
    },
    { provide: NZ_ICONS, useValue: icons }
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
