import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig, defaultThemeColor } from '@config/layout.config';
import { ThemeColor } from '@declare';

@Component({
  selector: 'cat-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  htmlROOT = document.querySelector(':root');
  selectedIdx: number = 0;
  readonly idxMap: Array<string> = ['width', 'toolbar', 'navbar', 'footer'];
  private _drawerVisible: boolean = false;

  pageWidth: string = 'fullwidth';
  toolbarHide: boolean = false;
  toolbarPosition: string = 'below';
  toolbarThemeColor: ThemeColor;
  navbarHide: boolean = false;
  navbarCollapse: boolean = false;
  navbarPosition: string = 'left';
  navbarThemeColor: ThemeColor;
  footerHide: boolean = false;
  footerPosition: string = 'above';
  footerThemeColor: ThemeColor;

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

  constructor(
    public global: GlobalService,
    private layoutConfig: LayoutConfigService
  ) {}

  ngOnInit() {
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.pageWidth = config.width;
      this.toolbarHide = !config.toolbar.show;
      this.toolbarPosition = config.toolbar.position;
      this.navbarHide = !config.navbar.show;
      this.navbarCollapse = config.navbar.collapsed;
      this.navbarPosition = config.navbar.position;
      this.footerHide = !config.footer.show;
      this.footerPosition = config.footer.position;
    });
  }

  private setThemeColor(themeColor: any): void {
    const _style = this.htmlROOT.getAttribute('style');
    const styleObj = {};
    if (_style) {
      const styleArr = _style.split(';');
      styleArr.pop();
      styleArr.map(item => {
        const [key, val] = item.split(':');
        styleObj[key] = val;
      });
    }

    const obj = Object.assign({}, styleObj, themeColor);
    let themeStr = '';
    Object.keys(obj).forEach(key => {
      themeStr += key + ':' + obj[key] + ';';
    });
    this.htmlROOT.setAttribute('style', `${themeStr}`);
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
    if (value.theme) {
      this.resetThemeColor(key);
    }
  }

  // 重置主题颜色
  resetThemeColor(type: string): void {
    if (type === 'navbar') {
      this.setThemeColor(defaultThemeColor['navbar']);
    } else if (type === 'toolbar') {
      this.setThemeColor(defaultThemeColor['toolbar']);
    } else {
      this.setThemeColor(defaultThemeColor['footer']);
    }
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

  setToolbarThemeColor(themeColor: ThemeColor): void {
    this.layoutConfig.config = { toolbar: { theme: themeColor } };
    this.setThemeColor({
      '--toolbarThemeFg': themeColor.selectedFg,
      '--toolbarThemeBg': themeColor.selectedBg
    });
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

  setNavbarThemeColor(themeColor: ThemeColor): void {
    this.layoutConfig.config = { toolbar: { theme: themeColor } };
    this.setThemeColor({
      '--navbarThemeFg': themeColor.selectedFg,
      '--navbarThemeBg': themeColor.selectedBg
    });
  }

  setFooterHide(): void {
    this.layoutConfig.config = { footer: { show: !this.footerHide } };
  }

  setFooterPosition(): void {
    this.layoutConfig.config = { footer: { position: this.footerPosition } };
  }

  setFooterThemeColor(themeColor: ThemeColor): void {
    this.layoutConfig.config = { footer: { theme: themeColor } };
    this.setThemeColor({
      '--footerThemeFg': themeColor.selectedFg,
      '--footerThemeBg': themeColor.selectedBg
    });
  }
}
