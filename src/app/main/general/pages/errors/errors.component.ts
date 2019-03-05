import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { routingPathConfig as pathConfig } from '@config/routing-path.config';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'cat-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.less']
})
export class ErrorsComponent implements OnInit {
  httpCode: string = '404';
  errorInfo: { [key: string]: string } = {
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Server Error'
  };

  constructor(private route: ActivatedRoute, private utils: UtilsService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.httpCode = params.code;
    });
  }

  gotoHomePage(): void {
    this.utils.gotoOtherPage('profile');
  }
}
