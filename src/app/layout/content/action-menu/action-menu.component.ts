import {
  Component,
  OnInit,
  Output,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import Gitter from 'gitter-sidecar';

@Component({
  selector: 'cat-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.less'],
})
export class ActionMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  musicHidden = true;
  chat: {
    toggleChat: (b: boolean) => void;
    destroy: () => void;
  };

  @Output() toggleSkin = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chat = new Gitter({
      room: 'ng-mamafish/ng-mamafish',
      activationElement: false
    });
  }

  ngOnDestroy(): void {
    this.chat.toggleChat(false);
    this.chat.destroy();
  }

  openFeedback(): void {
    this.chat.toggleChat(true);
  }
}
