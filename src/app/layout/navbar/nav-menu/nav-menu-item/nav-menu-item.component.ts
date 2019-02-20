import { Component, OnInit, Input } from '@angular/core';

import { navigation, NavigationItem } from '@config/navigation.config';

@Component({
  selector: 'cat-nav-menu-item',
  templateUrl: './nav-menu-item.component.html',
  styleUrls: ['./nav-menu-item.component.less']
})
export class NavMenuItemComponent implements OnInit {
  @Input() item: NavigationItem;

  constructor() {}

  ngOnInit() {}
}
