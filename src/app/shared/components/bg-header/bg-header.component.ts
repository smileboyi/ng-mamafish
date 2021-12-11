import {
  Component,
  OnInit,
  Input,
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

  constructor() {}

  toggleCmpSize(): void {
    if (this.cmpSize === 'L') {
      this.cmpSize = 'S';
    } else {
      this.cmpSize = 'L';
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
