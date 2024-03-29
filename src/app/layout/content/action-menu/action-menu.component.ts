import {
  Component,
  Output,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import { Recorder, Player } from 'timecatjs';
import Gitter from 'gitter-sidecar';

@Component({
  selector: 'cat-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.less'],
})
export class ActionMenuComponent implements AfterViewInit, OnDestroy {
  screencapHidden = true;
  replayHidden = true;
  chat: {
    toggleChat: (b: boolean) => void;
    destroy: () => void;
  };
  recorder: Recorder;

  @Output() toggleSkin = new EventEmitter<any>();
  @Output() toggleMusicView = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit(): void {
    this.chat = new Gitter({
      room: 'ng-mamafish/ng-mamafish',
      activationElement: false,
    });
  }

  ngOnDestroy(): void {
    this.chat.toggleChat(false);
    this.chat.destroy();
  }

  openFeedback(): void {
    this.chat.toggleChat(true);
  }

  handleRecord(): void {
    this.replayHidden = false;
    this.recorder = new Recorder();
  }

  handleReplay(): void {
    this.replayHidden = true;
    this.recorder.destroy();
    this.screencapHidden = true;
    this.replayHidden = true;
    window.open('/assets/replay.html');
  }
}
