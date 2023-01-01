import {
  Component,
  Input,
  OnDestroy,
  OnChanges,
  Inject,
  AfterViewInit,
  SimpleChanges,
  HostBinding,
  ɵdetectChanges as detectChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { skip, first } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { ControlValueAccessor } from "@angular/forms";

import * as fromReducer from "@reducers/index";
import * as actions from "@actions/form-design.action";
import { FormDesignState } from "@reducers/form-design.reducer";
import { FormDesignService } from "@services/form-design.service";
import { FdEleMeta, FdTemplateConfig } from "@declare";
import { FD_ELE_META } from "@tokens";

// 组件的wapper包装器
@Component({ template: "" })
export class FdEleBaseComponent
  implements ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];

  @Input() config: FdTemplateConfig;
  // 用于formDesignMap
  @Input() key: string;
  target: any;
  eleType = "";
  eleIndex = 0;

  value: Event;
  onTouch = (): void => {};
  onChange = (value: Event | null): Event | null => value;

  // @HostBinding("attr.eleid")
  // get id(): string {
  //   return this.eleType + this.eleIndex;
  // }

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
    protected fdEleMeta: FdEleMeta,
    protected store: Store<FormDesignState>,
    protected formDesign: FormDesignService,
    protected cdr: ChangeDetectorRef
  ) {
    this.eleType = fdEleMeta.type;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

  ngAfterViewInit(): void {
    if (!this.key) {
      this.store.dispatch(
        new actions.SetEleIndex({
          eleType: this.eleType,
        })
      );
      this.key = this.formDesign.currFormDesignKey;
      this.store
        .select(fromReducer.selecEleIndex)
        .pipe(first())
        .subscribe((res) => {
          this.eleIndex = res[this.eleType];
          const info = this.formDesign.formDesignMap.get(this.key) || {};
          info.key = this.key;
          info.target = this.target;
          info.eleName = this.eleName;
          info.eleType = this.eleType;
          info.eleIndex = this.eleIndex;
          this.formDesign.formDesignMap.set(this.key, info);
        });
    } else {
      const info = this.formDesign.formDesignMap.get(this.key)!;
    }
  }

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
