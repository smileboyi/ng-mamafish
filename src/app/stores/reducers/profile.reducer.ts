import { cloneDeep } from 'lodash-es';

import * as profileActions from '@actions/profile.action';
import { Activitie } from '@declare';

export interface ProfileState {
  activities: Array<Activitie>;
  profiles: Array<Activitie>;
  messages: Array<Activitie>;
}

const initialState: ProfileState = {
  activities: [],
  profiles: [],
  messages: [],
};

const types = profileActions.ProfileActionTypes;

export function ProfileReducer(
  state = initialState,
  action: profileActions.ProfileActionsUnion
): ProfileState {
  switch (action.type) {
    case types.FETCH_PROFILE_REQ: {
      return {
        ...state,
      };
    }
    case types.FETCH_PROFILE_SUC: {
      const arr = cloneDeep(state[action.payload.type]);
      return {
        ...state,
        [action.payload.type]: arr.concat(action.payload.datas),
      };
    }
    case types.FETCH_PROFILE_ERR: {
      return {
        ...state,
      };
    }
    case types.CLEAR_PROFILE_DATAS: {
      return {
        ...state,
        [action.payload.type]: [],
      };
    }
    default: {
      return state;
    }
  }
}

export const selectActivities = (state: ProfileState) => state.activities;
export const selectProfiles = (state: ProfileState) => state.profiles;
export const selectMessages = (state: ProfileState) => state.messages;
