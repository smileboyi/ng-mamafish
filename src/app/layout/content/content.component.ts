import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { NgForage } from 'ngforage';

@Component({
  selector: 'cat-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
})
export class ContentComponent implements OnInit, OnDestroy {
  skinIdx = 0;
  musicHidden = true;

  @HostBinding('style.background-image')
  get skin(): string {
    return `url(/assets/images/texture-${this.skinIdx || 1}.webp)`;
  }

  constructor(private ngForage: NgForage) {}

  ngOnInit(): void {
    this.ngForage.getItem('webSkinIdx').then((idx: any) => {
      this.skinIdx = idx || 0;
    });
  }

  ngOnDestroy(): void {
    this.ngForage.setItem('webSkinIdx', this.skinIdx);
  }

  toggleWebSkin(): void {
    if (this.skinIdx >= 20) {
      this.skinIdx = 0;
    }
    this.skinIdx += 1;
  }
}
