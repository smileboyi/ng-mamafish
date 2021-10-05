import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { GlobalService } from '@services/global.service';
import { UtilsService } from '@services/utils.service';

import { PageTab } from '@declare';

@Component({
  selector: 'cat-page-tabs',
  templateUrl: './page-tabs.component.html',
  styleUrls: ['./page-tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsComponent implements OnInit {
  currTabIdx = 0;
  tabsData: PageTab[] = [];

  constructor(
    public global: GlobalService,
    private utils: UtilsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    GlobalService.pageChange$.subscribe((v) => {
      if (this.tabsData.find((i) => i.pageId === v.pageId)) {
        this.currTabIdx = this.tabsData.findIndex((i) => i.pageId === v.pageId);
      } else {
        v.cached = true;
        this.tabsData.push(v);
        this.currTabIdx = this.tabsData.length - 1;
      }
      this.cdr.markForCheck();
    });
  }

  handleTabSwitch(i: number): void {
    this.currTabIdx = i;
    const { pageId, hashs, params, cached } = this.tabsData[i];
    this.cdr.detectChanges();
    console.log(i);
    if (cached) {
    } else {
      this.utils.gotoOtherPage(pageId, hashs, params);
    }
  }

  handleTabClose(i: number): void {
    if (this.tabsData.length > 1) {
      this.tabsData.splice(i, 1);
      if (this.currTabIdx === i) {
        this.currTabIdx -= 1;
      }
      this.handleTabSwitch(this.currTabIdx);
      this.cdr.markForCheck();
    }
  }
}
