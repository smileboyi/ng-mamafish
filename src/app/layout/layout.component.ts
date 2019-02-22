import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';

@Component({
  selector: 'cat-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit, OnDestroy {
  drawerVisible: boolean = false;

  constructor(private utils: UtilsService, public global: GlobalService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  openSetting(): void {
    this.drawerVisible = true;
  }
  handleDrawerClose(): void {
    this.drawerVisible = false;
  }
}
