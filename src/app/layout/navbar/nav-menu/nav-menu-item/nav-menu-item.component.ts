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

  constructor(private global: GlobalService) {}

  ngOnInit() {}
}
