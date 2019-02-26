import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import { NavigationItem } from '@config/navigation.config';
import { GlobalService } from '@services/global.service';
import { LayoutConfigService } from '@services/layout-config.service';
import { LayoutConfig } from '@config/layout.config';

@Component({
  selector: 'cat-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent implements OnInit, AfterViewInit {
  isCollapsed: boolean = false;
  position: string;
  @Input() navData: Array<NavigationItem> = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public global: GlobalService,
    private layoutConfig: LayoutConfigService
  ) {}

  ngOnInit() {
    this.layoutConfig.config.subscribe((config: LayoutConfig) => {
      this.isCollapsed = config.navbar.collapsed;
      this.position = config.navbar.position;
    });
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
}
