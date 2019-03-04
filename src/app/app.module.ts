import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { Driver, NgForageConfig, NgForageModule } from 'ngforage';
import en from '@angular/common/locales/en';

import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgForageModule.forRoot(),
    LayoutModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
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
