import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Driver, NgForageConfig } from 'ngforage';
import en from '@angular/common/locales/en';
import { NgForage } from 'ngforage';
import { NgxPermissionsService, NgxPermissionsModule } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AppInterceptorProviders } from './interceptor/index';
import { UsersData } from './main/applications/users/users.service';
import { reducers } from '@reducers/index';
import { effects } from '@effects/index';

registerLocaleData(en);

const loadFactory =
  (forage: NgForage, ps: NgxPermissionsService) => async () => {
    const profileInfo: any = await forage.getItem('profile_info');
    if (profileInfo) {
      ps.loadPermissions(profileInfo.permissionList);
    }
  };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot(),
    InMemoryWebApiModule.forRoot(UsersData, {
      delay: 500,
      passThruUnknownUrl: true,
    }),
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    LayoutModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadFactory,
      deps: [NgForage, NgxPermissionsService],
      multi: true,
    },
    AppInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(ngfConfig: NgForageConfig) {
    ngfConfig.configure({
      name: 'MaMaFish',
      driver: [
        // defaults to indexedDB -> webSQL -> localStorage -> sessionStorage
        Driver.INDEXED_DB,
        Driver.LOCAL_STORAGE,
      ],
    });
  }
}
