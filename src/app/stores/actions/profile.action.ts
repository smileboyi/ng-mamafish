import { Action } from '@ngrx/store';

import { Activitie } from '@declare';

export enum ProfileActionTypes {
  FETCH_PROFILE_REQ = '[Profile] fetch profile req',
  FETCH_PROFILE_SUC = '[Profile] fetch profile suc',
  FETCH_PROFILE_ERR = '[Profile] fetch profile err',
  CLEAR_PROFILE_DATAS = '[Profile] clear profile datas',
}

export declare type ProfileType = 'activities' | 'profiles' | 'messages';

export class FetchProfileReq implements Action {
  readonly type = ProfileActionTypes.FETCH_PROFILE_REQ;
  constructor(public payload: { type: ProfileType }) {}
}

export class FetchProfileSuc implements Action {
  readonly type = ProfileActionTypes.FETCH_PROFILE_SUC;
  constructor(public payload: { datas: Activitie[]; type: ProfileType }) {}
}

export class FetchProfileErr implements Action {
  readonly type = ProfileActionTypes.FETCH_PROFILE_ERR;
  constructor(public payload: { error: any }) {}
}

export class ClearProfileDatas implements Action {
  readonly type = ProfileActionTypes.CLEAR_PROFILE_DATAS;
  constructor(public payload: { type: ProfileType }) {}
}

export type ProfileActionsUnion =
  | FetchProfileReq
  | FetchProfileSuc
  | FetchProfileErr
  | ClearProfileDatas;
