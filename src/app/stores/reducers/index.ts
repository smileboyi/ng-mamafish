import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import * as profileReducers from './profile.reducer';
import { ProfileActionsUnion } from '../actions/profile.action';

export interface AppState {
  profile: profileReducers.ProfileState;
}

export const reducers: ActionReducerMap<AppState, ProfileActionsUnion> = {
  profile: profileReducers.ProfileReducer,
};

export const selectProfile: any = createFeatureSelector<AppState>('profile');

export const selectActivities = createSelector(
  selectProfile,
  profileReducers.selectActivities
);

export const selectProfiles = createSelector(
  selectProfile,
  profileReducers.selectProfiles
);

export const selectMessages = createSelector(
  selectProfile,
  profileReducers.selectMessages
);
