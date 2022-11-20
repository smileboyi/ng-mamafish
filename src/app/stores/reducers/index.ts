import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from "@ngrx/store";

import * as profileReducers from "./profile.reducer";
import * as formDesignReducers from "./form-design.reducer";
import { ProfileActionsUnion } from "../actions/profile.action";
import { FormDesignActionsUnion } from "../actions/form-design.action";

export interface AppState {
  profile: profileReducers.ProfileState;
  formDesign: formDesignReducers.FormDesignState;
}

export const reducers: ActionReducerMap<AppState, never> = {
  profile: profileReducers.ProfileReducer,
  formDesign: formDesignReducers.FormDesignAReducer,
};

export const selectProfile: any = createFeatureSelector<AppState>("profile");

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

export const selectFormDesign: any = createFeatureSelector<AppState>(
  "formDesign"
);

export const selecEleIndex = createSelector(
  selectFormDesign,
  formDesignReducers.selecEleIndex
);
