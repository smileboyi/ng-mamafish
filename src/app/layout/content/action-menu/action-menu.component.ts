import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cat-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.less'],
})
export class ActionMenuComponent implements OnInit {
  musicHidden = true;

  @Output() toggleSkin = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
