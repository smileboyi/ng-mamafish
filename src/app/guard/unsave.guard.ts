import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { CanDeactivateComponent } from '@declare';

@Injectable({
  providedIn: 'root'
})
export class UnsaveGuard implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(component: CanDeactivateComponent) {
    if (component.isFormDirty()) {
      return component.canDeactivate();
    } else {
      return true;
    }
  }
}
