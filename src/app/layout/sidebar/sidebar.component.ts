import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';

@Component({
  selector: 'cat-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  selectedIdx: number = 0;
  readonly idxMap: Array<string> = ['width', 'toolbar', 'navbar', 'footer'];
  private _drawerVisible: boolean = false;

  @Input()
  get drawerVisible() {
    return this._drawerVisible;
  }

  set drawerVisible(val: boolean) {
    this._drawerVisible = val;
    this.drawerVisibleChange.emit(this._drawerVisible);
  }

  @Output()
  drawerVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  pageWidth: string = 'fullwidth';
  toolbarHide: boolean = false;
  toolbarPosition: string = 'below';
  toolbarBgColor: string = '';
  navbarHide: boolean = false;
  navbarCollapse: boolean = false;
  navbarPosition: string = 'left';
  navbarHeadBgColor: string = '';
  navbarBodyBgColor: string = '';
  footerHide: boolean = false;
  footerPosition: string = 'above';
  footerBgColor: string = '';

  constructor(
    public global: GlobalService,
    private layoutConfig: LayoutConfigService
  ) {}

  ngOnInit() {
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.pageWidth = config.width;
      this.toolbarHide = !config.toolbar.show;
      this.toolbarPosition = config.toolbar.position;
      this.toolbarBgColor = config.toolbar.background;
      this.navbarHide = !config.navbar.show;
      this.navbarCollapse = config.navbar.collapsed;
      this.navbarPosition = config.navbar.position;
      this.navbarHeadBgColor = config.navbar.headBackground;
      this.navbarBodyBgColor = config.navbar.bodyBackground;
      this.footerHide = !config.footer.show;
      this.footerPosition = config.footer.position;
      this.footerBgColor = config.footer.background;
    });
  }

  handleDrawerClose(): void {
    this.drawerVisible = false;
  }

  onSelectedIndexChange(idx: number): void {
    this.selectedIdx = idx;
  }

  handleResetConfig(): void {
    const key: string = this.global.isMobile
      ? this.idxMap[this.selectedIdx + 1]
      : this.idxMap[this.selectedIdx];
    const value: any = this.layoutConfig.defaultConfig[key];
    this.layoutConfig.config = { [key]: value };
  }

  setPageWidth(): void {
    this.layoutConfig.config = { width: this.pageWidth };
  }

  setToolbarHide(): void {
    this.layoutConfig.config = { toolbar: { show: !this.toolbarHide } };
  }

  setToolbarPosition(): void {
    this.layoutConfig.config = { toolbar: { position: this.toolbarPosition } };
  }

  setNavbarHide(): void {
    this.layoutConfig.config = { navbar: { show: !this.navbarHide } };
  }

  setNavbarCollapse(): void {
    this.layoutConfig.config = { navbar: { collapsed: this.navbarCollapse } };
  }

  setNavbarPosition(): void {
    this.layoutConfig.config = { navbar: { position: this.navbarPosition } };
  }

  setFooterHide(): void {
    this.layoutConfig.config = { footer: { show: !this.footerHide } };
  }

  setFooterPosition(): void {
    this.layoutConfig.config = { footer: { position: this.footerPosition } };
  }
}
