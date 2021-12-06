import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgForage } from 'ngforage';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { pageIdMap } from '@config/navigation.config';
import { GlobalService } from '@services/global.service';
import { UtilsService } from '@services/utils.service';
import { PAGE_TABS_DATA } from '@tokens';
import { PageTab } from '@declare';

@UntilDestroy()
@Component({
  selector: 'cat-page-tabs',
  templateUrl: './page-tabs.component.html',
  styleUrls: ['./page-tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTabsComponent implements OnInit, OnDestroy {
  currTabIdx = 0;
  tabsData: PageTab[] = [];

  constructor(
    public global: GlobalService,
    private ngForage: NgForage,
    private utils: UtilsService,
    private cdr: ChangeDetectorRef,
    @Inject(PAGE_TABS_DATA) private pageTabsDataToken: string
  ) {
    this.currTabIdx = this.tabsData.length - 1;

    GlobalService.pageChange$.pipe(untilDestroyed(this)).subscribe((v) => {
      if (this.tabsData.find((i) => i.title === v.title)) {
        this.currTabIdx = this.tabsData.findIndex((i) => i.title === v.title);
        if (v.hashs.length) {
          this.tabsData[this.currTabIdx].pageId = pageIdMap[v.hashs[0]];
          this.tabsData[this.currTabIdx].hashs = v.hashs;
          this.tabsData[this.currTabIdx].params = v.params;
          this.updateCache();
        }
        this.cdr.markForCheck();
      } else {
        // 可能传过来的是初值{}
        if (v.title) {
          v.pageId = this.global.selectMenuItemId;
          this.tabsData.push(v);
          this.currTabIdx = this.tabsData.length - 1;
          this.cdr.markForCheck();
          this.updateCache();
        }
      }
    });
  }

  ngOnInit(): void {
    this.ngForage
      .getItem(this.pageTabsDataToken)
      .then((data: any) => {
        if (data && data.length) {
          this.tabsData = data;
        }
        const path = this.global.pageRouteInfo.path;
        this.currTabIdx = this.tabsData.findIndex((i) => i.pageId === path);
        this.cdr.markForCheck();
      })
      .catch(() => {});
  }

  ngOnDestroy(): void {
    this.updateCache();
  }

  handleTabSwitch(i: number): void {
    if (this.currTabIdx !== i) {
      this.currTabIdx = i;
      this.cdr.markForCheck();
      this.switchPage();
    }
  }

  handleTabClose(i: number): void {
    if (this.tabsData.length >= 2) {
      this.tabsData.splice(i, 1);
      const idx = this.currTabIdx - 1;
      this.currTabIdx = idx > -1 ? idx : 0;
      this.cdr.markForCheck();
      this.updateCache();
      this.switchPage();
    }
  }

  switchPage(): void {
    const { pageId, hashs, params } = this.tabsData[this.currTabIdx];
    this.utils.gotoOtherPage(pageId, hashs, params);
    this.global.urlData.hashs = hashs;
    this.global.urlData.params = params;
    UtilsService.menuItemChange$.next(null);
  }

  updateCache(): void {
    this.ngForage.setItem(this.pageTabsDataToken, this.tabsData).then(() => {});
  }
}
