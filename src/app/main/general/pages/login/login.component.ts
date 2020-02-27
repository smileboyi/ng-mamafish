import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { JSEncrypt } from 'jsencrypt';
import { NgForage } from 'ngforage';
import * as _ from 'lodash';

import { GlobalService } from '@services/global.service';
import { UtilsService } from '@services/utils.service';
import { userPermissions } from '@mock/data.mock';
import { messageText } from '@config/message-text.config';
import { appConfig } from '@config/app.config';
import { PROFILE_INFO } from '@tokens';
import { UserRole } from '@declare';

@Component({
  selector: 'cat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  account = '';
  password = '';
  redirectUrl = '';
  publicKey = '';
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private ngForage: NgForage,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private global: GlobalService,
    private message: NzMessageService,
    private permissionsService: NgxPermissionsService,
    @Inject(PROFILE_INFO) private profileInfo: string
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((query: any) => {
      this.redirectUrl = query.redirectUrl || '';
    });
    if (this.redirectUrl) {
      history.pushState(null, null, document.URL);
      history.pushState(null, null, document.URL);
    }

    this.validateForm = this.fb.group({
      account: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(30)]
      ]
    });

    this.http
      .get(appConfig.SERVER_API_URL_BASE + '/auth/rsapubkey')
      .subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.publicKey = res.data.pubkey;
        }
      });
  }

  @HostListener('window:popstate')
  onHistoryBack() {
    if (this.redirectUrl) {
      history.pushState(null, null, document.URL);
    }
  }

  handleLogin(): void {
    const submitPayload = _.cloneDeep(this.validateForm.value);

    // 密码加密
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPublicKey(this.publicKey);
    submitPayload.password = jsencrypt.encrypt(submitPayload.password);

    this.http
      .post(appConfig.SERVER_API_URL_BASE + '/auth/login', submitPayload)
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200) {
            const { token, userInfo, userRole, permissionList } = res.data;

            this.message.create(
              'success',
              `${messageText.SUC_USER_LOGIN}，角色为${userRole.description}`
            );

            // 数据保存2份，一份本地，一份全局，全局好取出，再次访问网站时，从本地加载到全局
            this.global.userRole = userRole.value;
            userInfo.token = token;
            userInfo.userRole = userRole;
            this.global.userInfo = userInfo;
            permissionList.push(userRole.role);
            this.global.permissionList = permissionList;
            this.ngForage.setItem(this.profileInfo, {
              userRole: userRole.value,
              userInfo,
              permissionList,
              rsapubKey: this.publicKey
            });

            this.permissionsService.loadPermissions(permissionList);

            if (this.redirectUrl) {
              this.utils.gotoOtherPage(this.redirectUrl);
            } else {
              this.utils.gotoOtherPage('analytics');
            }
          }
        },
        error => {
          console.log('Error', error);
        }
      );
  }

  handleVisitor(): void {
    this.global.userRole = UserRole.Full;
    this.global.permissionList = userPermissions[0];
    this.global.resetUserInfo();
    this.global.userInfo.username = 'Visitor';
    this.ngForage.setItem(this.profileInfo, {
      userRole: UserRole.Full,
      userInfo: this.global.userInfo,
      permissionList: userPermissions[0]
    });
    this.permissionsService.loadPermissions(userPermissions[0]);
    this.utils.gotoOtherPage('analytics');
  }
}
