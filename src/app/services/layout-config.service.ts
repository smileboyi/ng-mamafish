import { Inject, Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge, cloneDeep } from 'lodash';

import { defaultLayoutConfig, LayoutConfig } from '@config/layout.config';
import { LAYOUT_CONFIG } from '@tokens';

@Injectable({
  providedIn: 'root',
})
export class LayoutConfigService {
  private config$: BehaviorSubject<any>;

  readonly defaultConfig: LayoutConfig;

  set config(value: any) {
    const prevConfig = this.config$.getValue();
    const nextConfig = merge({}, prevConfig, value);
    this.config$.next(nextConfig);
    this.setStorageConfig(nextConfig);
  }

  get config(): Observable<any> | any {
    return this.config$.asObservable();
  }

  constructor(
    private ngForage: NgForage,
    @Inject(LAYOUT_CONFIG) public layoutConfigToken: string
  ) {
    this.defaultConfig = defaultLayoutConfig;
    this.initConfig();
  }

  async setStorageConfig(config: LayoutConfig): Promise<any> {
    await this.ngForage.setItem(this.layoutConfigToken, config);
  }

  async initConfig(): Promise<any> {
    this.config$ = new BehaviorSubject(cloneDeep(this.defaultConfig));
    const storageConfig = await this.ngForage.getItem(this.layoutConfigToken);
    if (storageConfig) {
      this.config$.next(cloneDeep(storageConfig));
    }
  }

  resetToDefaults(): void {
    this.config$.next(cloneDeep(this.defaultConfig));
    this.setStorageConfig(cloneDeep(this.defaultConfig));
  }
}
