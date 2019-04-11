import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cat-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  avatarImg = '';
  userName = '深入骨髓';
  visible = false;
  fold: false;

  constructor() {}

  ngOnInit() {}
}
