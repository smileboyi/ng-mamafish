import { messages } from './../../mock/data.mock';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs';

import { Message, File, Schedule } from '../../declare';
import { MessageService } from '../../services/message.service';

interface UserMessage {
  messages: Array<Message>;
  file: Array<File>;
  schedule: Array<Schedule>;
}
@Component({
  selector: 'cat-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {
  userMessage: UserMessage;
  drawerVisible: boolean = false;
  tabIcon: string[] = ['message', 'file', 'schedule'];
  public messages: Array<Message>;
  public files: Array<File>;
  public meetings: Array<Schedule>;

  constructor(private message: MessageService) {}

  ngOnInit() {
    this.message.getMessages().subscribe(res => (this.userMessage = res.data));
  }

  openSetting(): void {
    this.drawerVisible = true;
  }
  handleDrawerClose(): void {
    this.drawerVisible = false;
  }
}
