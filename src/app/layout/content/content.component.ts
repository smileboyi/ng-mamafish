import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { NgForage } from 'ngforage';

@Component({
  selector: 'cat-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
})
export class ContentComponent implements OnInit, OnDestroy {
  skinIdx = 0;

  @HostBinding('style.background-image')
  get skin(): string {
    return `url(/assets/images/texture-${this.skinIdx}.webp)`;
  }

  constructor(private ngForage: NgForage) {}

  ngOnInit(): void {
    this.ngForage.getItem('webSkinIdx').then((idx: any) => {
      this.skinIdx = idx;
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
