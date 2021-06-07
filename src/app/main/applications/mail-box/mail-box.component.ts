import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

import { messageText } from '@config/message-text.config';
import { UtilsService } from '@services/utils.service';
import { MailBoxService } from './mail-box.service';
import { Mail, CanDeactivateComponent } from '@declare';

@Component({
  selector: 'cat-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.less'],
})
export class MailBoxComponent implements OnInit, CanDeactivateComponent {
  fold = false;
  search = false;
  mobile = false;
  ltMd = false;
  newMail = false;
  type = 'all';
  mail: Mail;
  mails: Array<Mail> = [];
  searchText = '';
  form: FormGroup;
  oldElIdx = -1;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private utils: UtilsService,
    private renderer2: Renderer2,
    private mailBox: MailBoxService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.mobile = this.utils.getMobileState();
    this.ltMd = window.innerWidth < 960;
    this.searchMails();
    this.form = this.fb.group({
      to: [null, [Validators.email, Validators.required]],
      cc: null,
      subject: null,
      message: [null, [Validators.required]],
    });
  }

  @HostListener('window:resize')
  @UtilsService.throttle(200)
  public onWindowResize(): void {
    this.mobile = this.utils.getMobileState();
    this.ltMd = window.innerWidth < 960;
    if (this.mobile) {
      this.fold = true;
    }
  }

  getMails(): void {
    switch (this.type) {
      case 'all':
        this.mails = this.mailBox.getAllMails();
        break;
      case 'starred':
        this.mails = this.mailBox.getStarredMails();
        break;
      case 'sent':
        this.mails = this.mailBox.getSentMails();
        break;
      case 'drafts':
        this.mails = this.mailBox.getDraftMails();
        break;
      case 'trash':
        this.mails = this.mailBox.getTrashMails();
        break;
      default:
        this.mails = this.mailBox.getDraftMails();
    }
  }

  isFormDirty(): boolean {
    return this.newMail ? this.form.dirty : false;
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.utils.canActivateModal();
  }

  viewDetail(mail: Mail, index: number): void {
    if (this.oldElIdx !== index) {
      this.mail = mail;
      this.mail.selected = true;
      this.mail.unread = false;
      this.newMail = false;
      const els = this.el.nativeElement.querySelectorAll(
        '.mail-box .main .person'
      );
      this.renderer2.addClass(els[index], 'ac');
      if (this.oldElIdx > -1) {
        this.renderer2.removeClass(els[this.oldElIdx], 'ac');
      }
      this.oldElIdx = index;
    }
  }

  setAsRead(): void {
    this.mail.unread = false;
  }

  setAsUnRead(): void {
    this.mail.unread = true;
  }

  @UtilsService.throttle(200)
  searchMails(type = 'all'): void {
    this.type = type;
    this.getMails();
    this.mails = this.mails.filter(
      (m: Mail) =>
        m.subject.includes(this.searchText) || m.body.includes(this.searchText)
    );
  }

  delete(): void {
    // 改变原对象
    this.mail.trash = true;
    this.mail.sent = false;
    this.mail.draft = false;
    this.mail.starred = false;
    this.getMails();
    // 断开原对象的链接
    this.mail = null as any;
    this.oldElIdx = -1;
  }

  onSubmit(mail: string): void {
    if (this.form.valid) {
      console.log(mail);
      this.message.create('success', messageText.SUC_SEND_MAIL);
      this.form.reset();
    }
  }
}
