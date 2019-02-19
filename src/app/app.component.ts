import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime } from 'rxjs/operators';

import { UtilsService } from '@services/utils.service';
import { GlobalService } from '@services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private resize$: Subject<any> = new Subject<any>();
  private subscription: Subscription;

  constructor(private utils: UtilsService, private global: GlobalService) {}

  ngOnInit() {
    const isMobile = this.utils.getMobileState();
    this.global.isMobile = isMobile;
    this.subscription = this.resize$
      .pipe(debounceTime(200))
      .subscribe(state => (this.global.isMobile = state));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    const isMobile = this.utils.getMobileState();
    this.resize$.next(isMobile);
  }
}
