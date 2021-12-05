import {
  Component,
  OnInit,
  Inject,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { NgForage } from 'ngforage';
import { cloneDeep } from 'lodash';
import { JSEncrypt } from 'jsencrypt';

import { GlobalService } from '@services/global.service';
import { UtilsService } from '@services/utils.service';
import { userPermissions } from '@mock/data.mock';
import { messageText } from '@config/message-text.config';
import { appConfig } from '@config/app.config';
import { PROFILE_INFO } from '@tokens';
import { UserRole } from '@declare';

@UntilDestroy()
@Component({
  selector: 'cat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  account = '';
  password = '';
  redirectUrl = '';
  publicKey = '';
  accountLock = false;
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
    @Inject(PROFILE_INFO) private profileInfoToken: string
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((query: any) => {
      this.redirectUrl = query.redirectUrl || '';
      this.accountLock = Boolean(query.lock);
    });
    if (this.redirectUrl) {
      history.pushState(null, '', document.URL);
      history.pushState(null, '', document.URL);
    }

    this.validateForm = this.fb.group({
      account: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
    });

    this.http
      .get(appConfig.PATCH_URL + '/auth/rsapubkey')
      .subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.publicKey = res.data.pubkey;
        }
      });
  }

  @HostListener('window:popstate')
  onHistoryBack(): void {
    if (this.redirectUrl) {
      history.pushState(null, '', document.URL);
    }
  }

  handleLogin(): void {
    if (this.accountLock) {
      this.handleLockLogin();
      return;
    }
    const submitPayload = cloneDeep(this.validateForm.value);
    sessionStorage.setItem('accountPassw', submitPayload.password);
    submitPayload.account = submitPayload.account.trim();
    // 密码加密
    const jsencrypt = new JSEncrypt({});
    jsencrypt.setPublicKey(this.publicKey);
    submitPayload.password = jsencrypt.encrypt(submitPayload.password.trim());

    this.http
      .post(appConfig.PATCH_URL + '/auth/login', submitPayload)
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
            this.global.rsapubKey = this.publicKey;
            this.ngForage
              .setItem(this.profileInfoToken, {
                userRole: userRole.value,
                userInfo,
                permissionList,
                rsapubKey: this.publicKey,
              })
              .then(() => {});

            this.permissionsService.loadPermissions(permissionList);

            if (this.redirectUrl) {
              this.utils.gotoOtherPage(this.redirectUrl);
            } else {
              this.utils.gotoOtherPage('analytics');
            }
          }
        },
        (error) => {
          console.log('Error', error);
        }
      );
  }

  // 锁定登录输入密码解锁
  handleLockLogin(): void {
    const accountPassw = sessionStorage.getItem('accountPassw');
    const submitPayload = cloneDeep(this.validateForm.value);
    const password = submitPayload.password.trim();
    // 这里应该在后台判断，把密码存浏览器不安全
    if (accountPassw === password) {
      if (this.redirectUrl) {
        this.utils.gotoOtherPage(this.redirectUrl);
      } else {
        this.utils.gotoOtherPage('analytics');
      }
    } else {
      this.message.create('error', '密码错误');
    }
  }

  handleVisitor(): void {
    this.global.userRole = UserRole.Visitor;
    this.global.permissionList = userPermissions[0];
    this.global.resetUserInfo();
    this.global.userInfo.username = 'Visitor';
    this.ngForage
      .setItem(this.profileInfoToken, {
        userRole: UserRole.Visitor,
        userInfo: this.global.userInfo,
        permissionList: userPermissions[0],
      })
      .then(() => {});
    this.permissionsService.loadPermissions(userPermissions[0]);
    this.utils.gotoOtherPage('analytics');
  }
}
