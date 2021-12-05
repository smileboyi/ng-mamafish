import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgForage } from 'ngforage';
import { Md5 } from 'ts-md5/dist/md5';

import { appConfig } from '@config/app.config';
import { messageText } from '@config/message-text.config';
import { UtilsService } from '@services/utils.service';
import { MUSIC_INFO } from '@tokens';
import { Song } from '@declare';
import {
  songIdsResult,
  songUrlResult,
  songDetailResult,
} from './music-player.data';

@Component({
  selector: 'cat-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicPlayerComponent implements OnInit, AfterViewInit {
  isClose = true;
  isLogin = true;
  song: Song = {
    id: 0,
    song: '',
    singer: '',
    picUrl: '',
    duration: 0,
  };
  songs: Song[] = [];
  logining = false;
  account = '';
  password = '';
  musicCookie = '';
  musicToken = '';
  uid = '';
  originalSongData: Array<{
    id: number;
    url: string;
    type: string;
  }> = [];
  currentTime = '00:00'; // 当前播放时间
  timer: any;
  audio: HTMLAudioElement = new Audio();
  playProgress = '0%'; // 播放进度
  playIdx = -1; // 歌曲播放位置

  constructor(
    private http: HttpClient,
    private ngForage: NgForage,
    private utils: UtilsService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef,
    @Inject(MUSIC_INFO) private musicInfoToken: string
  ) {
    this.ngForage
      .getItem(this.musicInfoToken)
      .then((res: any) => {
        if (res) {
          this.musicCookie = res.cookie;
          this.loginRefresh();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
    this.ngForage
      .getItem(this.musicInfoToken)
      .then((res: any) => {
        if (res) {
          this.musicCookie = res.cookie;
          this.musicToken = res.token;
          this.uid = res.uid;
          this.songs = res.songs;
          this.originalSongData = res.originalSongData;
          this.cdr.markForCheck();
        } else {
          this.isLogin = false;
          this.cdr.markForCheck();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngAfterViewInit(): void {}

  togglePlayList(): void {
    this.isClose = !this.isClose;
  }

  async loginAndFetchMusic(): Promise<void> {
    await this.loginNeteaseCloudMusic();
    await this.getLikeSongs();
  }

  async loginNeteaseCloudMusic(): Promise<void> {
    try {
      const account = this.account.trim();
      const password = this.password.trim();
      if (!account || !password) {
        this.message.warning(messageText.WARN_MUSIC_LOGIN);
        return;
      }
      this.logining = true;
      let result: any;
      // 最开始做的是扫码登录，但是登录成功后，/login/qr/check接口轮询返回的结果一直是801等待扫码
      if (this.utils.checkEmail(account)) {
        result = await this.http
          .get(
            appConfig.MUSIC_API_BASE +
              `/login?email=${account}&md5_password=${Md5.hashStr(password)}`
          )
          .toPromise();
      } else if (this.utils.checkPhone(account)) {
        result = await this.http
          .get(
            appConfig.MUSIC_API_BASE +
              `/login/cellphone?phone=${account}&md5_password=${Md5.hashStr(
                password
              )}`
          )
          .toPromise();
      } else {
        this.logining = false;
        this.message.warning(messageText.ERR_MUSIC_ACCOUNT);
        this.cdr.markForCheck();
        return;
      }
      if (result.code !== 200) {
        throw Error();
      }
      this.logining = false;
      this.message.success(messageText.SUC_MUSIC_LOGIN);
      this.cdr.markForCheck();
      this.musicCookie = result.cookie;
      this.musicToken = result.token;
      this.uid = result.account.id;
    } catch (error) {
      this.logining = false;
      this.message.error(messageText.ERR_MUSIC_LOGIN);
      this.cdr.markForCheck();
    }
  }

  // 获取用户喜爱的歌
  async getLikeSongs(): Promise<void> {
    let songIds: number[] = [];
    let result: any;
    let params = new HttpParams()
      .set('uid', this.uid)
      .set('cookie', this.musicCookie)
      .set('timestamp', Date.now().toString());

    try {
      result = await this.http
        .get(appConfig.MUSIC_API_BASE + `/likelist`, {
          params,
          withCredentials: true,
        })
        .toPromise();
      if (result.code !== 200) {
        songIds = songIdsResult;
      } else {
        songIds = result.ids;
      }

      params = new HttpParams()
        .set('id', songIds.join(','))
        .set('cookie', this.musicCookie);
      result = await this.http
        .get(appConfig.MUSIC_API_BASE + `/song/url`, {
          params,
          withCredentials: true,
        })
        .toPromise();

      if (result.code !== 200) {
        this.originalSongData = songUrlResult;
      } else {
        // 过滤掉url没值的歌，有些歌下架有些歌是vip等等
        this.originalSongData = result.data
          .filter((x: any) => x.url)
          .map((x: any) => {
            return {
              id: x.id,
              url: x.url,
              type: x.type,
            };
          });
      }
      songIds = this.originalSongData.map((x: any) => x.id);

      params = new HttpParams()
        .set('ids', songIds.join(','))
        .set('cookie', this.musicCookie);
      result = await this.http
        .get(appConfig.MUSIC_API_BASE + `/song/detail`, {
          params,
          withCredentials: true,
        })
        .toPromise();
      if (result.code !== 200) {
        this.songs = songDetailResult;
      } else {
        this.songs = result.songs.map((x: any) => {
          return {
            id: x.id,
            song: x.name,
            singer: x.ar[0].name,
            picUrl: x.al.picUrl,
            duration: x.dt,
          };
        });
      }
    } catch (error) {
      console.error(error);
      this.originalSongData = songUrlResult;
      this.songs = songDetailResult;
    } finally {
      this.ngForage
        .setItem(this.musicInfoToken, {
          cookie: this.musicCookie,
          token: this.musicInfoToken,
          uid: this.uid,
          songs: this.songs,
          originalSongData: this.originalSongData,
        })
        .then(() => {});
      this.song = this.songs[0];
      this.isLogin = true;
      this.cdr.markForCheck();
    }
  }

  // 时间转换
  convertSongTime(time: number): string {
    time = Math.floor(time);
    let m: StrOrNum = Math.floor(time / 60);
    m = m < 10 ? '0' + m : m;
    let s: StrOrNum = Math.floor(time % 60);
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
  }

  // 双击播放
  playMusic(song: Song): void {
    this.audio.pause();
    const data: any = this.originalSongData.find((x) => x.id === song.id);
    if (data) {
      this.playIdx = this.originalSongData.findIndex((x) => x.id === song.id);
      this.song = song;
      this.audio.src = data.url;
      this.currentTime = '00:00';
      this.playProgress = '0%';
      this.cdr.markForCheck();
      this.playOrPause();
    } else {
      this.message.error(messageText.ERR_MUSIC_PLAY);
    }
  }

  // 播放或者暂停
  playOrPause(): void {
    clearInterval(this.timer);
    if (this.audio.paused) {
      if (!this.audio.src) {
        const id = this.songs[0].id;
        const data: any = this.originalSongData.find((x) => x.id === id);
        this.song = this.songs[0];
        this.audio.src = data.url;
      }
      // 如果不能再播放了，需要重新登录
      // https://blog.csdn.net/weixin_41767649/article/details/79918139
      if (!isNaN(this.audio.duration)) {
        this.audio.play();
        this.timer = setInterval(() => {
          if (this.audio.ended) {
            clearInterval(this.timer);
            let id = this.song.id;
            let idx = this.songs.findIndex((x) => x.id === id);
            idx = idx + 1 >= this.songs.length ? 0 : idx + 1;
            this.song = this.songs[idx];
            id = this.song.id;
            const data: any = this.originalSongData.find((x) => x.id === id);
            this.audio.src = data.url;
            this.playOrPause();
          } else {
            this.currentTime = this.convertSongTime(this.audio.currentTime);
            this.playProgress =
              ((this.audio.currentTime / this.audio.duration) * 100).toFixed(
                2
              ) + '%';
            this.cdr.markForCheck();
          }
        }, 1000);
      } else {
        this.message.error(messageText.MUSIC_LOGIN_INVALID);
        this.ngForage.removeItem(this.musicInfoToken).then(() => {});
        this.isLogin = false;
      }
    } else {
      this.audio.pause();
    }
  }

  handlePrevSong(): void {
    this.audio.pause();
    const idx: number = this.playIdx ? this.playIdx - 1 : this.songs.length - 1;
    const song: Song = this.songs[idx];
    this.playMusic(song);
  }

  handleNextSong(): void {
    this.audio.pause();
    const idx: number =
      this.playIdx === this.songs.length - 1 ? 0 : this.playIdx + 1;
    const song: Song = this.songs[idx];
    this.playMusic(song);
  }

  loginRefresh(): void {
    const params = new HttpParams().set('cookie', this.musicCookie);
    this.http
      .get(appConfig.MUSIC_API_BASE + `/login/refresh`, {
        params,
        withCredentials: true,
      })
      .toPromise()
      .then((res) => {})
      .catch((err) => {});
  }
}
