import { Component, OnInit } from '@angular/core';

import { activities } from '@mock/data.mock';

@Component({
  selector: 'cat-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  index = 0;
  activities: Array<any> = [];
  Profile: Array<any> = [];
  Messages: Array<any> = [];
  showStatus: 'Show more' | 'Loading more' | 'No more' = 'Show more';
  constructor() {
    this.activities = activities;
  }

  ngOnInit() {}
}
