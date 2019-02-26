import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cat-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  pageWidth: string = 'fullwidth';
  toolbarShow: boolean = false;
  toolbarPosition: string = 'below';
  toolbarBgColor: string = '';
  navbarShow: boolean = false;
  navbarCollapse: boolean = false;
  navbarPosition: string = 'left';
  navbarHeadBgColor: string = '';
  navbarBodyBgColor: string = '';
  footerShow: boolean = false;
  footerPosition: string = 'above';
  footerBgColor: string = '';

  // @Input() drawerVisible: boolean;

  constructor() {}

  ngOnInit() {}

  handleDrawerClose(): void {
    // this.drawerVisible = false;
  }
}
