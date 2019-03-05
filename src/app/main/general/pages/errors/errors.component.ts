import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cat-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.less']
})
export class ErrorsComponent implements OnInit {
  errorMeta: { [key: number]: string } = {
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error'
  };

  constructor() {}

  ngOnInit() {}
}
