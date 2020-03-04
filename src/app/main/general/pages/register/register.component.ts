import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { JSEncrypt } from 'jsencrypt';
import * as _ from 'lodash';

import { appConfig } from '@config/app.config';
import { messageText } from '@config/message-text.config';

const shouldPasswordEqualValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const rptPassword = control.get('rptPassword');
  return password && rptPassword && password.value === rptPassword.value
    ? null
    : { passwordEqual: false };
};

@Component({
  selector: 'cat-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  publicKey = '';
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(15)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)
          ]
        ],
        rptPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30)
          ]
        ]
      },
      { validators: shouldPasswordEqualValidator }
    );

    this.http
      .get(appConfig.SERVER_API_URL_BASE + '/auth/rsapubkey')
      .subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.publicKey = res.data.pubkey;
        }
      });
  }

  handleRegister(): void {
    if (this.validateForm.valid) {
      const submitPayload = _.cloneDeep(this.validateForm.value);
      delete submitPayload.rptPassword;

      // 密码加密
      const jsencrypt = new JSEncrypt();
      jsencrypt.setPublicKey(this.publicKey);
      submitPayload.password = jsencrypt.encrypt(submitPayload.password);

      this.http
        .post(appConfig.SERVER_API_URL_BASE + '/auth/register', submitPayload)
        .subscribe(
          (res: any) => {
            if (res.statusCode === 200) {
              this.message.create('success', messageText.SUC_USER_REGISTER);
            }
          },
          error => {
            console.log('Error', error);
          }
        );
    }
  }
}
