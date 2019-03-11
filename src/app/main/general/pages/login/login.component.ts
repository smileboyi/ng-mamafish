import { Component, OnInit, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NgForage } from 'ngforage';
import { NgxPermissionsService } from 'ngx-permissions';

import { GlobalService } from '@services/global.service';
import { UtilsService } from '@services/utils.service';
import { userInfos, userPermissions } from '@mock/data.mock';
import { messageText } from '@config/message-text.config';
import { PROFILE_INFO } from '@tokens';
import { UserRole } from '@declare';

@Component({
  selector: 'cat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  account: string = '';
  password: string = '';

  constructor(
    private ngForage: NgForage,
    public global: GlobalService,
    private utils: UtilsService,
    private message: NzMessageService,
    private permissionsService: NgxPermissionsService,
    @Inject(PROFILE_INFO) private profileInfo: string
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
    this.message.create(
      'success',
      `${messageText.SUC_USER_LOGIN}，角色为${roleState}`
    );
    this.utils.gotoOtherPage('profile');
    this.ngForage.setItem(this.profileInfo, {
      userRole: this.global.userRole,
      userInfo: this.global.userInfo,
      permissionList: this.global.permissionList
    });
    this.permissionsService.loadPermissions(this.global.permissionList);
  }
}
