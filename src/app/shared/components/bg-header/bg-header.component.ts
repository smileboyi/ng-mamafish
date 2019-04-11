import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cat-bg-header',
  templateUrl: './bg-header.component.html',
  styleUrls: ['./bg-header.component.less']
})
export class BgHeaderComponent implements OnInit {
  @Input() headerTitle: string = '';
  @Input() describe: string = '';

  constructor() {}

  ngOnInit() {}
}
