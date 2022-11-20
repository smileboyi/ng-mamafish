import {
  Component,
  Input,
  OnDestroy,
  OnChanges,
  Inject,
  AfterViewInit,
  SimpleChanges,
  HostBinding,
} from "@angular/core";
import { Subscription } from "rxjs";
import { skip, first } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { ControlValueAccessor } from "@angular/forms";

import * as fromReducer from "@reducers/index";
import * as actions from "@actions/form-design.action";
import { FormDesignState } from "@reducers/form-design.reducer";
import { FdEleMeta, FdTemplateConfig } from "@declare";
import { FD_ELE_META } from "@tokens";

@Component({ template: "" })
export class FdEleBaseComponent
  implements ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];

  @Input() config: FdTemplateConfig;

  eleType = "";
  eleIndex = 0;

  value: Event;
  onTouch = (): void => {};
  onChange = (value: Event | null): Event | null => value;

  @HostBinding("attr.eleid")
  get id(): string {
    return this.eleType + this.eleIndex;
  }

  get labelWidth(): number {
    return this.config?.base?.labelWidth || 8;
  }

  get eleName(): string {
    return this.fdEleMeta.name + this.eleIndex;
  }

  get labelName(): string {
    return this.config?.base?.labelName || this.eleType;
  }

  get tooltip(): string {
    return this.config?.base?.tooltip || "";
  }

  constructor(
    @Inject(FD_ELE_META)
    private fdEleMeta: FdEleMeta,
    store: Store<FormDesignState>
  ) {
    this.eleType = fdEleMeta.type;
    store
      .select(fromReducer.selecEleIndex)
      .pipe(skip(1), first())
      .subscribe((res) => {
        this.eleIndex = res[this.eleType];
      });
    store.dispatch(
      new actions.SetEleIndex({
        eleType: this.eleType,
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)

  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  writeValue(v: Event): void {
    this.value = v;
    this.onChange(v);
  }
  registerOnChange(fn: (value: Event | null) => Event | null): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

}
