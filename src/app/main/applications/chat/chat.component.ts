import { Component, OnInit, HostListener } from '@angular/core';

import { ChatService } from './chat.service';
import { ChatUser, ChatTalk } from '@declare';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'cat-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
})
export class ChatComponent implements OnInit {
  fold = false;
  drawer = false;
  mobile = false;
  chatUsers: ChatUser[];
  chatTalks: ChatTalk[];
  currentUser: ChatUser = {
    avatar: '',
    author: '',
    status: '',
  };
  currentUserIndex: number;
  newMessage = '';

  constructor(private utils: UtilsService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.mobile = this.utils.getMobileState();
    this.chatUsers = this.chatService.getChatUsers();
  }

  selectChatUser(user: ChatUser, index: number): void {
    this.currentUser = user;
    this.currentUserIndex = index;
    this.chatTalks = this.chatService.getChatTalks(user);
  }

  deleteChatUser(): void {
    const arr = this.chatUsers.concat();
    arr.splice(this.currentUserIndex, 1);
    this.chatUsers = arr;
    this.currentUser = {
      avatar: '',
      author: '',
      status: '',
    };
    this.currentUserIndex = 0;
  }

  sendMessage(e: KeyboardEvent | MouseEvent): void {
    const newMessage = this.newMessage.trim();
    if ((e.which === 1 || e.which === 13) && newMessage) {
      const date = new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes();
      this.chatTalks.push(
        new ChatTalk(
          'assets/images/user.jpg',
          'Emilio Verdines',
          newMessage,
          new Date(year, month, day, hour, minute),
          true
        )
      );
      this.newMessage = '';
    }
  }

  @HostListener('window:resize')
  @UtilsService.throttle(200)
  public onWindowResize(): void {
    this.mobile = this.utils.getMobileState();
    if (this.mobile) {
      this.fold = true;
    }
  }
}
