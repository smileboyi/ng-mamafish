import { Component, OnInit } from '@angular/core';

import { PersonInfo } from '@declare';
import { personInfos } from '@mock/data.mock';

@Component({
  selector: 'cat-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less']
})
export class DataTableComponent implements OnInit {
  listOfData: Array<PersonInfo> = personInfos;

  constructor() {}

  ngOnInit() {}

  exportNormal(): void {}

  exportSpecified(): void {}
}
