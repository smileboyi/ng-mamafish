import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { routingPathConfig as pathConfig } from '@config/routing-path.config';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'cat-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent implements OnInit {
  httpCode: '403' | '404' | '500' = '404';
  errorInfo = {
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Server Error',
  };

  constructor(private route: ActivatedRoute, private utils: UtilsService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (['403', '404', '500'].includes(params.code)) {
        this.httpCode = params.code;
      } else {
        this.httpCode = '404';
      }
    });
  }

  gotoHomePage(): void {
    this.utils.gotoOtherPage('analytics');
  }
}
