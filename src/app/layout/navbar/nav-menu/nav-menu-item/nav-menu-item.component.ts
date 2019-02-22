import { Component, OnInit, Input } from '@angular/core';

import { NavigationItem } from '@config/navigation.config';
import { GlobalService } from '@services/global.service';

@Component({
  selector: 'cat-nav-menu-item',
  templateUrl: './nav-menu-item.component.html',
  styleUrls: ['./nav-menu-item.component.less']
})
export class NavMenuItemComponent implements OnInit {
  @Input() item: NavigationItem;
  constructor(public global: GlobalService) {}

  ngOnInit() {}

  clickMenuItem(urls: Array<string>, params: Object): void {
    const url: string = urls.reduce(
      (path: string, next: string) => path + '/' + next,
      ''
    );
    console.log(url);
  }
}
