import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'cat-bg-header',
  templateUrl: './bg-header.component.html',
  styleUrls: ['./bg-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgHeaderComponent {
  trans = false;

  @Input() cmpSize?: 'L' | 'S' = 'L';
  @Input() headerTitle = '';
  @Input() describe = '';

  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  toggleCmpSize(): void {
    if (this.cmpSize === 'L') {
      this.cmpSize = 'S';
      this.renderer2.setAttribute(
        this.el.nativeElement.parentNode,
        'style',
        '--header-height:36px'
      );
    } else {
      this.cmpSize = 'L';
      this.renderer2.setAttribute(
        this.el.nativeElement.parentNode,
        'style',
        '--header-height:148px'
      );
    }
    let t = setTimeout(() => {
      this.trans = true;
      clearTimeout(t);
    }, 30);
    t = setTimeout(() => {
      this.trans = false;
      clearTimeout(t);
    }, 400);
  }
}
