import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { CanDeactivateComponent } from '@declare';

@Injectable({
  providedIn: 'root',
})
export class UnsaveGuard implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(
    component: CanDeactivateComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.isFormDirty()) {
      return component.canDeactivate();
    } else {
      return true;
    }
  }
}
