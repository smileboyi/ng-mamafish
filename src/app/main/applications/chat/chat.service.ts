import { Injectable } from '@angular/core';

import { chatUsers, getChatTalks } from '@mock/data.mock';
import { ChatUser, ChatTalk } from '@declare';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() {}

  getChatUsers(): Array<ChatUser> {
    return chatUsers;
  }

  getChatTalks(user: ChatUser): Array<ChatTalk> {
    return getChatTalks(user);
  }
}
