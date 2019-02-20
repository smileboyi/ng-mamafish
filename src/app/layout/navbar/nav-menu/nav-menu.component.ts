import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import { navigation, NavigationItem } from '@config/navigation.config';

@Component({
  selector: 'cat-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent implements OnInit, AfterViewInit {
  isCollapsed: boolean = true;
  @Input() navData: Array<NavigationItem> = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
