import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Renderer2,
  ElementRef,
  HostListener
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';
import {
  User,
  UserProfile,
  UserWork,
  UserContacts,
  UserSocial,
  UserSettings
} from '@declare';

@Component({
  selector: 'cat-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.less']
})
export class UserDialogComponent implements OnInit, OnDestroy {
  private form$: Subject<any> = new Subject<any>();
  private subscription: Subscription;

  isPageMini = false;
  type: 'add' | 'edit';
  form: FormGroup;
  passwordVisible = false;
  contentIndex = 1;
  contentShow = [1, 1, 1, 0, 0, 0, 0, 0];
  timer: any;
  user: User;
  title = 'Add User';
  dialogShow = false;

  @ViewChild('tabsBox')
  tabsBox: ElementRef;

  colors = [
    { value: 'gradient-purple', viewValue: 'Purple' },
    { value: 'gradient-indigo', viewValue: 'Indigo' },
    { value: 'gradient-teal', viewValue: 'Teal' },
    { value: 'gradient-blue', viewValue: 'Blue' },
    { value: 'gradient-orange', viewValue: 'Orange' },
    { value: 'gradient-green', viewValue: 'Green' },
    { value: 'gradient-pink', viewValue: 'Pink' },
    { value: 'gradient-red', viewValue: 'Red' },
    { value: 'gradient-amber', viewValue: 'Amber' },
    { value: 'gradient-gray', viewValue: 'Gray' },
    { value: 'gradient-brown', viewValue: 'Brown' },
    { value: 'gradient-lime', viewValue: 'Lime' }
  ];

  constructor(
    private fb: FormBuilder,
    private renderer2: Renderer2,
    private utils: UtilsService,
    private global: GlobalService
  ) {
    this.form = this.fb.group({
      id: null,
      username: [
        null,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      profile: this.fb.group({
        name: null,
        surname: null,
        birthday: null,
        gender: null,
        image: null
      }),
      work: this.fb.group({
        company: null,
        position: null,
        salary: null
      }),
      contacts: this.fb.group({
        email: null,
        phone: null,
        address: null
      }),
      social: this.fb.group({
        weibo: null,
        qq: null,
        google: null
      }),
      settings: this.fb.group({
        isActive: null,
        isDeleted: null,
        registrationDate: null,
        joinedDate: null,
        bgColor: null
      })
    });
  }

  ngOnInit() {
    this.isPageMini = this.utils.getMiniState();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initForm(user: User) {
    this.user = user;
    if (this.user) {
      this.type = 'edit';
      this.form.setValue(this.user);
    } else {
      this.type = 'add';
      this.user = new User();
      this.user.profile = new UserProfile();
      this.user.work = new UserWork();
      this.user.contacts = new UserContacts();
      this.user.social = new UserSocial();
      this.user.settings = new UserSettings();
    }
    this.dialogShow = true;
  }

  // 给定一个位置进行走马灯切换
  toggleTabContent(moveI: number): void {
    const [prevI, currI, nextI]: any = this.contentShow.reduce(
      (arr, val, idx) => {
        if (val) {
          arr.push(idx);
        }
        return arr;
      },
      []
    );
    this.contentIndex = moveI;
    if (moveI < currI) {
      this.contentShow[prevI] = 0;
      this.contentShow[moveI] = 1;
      this.moveTabContent('prev').then(() => {
        this.timer = setTimeout(() => {
          this.renderer2.setAttribute(this.tabsBox.nativeElement, 'style', '');
          this.contentShow[nextI] = 0;
          this.contentShow[moveI - 1] = 1;
          clearTimeout(this.timer);
        }, 300);
      });
    } else if (moveI > currI) {
      this.contentShow[nextI] = 0;
      this.contentShow[moveI] = 1;
      this.moveTabContent('next').then(() => {
        this.timer = setTimeout(() => {
          this.renderer2.setAttribute(this.tabsBox.nativeElement, 'style', '');
          this.contentShow[prevI] = 0;
          this.contentShow[moveI + 1] = 1;
          clearTimeout(this.timer);
        }, 300);
      });
    }
  }

  // 走马灯向前/向后切换
  moveTabContent(position: 'prev' | 'next'): Promise<any> {
    clearTimeout(this.timer);
    // tab-content width: 290px
    let move = -290;
    if (position === 'prev') {
      move = 0;
    } else {
      move = -580;
    }
    this.renderer2.setAttribute(
      this.tabsBox.nativeElement,
      'style',
      `transform: translateX(${move}px);transition: all .28s`
    );
    return Promise.resolve();
  }

  handleSave(): void {
    this.form$.next(this.form.value);
    this.handleCancel();
  }

  subscriptionForm(fn: (user: User) => void): void {
    this.subscription = this.form$.subscribe(fn);
  }

  handleCancel(): void {
    this.form.reset();
    this.contentIndex = 1;
    this.contentShow = [1, 1, 1, 0, 0, 0, 0, 0];
    this.dialogShow = false;
  }

  @HostListener('window:resize')
  @UtilsService.throttle(200)
  onWindowResize(): void {
    this.isPageMini = this.utils.getMiniState();
  }
}
