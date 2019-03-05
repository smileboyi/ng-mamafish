import { Component, OnInit } from '@angular/core';

import { GlobalService } from '@services/global.service';
import { UtilsService } from '@services/utils.service';
import { UserRole } from '@declare';
import { userInfos, userPermissions } from '@mock/data.mock';
import { routingPathConfig as pathConfig } from '@config/routing-path.config';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'cat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  account: string = '';
  password: string = '';

  constructor(
    public global: GlobalService,
    private utils: UtilsService,
    private message: NzMessageService
  ) {}

  ngOnInit() {}

  submitForm(): void {
    const account = this.account.trim();
    const password = this.password.trim();
    let roleState = '游客';
    if (account === 'smileboyi' && password === '123456') {
      this.global.userRole = UserRole.User;
      this.global.userInfo = userInfos[1];
      this.global.permissionList = userPermissions[1];
      roleState = '用户';
    } else if (account === 'admin' && password === '123456') {
      this.global.userRole = UserRole.Manager;
      this.global.userInfo = userInfos[2];
      this.global.permissionList = userPermissions[2];
      roleState = '管理员';
    } else {
      this.global.userRole = UserRole.Full;
      this.global.userInfo = userInfos[0];
      this.global.permissionList = userPermissions[0];
    }
    this.message.create('success', `登录成功，用户角色为${roleState}`);
    this.utils.gotoOtherPage(pathConfig.dashboard.default);
  }
}
