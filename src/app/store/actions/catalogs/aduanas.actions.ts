import {createAction, props} from '@ngrx/store';

export const GET_LIST_AGENTES_LOAD = createAction(
  '[API] Load List Agentes',
  props<{payload: any}>(),
);
export const GET_LIST_AGENTES_SUCCESS = createAction(
  '[API] Success List Agente',
  props<{payload: any}>(),
);
export const GET_LIST_AGENTES_ERROR = createAction(
  '[API] Error List Agente',
  props<{error: any}>(),
);
export const GET_LIST_CONCEPTOSAA_LOAD = createAction(
  '[API] Load List Conceptos AA',
  props<{payload: any}>(),
);
export const GET_LIST_CONCEPTOSAA_SUCCESS = createAction(
  '[API] Success List Conceptos AA',
  props<{payload: any}>(),
);
export const GET_LIST_CONCEPTOSAA_ERROR = createAction(
  '[API] Error List Conceptos AA',
  props<{error: any}>(),
);
export const FILTER_LIST_CONCEPTOSAA = createAction(
  '[API] Load List filter Agente aduanal',
  props<{payload: string}>(),
);
export const FILTER_LIST_CONCEPTOSAA_SUCCESS = createAction(
  '[API] List filter Agente aduanal success',
  props<{payload: any}>(),
);
