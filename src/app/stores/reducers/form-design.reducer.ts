import { cloneDeep } from "lodash-es";

import * as formDesignActions from "@actions/form-design.action";
import { FdTemplateConfig } from "@declare";

export interface FormDesignState {
  // 相同类型的组件位置累加
  eleIndex: {
    [k: string]: number;
  };
}

const initialState: FormDesignState = {
  eleIndex: {},
};

const types = formDesignActions.FormDesignActionTypes;

export function FormDesignAReducer(
  state = initialState,
  action: formDesignActions.FormDesignActionsUnion
): FormDesignState {
  switch (action.type) {
    case types.SET_ELE_INDEX: {
      const eleIndex = cloneDeep(state.eleIndex);
      eleIndex[action.payload.eleType] =
        (eleIndex[action.payload.eleType] || 0) + 1;
      return {
        ...state,
        eleIndex,
      };
    }
    case types.DUMP_ELE_INDEX: {
      return {
        ...state,
        eleIndex: {},
      };
    }
    default: {
      return state;
    }
  }
}

export const selecEleIndex = (state: FormDesignState) => state.eleIndex;
