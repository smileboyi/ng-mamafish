import { Component, OnInit } from '@angular/core';

import { navigationConfig, NavigationItem } from '@config/navigation.config';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';

@Component({
  selector: 'cat-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  navData: Array<NavigationItem>;
  configData: LayoutConfig;

  constructor(private layoutConfig: LayoutConfigService) {
    this.navData = navigationConfig;
  }

  ngOnInit() {
    this.layoutConfig.config.subscribe(config => {
      this.configData = config;
    });
  }
}
