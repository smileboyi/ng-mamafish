import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cat-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @Input() drawerVisible: boolean;

  constructor() {}

  ngOnInit() {}

  handleDrawerClose(): void {
    // this.drawerVisible = false;
  }
}
