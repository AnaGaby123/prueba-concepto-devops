import {createAction, props} from '@ngrx/store';

export const SAVE_DIRECCION_ENTREGA_LOAD = createAction(
  '[API] Save Direccion Entrega Load',
  props<{payload: any}>(),
);
export const SAVE_DIRECCION_ENTREGA_SUCCESS = createAction(
  '[API] Save Direccion Entrega Success',
  props<{payload: any}>(),
);
export const SAVE_DIRECCION_ENTREGA_ERROR = createAction(
  '[API] Save Direccion Entrega Success',
  props<{error: any}>(),
);
export const GET_DIRECCION_ENTREGA_LOAD = createAction(
  '[API] Get Direccion Cliente Load',
  props<{payload: any}>(),
);
export const GET_DIRECCION_ENTREGA_SUCCESS = createAction(
  '[API] Get Direccion Cliente Success',
  props<{payload: any}>(),
);
export const GET_DIRECCION_ENTREGA_ERROR = createAction(
  '[API] Get Direccion Cliente Success',
  props<{error: any}>(),
);
