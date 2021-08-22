import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '@config/app.config';

@Component({
  selector: 'cat-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicPlayerComponent implements OnInit {
  isClose = true;
  songs = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(appConfig.MUSIC_API_BASE + '/artist/top/song?id=9945')
      .subscribe((res: any) => {
        console.log(res);
        if (res.code === 200) {
        }
      });
  }

  togglePlayList(): void {
    this.isClose = !this.isClose;
  }
}
