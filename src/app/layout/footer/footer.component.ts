import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cat-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor() {}
}
