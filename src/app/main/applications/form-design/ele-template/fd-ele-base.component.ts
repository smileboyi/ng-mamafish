import {
  Component,
  Input,
  OnDestroy,
  OnChanges,
  inject,
  AfterViewInit,
  SimpleChanges,
  ɵdetectChanges as detectChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { skip, first } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { ControlValueAccessor,FormControl, Validators } from "@angular/forms";
import { NzSizeLDSType } from "ng-zorro-antd/core/types";

import * as fromReducer from "@reducers/index";
import * as actions from "@actions/form-design.action";
import { FormDesignState } from "@reducers/form-design.reducer";
import { FormDesignService } from "@services/form-design.service";
import { FdEleMeta, FdTemplateConfig } from "@declare";
import { FD_ELE_META } from "@tokens";

// 组件的wapper包装器
@Component({ 
  template: "" ,
})
export class FdEleBaseComponent
  implements ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  private store: Store<FormDesignState>= inject(Store<FormDesignState>);
  private formDesign = inject(FormDesignService);
  private cdr = inject(ChangeDetectorRef);
  private fdEleMeta: FdEleMeta = inject(FD_ELE_META);

  subscriptions: Subscription[] = [];
  @Input() formControl:FormControl;

  @Input() config?: FdTemplateConfig = {};
  // 用于formDesignMap
  @Input() key: string;
  target: any;
  eleType = "";
  eleIndex = 0;

  @Input() formDirty:any;

  value: Event;
  onTouch = (): void => {};
  onChange = (value: Event | null): Event | null => value;

  get nzSize(): NzSizeLDSType {
    return this.config?.base?.nzSize || "default";
  }

  get labelWidth(): number {
    return this.config?.base?.labelWidth || 6;
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

  constructor() {
    this.eleType = this.fdEleMeta.type;
    this.formControl = new FormControl('', [Validators.required]);
  }

  ngOnChanges({formDirty}: SimpleChanges): void {
    // console.log(changes);
    if(formDirty){
      if (formDirty.currentValue) {
        this.formControl.markAsDirty();
      } else {
        this.formControl.markAsPristine();
      }
    }
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
          info.target = this.target;
          info.eleName = this.eleName;
          info.eleType = this.eleType;
          info.eleIndex = this.eleIndex;
          this.formDesign.formDesignMap.set(this.key, info);
        });
    } else {
      const info = this.formDesign.formDesignMap.get(this.key)!;
      this.eleIndex = info.eleIndex!;
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
