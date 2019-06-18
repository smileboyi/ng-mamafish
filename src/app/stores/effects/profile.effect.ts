import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as _ from 'lodash';

import * as profileActions from '@actions/profile.action';
import { activities } from '@mock/data.mock';
import { Activitie } from '@declare';

@Injectable({
  providedIn: 'root'
})
class ProfileService {
  // mock profile service
  constructor() {}

  public getProfiles(): Observable<any> {
    const observable = new Observable(function(observer) {
      observer.next(
        _.cloneDeep(activities).sort(() => (Math.random() > 0.5 ? -1 : 1))
      );
    });
    return observable;
  }
}

const types = profileActions.ProfileActionTypes;

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}

  @Effect()
  fetchProfiles$: Observable<Action> = this.actions$.pipe(
    ofType(types.FETCH_PROFILE_REQ),
    map((action: profileActions.FetchProfileReq) => action.payload),
    switchMap(payload => {
      return this.profileService.getProfiles().pipe(
        map((res: Activitie[]) => {
          return new profileActions.FetchProfileSuc({
            datas: res,
            type: payload.type
          });
        }),
        catchError(err => {
          return of(new profileActions.FetchProfileErr(err));
        })
      );
    })
  );
}
