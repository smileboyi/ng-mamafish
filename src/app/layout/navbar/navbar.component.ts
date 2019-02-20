import { Component, OnInit } from '@angular/core';

import { navigation, NavigationItem } from '@config/navigation.config';

@Component({
  selector: 'cat-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  navData: Array<NavigationItem>;

  constructor() {
    this.navData = navigation;
  }

  ngOnInit() {}
}
