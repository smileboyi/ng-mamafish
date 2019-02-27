import {
  Directive,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  OnDestroy,
  Input
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[catThrottleClick]'
})
export class ThrottleClickDirective implements OnInit, OnDestroy {
  @Input() throttleTime: number = 100;
  @Output() throttleClick: any = new EventEmitter();
  private click$ = new Subject<any>();
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.click$
      .pipe(throttleTime(this.throttleTime))
      .subscribe(e => this.throttleClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.click$.next(event);
  }
}
