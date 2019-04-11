import { Inject, Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';

import { defaultLayoutConfig, LayoutConfig } from '@config/layout.config';
import { LAYOUT_CONFIG } from '@tokens';

@Injectable({
  providedIn: 'root'
})
export class LayoutConfigService {
  private config$: BehaviorSubject<any>;

  readonly defaultConfig: LayoutConfig;

  set config(value: any) {
    const prevConfig = this.config$.getValue();
    const nextConfig = _.merge({}, prevConfig, value);
    this.config$.next(nextConfig);
    this.setStorageConfig(nextConfig);
  }

  get config(): Observable<any> | any {
    return this.config$.asObservable();
  }

  constructor(
    private ngForage: NgForage,
    @Inject(LAYOUT_CONFIG) public layoutConfig: string
  ) {
    this.defaultConfig = defaultLayoutConfig;
    this.initConfig();
  }

  async setStorageConfig(config: LayoutConfig) {
    await this.ngForage.setItem(this.layoutConfig, config);
  }

  async initConfig() {
    this.config$ = new BehaviorSubject(_.cloneDeep(this.defaultConfig));
    const storageConfig = await this.ngForage.getItem(this.layoutConfig);
    if (storageConfig) {
      this.config$.next(_.cloneDeep(storageConfig));
    }
  }

  resetToDefaults(): void {
    this.config$.next(_.cloneDeep(this.defaultConfig));
    this.setStorageConfig(_.cloneDeep(this.defaultConfig));
  }
}