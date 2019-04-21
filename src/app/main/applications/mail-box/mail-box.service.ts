import { Injectable } from '@angular/core';

import { Mails } from '@mock/data.mock';
import { Mail } from '@declare';

@Injectable({
  providedIn: 'root'
})
export class MailBoxService {
  constructor() {}

  getAllMails(): Array<Mail> {
    return Mails.filter(mail => !mail.sent && !mail.draft && !mail.trash);
  }

  getStarredMails(): Array<Mail> {
    return Mails.filter(mail => mail.starred);
  }

  getSentMails(): Array<Mail> {
    return Mails.filter(mail => mail.sent);
  }

  getDraftMails(): Array<Mail> {
    return Mails.filter(mail => mail.draft);
  }

  getTrashMails(): Array<Mail> {
    return Mails.filter(mail => mail.trash);
  }

  getMail(id: number | string): Mail | undefined {
    return Mails.find(mail => mail.id === +id);
  }
}
