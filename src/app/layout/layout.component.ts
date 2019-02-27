import { Component, OnInit, OnDestroy } from '@angular/core';

import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';

@Component({
  selector: 'cat-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit, OnDestroy {
  drawerVisible: boolean = true;
  configData: LayoutConfig;
  pageWithStyle: '1200px' | '100%';

  constructor(
    public global: GlobalService,
    private layoutConfig: LayoutConfigService
  ) {}

  ngOnInit() {
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.configData = config;
      this.pageWithStyle = config.width === 'fullwidth' ? '100%' : '1200px';
    });
  }

  ngOnDestroy() {}

  openSetting(): void {
    this.drawerVisible = true;
  }
}
