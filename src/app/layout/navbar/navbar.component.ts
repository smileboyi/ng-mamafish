import { Component, OnInit, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { navigationConfig, NavigationItem } from '@config/navigation.config';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';
import { GlobalService } from '@services/global.service';
@Component({
  selector: 'cat-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent implements OnInit {
  navData: Array<NavigationItem>;
  configData: LayoutConfig;

  @HostBinding('style')
  get hiddenStyle(): SafeStyle {
    let bool = this.global.sidebarHidden;
    bool = bool && this.global.isMobile;
    const styleStr = bool ? 'visibility: hidden;pointer-events: none;' : '';
    return this.sanitizer.bypassSecurityTrustStyle(styleStr);
  }

  constructor(
    public global: GlobalService,
    private sanitizer: DomSanitizer,
    private layoutConfig: LayoutConfigService
  ) {
    this.navData = navigationConfig;
  }

  ngOnInit(): void {
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.configData = config;
    });
  }

  handleCoverClick(): void {
    this.global.sidebarHidden = true;
  }
}
