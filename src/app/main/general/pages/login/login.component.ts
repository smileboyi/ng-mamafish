import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '@services/global.service';
import { UserRole } from '@declare';

@Component({
  selector: 'cat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  account: string = '';
  password: string = '';

  constructor(public global: GlobalService, private router: Router) {}

  ngOnInit() {}

  submitForm(): void {
    const account = this.account.trim();
    const password = this.password.trim();
    if (account === 'smileboyi' && password === '123456') {
      this.global.userRole = UserRole.User;
    } else if (account === 'admin' && password === '123456') {
      this.global.userRole = UserRole.Manager;
    } else {
      this.global.userRole = UserRole.Full;
    }
    console.log(this.global.userRole);
  }
}
