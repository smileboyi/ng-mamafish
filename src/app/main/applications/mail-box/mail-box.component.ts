import { filter } from 'rxjs/operators';
import { Component, OnInit, HostListener } from '@angular/core';

import { UtilsService } from '@services/utils.service';
import { MailBoxService } from './mail-box.service';
import { Mail } from '@declare';

@Component({
  selector: 'cat-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.less']
})
export class MailBoxComponent implements OnInit {
  fold = false;
  search = false;
  mobile = false;
  newMail = false;
  type = 'all';
  mail: Mail;
  mails: Array<Mail> = [];
  searchText = '';

  constructor(private utils: UtilsService, private mailBox: MailBoxService) {}

  ngOnInit() {
    this.mobile = this.utils.getMobileState();
    this.searchMails();
  }

  @HostListener('window:resize')
  @UtilsService.throttle(200)
  public onWindowResize(): void {
    this.mobile = this.utils.getMobileState();
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

  viewDetail(mail: Mail): void {
    this.mail = mail;
    this.mail.selected = true;
    this.mail.unread = false;
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
    this.mail = null;
  }
}
