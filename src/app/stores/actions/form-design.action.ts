import { createAction, props, Action } from "@ngrx/store";

import { FdTemplateConfig } from "@declare";

export enum FormDesignActionTypes {
  SET_ELE_INDEX = "[FormDesign] set ele index",
  DUMP_ELE_INDEX = "[FormDesign] dump ele index",
}

export class SetEleIndex implements Action {
  readonly type = FormDesignActionTypes.SET_ELE_INDEX;
  constructor(public payload: { eleType: string }) {}
}

export class DumpEleIndex implements Action {
  readonly type = FormDesignActionTypes.DUMP_ELE_INDEX;
}

export type FormDesignActionsUnion = SetEleIndex | DumpEleIndex;
